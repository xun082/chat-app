// RootLayout.tsx
import React, { useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import 'react-native-reanimated';

import useAuth from '@/hooks/useAuth';
import { getDataFromAsyncStorage, LocalStorageEnum } from '@/utils';
import { EmailLoginResponseTypes } from '@/services';
import { ThemeProvider } from '@/context/ThemeContext';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // const isAuthenticated = useAuth();
  // const router = useRouter();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // useEffect(() => {
  //   const fetchLoginResponse = async () => {
  //     const response = await getDataFromAsyncStorage<EmailLoginResponseTypes>(
  //       LocalStorageEnum.USER_AUTH,
  //       {
  //         access_token: '',
  //         refresh_token: '',
  //         expiresIn: '',
  //       },
  //     );

  //     if (response.access_token) {
  //       router.replace('/');
  //     }
  //   };

  //   fetchLoginResponse();
  // }, []);

  // if (!loaded || isAuthenticated === null) {
  //   return null;
  // }

  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
