import { useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useRouter, Href } from 'expo-router';

interface NotificationData {
  path: string;
}

interface ScheduleNotificationParams {
  title: string;
  body: string;
  data: NotificationData;
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export function usePushNotifications() {
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();
  const router = useRouter(); // 使用 useRouter 进行导航

  useEffect(() => {
    // 获取并保存推送通知的token
    registerForPushNotificationsAsync();

    // 当接收到通知时
    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      console.log('Notification received:', notification);
    });

    // 当用户点击通知时
    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log('Notification response:', response);

      const path = (response.notification.request.content.data as NotificationData)?.path; // 从通知数据中获取路径

      if (path) {
        console.log(`Navigating to path: ${path}`);
        router.push(path as Href<string>);
      }
    });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }

      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  const schedulePushNotification = async ({ title, body, data }: ScheduleNotificationParams) => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data, // 将路径作为数据传递
        },
        trigger: { seconds: 2 }, // 2秒后触发通知
      });
      console.log(`Notification scheduled: ${title} - ${body} - ${data.path}`);
    } catch (e) {
      console.error('Error scheduling notification', e);
    }
  };

  return {
    schedulePushNotification,
  };
}

async function registerForPushNotificationsAsync(): Promise<void> {
  try {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');

        return;
      }

      const token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log('Push notification token:', token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  } catch (e) {
    console.error('Error during push notification registration', e);
  }
}
