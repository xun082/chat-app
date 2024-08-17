import React, { useEffect } from 'react';
import { SafeAreaView, View, Text, Pressable, Image, ScrollView } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

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
      <View
        style={[
          tw`flex flex-row items-center p-4 rounded-lg m-4 shadow-lg`,
          {
            backgroundColor: colors.card,
            shadowColor: colors.shadowColor,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
          },
        ]}
      >
        <Image
          source={{
            uri:
              user.avatar ||
              'https://cdn.pixabay.com/photo/2024/07/17/08/53/sunrise-8901014_1280.jpg',
          }}
          style={tw`w-16 h-16 rounded-full border-2 border-gray-300`}
        />
        <View style={tw`ml-4 flex-1`}>
          <Text style={[tw`text-xl font-bold`, { color: colors.text }]}>{user.username}</Text>
          <Text style={[tw`text-sm`, { color: colors.placeholder }]}>邮箱号：{user.email}</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color={colors.placeholder} />
      </View>
    </Link>
  );
};

const MenuItem: React.FC<{ title: string; onPress?: () => void }> = ({ title, onPress }) => {
  const { colors } = useTheme();

  return (
    <Pressable onPress={onPress}>
      <View
        style={[
          tw`flex flex-row items-center p-4 my-2 mx-4 rounded-lg shadow-sm`,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
            shadowColor: colors.shadowColor,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
          },
        ]}
      >
        <Text style={[tw`text-lg font-medium flex-1`, { color: colors.text }]}>{title}</Text>
        <Ionicons name="chevron-forward" size={20} color={colors.placeholder} />
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
        <View style={tw`mt-4`}>
          <MenuItem title="服务" />
          <MenuItem title="收藏" />
          <MenuItem title="朋友圈" />
          <MenuItem title="视频号" />
          <MenuItem title="订单与卡包" />
          <MenuItem title="表情" />
          <MenuItem title="设置" onPress={() => router.push('/setting')} />
        </View>
      </ScrollView>
      <Pressable
        style={[
          tw`m-4 p-4 rounded-full items-center shadow-lg`,
          {
            backgroundColor: colors.primary,
            shadowColor: colors.shadowColor,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
          },
        ]}
        onPress={toggleTheme}
      >
        <Text style={[tw`text-lg font-semibold`, { color: colors.primaryText }]}>切换主题</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default MainPage;
