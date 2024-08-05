import React from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import useAuth from '@/hooks/useAuth';

import { useColorScheme } from '@/hooks/useColorScheme';
import { getDataFromAsyncStorage, LocalStorageEnum } from '@/utils';
import { EmailLoginResponseTypes } from '@/services';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const isAuthenticated = useAuth();
  const router = useRouter();

  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    const fetchLoginResponse = async () => {
      const response = await getDataFromAsyncStorage<EmailLoginResponseTypes>(
        LocalStorageEnum.USER_AUTH,
        {
          access_token: '',
          refresh_token: '',
          expiresIn: '',
        },
      );

      if (response.access_token) {
        router.replace('/');
      }
    };

    fetchLoginResponse();
  }, []);

  if (!loaded || isAuthenticated === null) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
