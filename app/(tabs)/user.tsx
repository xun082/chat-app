import React, { useEffect } from 'react';
import { SafeAreaView, View, Text, Pressable, Image, ScrollView } from 'react-native';
import { useRouter, Link } from 'expo-router';

import tw from '@/tailwind';
import { useTheme } from '@/context/ThemeContext';
import { getUserInfo } from '@/services';
import { useUserStore } from '@/stores/userStore';

const ProfileHeader: React.FC = () => {
  const { colors } = useTheme();
  const { user, setUser } = useUserStore();

  useEffect(() => {
    async function fetchUserInfo() {
      const data = await getUserInfo();
      setUser(data.data);
    }

    fetchUserInfo();
  }, [setUser]);

  return (
    <Link href="/profile">
      <View style={tw`flex flex-row items-center p-4`}>
        <Image
          source={{
            uri:
              user.avatar ||
              'https://cdn.pixabay.com/photo/2024/07/17/08/53/sunrise-8901014_1280.jpg',
          }}
          style={tw`w-16 h-16 rounded-full`}
        />
        <View style={tw`ml-4`}>
          <Text style={[tw`text-xl`, { color: colors.text }]}>{user.username}</Text>
          <Text style={[tw`text-sm`, { color: colors.text }]}>邮箱号：{user.email}</Text>
        </View>
      </View>
    </Link>
  );
};

const MenuItem: React.FC<{ title: string; onPress?: () => void }> = ({ title, onPress }) => {
  const { colors } = useTheme();

  return (
    <Pressable onPress={onPress}>
      <View
        style={tw`flex flex-row items-center p-4 border-b border-gray-300 dark:border-gray-700`}
      >
        <Text style={[tw`text-lg`, { color: colors.text }]}>{title}</Text>
      </View>
    </Pressable>
  );
};

const MainPage: React.FC = () => {
  const { toggleTheme, colors } = useTheme();
  const router = useRouter();

  return (
    <SafeAreaView style={[tw`flex-1`, { backgroundColor: colors.background }]}>
      <ScrollView>
        <ProfileHeader />
        <MenuItem title="服务" />
        <MenuItem title="收藏" />
        <MenuItem title="朋友圈" />
        <MenuItem title="视频号" />
        <MenuItem title="订单与卡包" />
        <MenuItem title="表情" />
        <MenuItem title="设置" onPress={() => router.push('/setting')} />
      </ScrollView>
      <Pressable style={tw`m-4 p-4 bg-blue-500 rounded-lg items-center`} onPress={toggleTheme}>
        <Text style={tw`text-white`}>切换主题</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default MainPage;
