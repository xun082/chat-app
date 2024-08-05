import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');

        if (userToken) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          router.replace('/login');
        }
      } catch (error) {
        console.error('读取 token 时出错：', error);
        setIsAuthenticated(false);
        router.replace('/login');
      }
    };

    checkToken();
  }, [router]);

  return isAuthenticated;
};

export default useAuth;
