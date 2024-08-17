import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useColorScheme as useDeviceColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from '@react-navigation/native';

import { lightColors, darkColors } from '@/utils/index';
import { LocalStorageEnum } from '@/utils';

interface ThemeColors {
  background: string;
  text: string;
  border: string;
  inputBackground: string;
  inputText: string;
  placeholder: string;
  primary: string; // 添加的类型
  primaryText: string; // 添加的类型
  secondary: string; // 添加的类型
  secondaryText: string; // 添加的类型
  accent: string; // 添加的类型
  accentText: string; // 添加的类型
  success: string; // 添加的类型
  warning: string; // 添加的类型
  error: string; // 添加的类型
  card: string;
  shadowColor: string;
}

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  theme: typeof NavigationDarkTheme | typeof NavigationDefaultTheme;
  colors: ThemeColors;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const deviceColorScheme = useDeviceColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(deviceColorScheme === 'dark');

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem(LocalStorageEnum.APP_THEME);

        if (storedTheme !== null) {
          setIsDarkMode(storedTheme === 'dark');
        } else {
          setIsDarkMode(deviceColorScheme === 'dark');
        }
      } catch (error) {
        console.error('Failed to load theme', error);
      }
    };

    loadTheme();
  }, [deviceColorScheme]);

  const toggleTheme = async () => {
    try {
      const newTheme = !isDarkMode ? 'dark' : 'light';
      await AsyncStorage.setItem(LocalStorageEnum.APP_THEME, newTheme);
      setIsDarkMode((prevMode) => !prevMode);
    } catch (error) {
      console.error('Failed to save theme', error);
    }
  };

  const theme = isDarkMode ? NavigationDarkTheme : NavigationDefaultTheme;
  const colors: ThemeColors = isDarkMode ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme, colors }}>
      <NavigationThemeProvider value={theme}>{children}</NavigationThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};
