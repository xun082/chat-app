import React, { useEffect } from 'react';
import { SafeAreaView, View, Text, Image, ScrollView } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import IconTitleCell from '@/components/cell/iconTitleCell';
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

const MainPage: React.FC = () => {
  const { toggleTheme, colors } = useTheme();
  const router = useRouter();

  return (
    <SafeAreaView style={[tw`flex-1`, { backgroundColor: colors.cellBackGround }]}>
      <ScrollView>
        <ProfileHeader />
        <View style={tw`mt-2`}>
          <IconTitleCell iconName="checkbox-outline" title="服务" onPress={() => {}} />
        </View>
        <View style={tw`mt-2`}>
          <IconTitleCell iconName="cube-outline" title="收藏" onPress={() => {}} />
          <IconTitleCell iconName="aperture-outline" title="朋友圈" onPress={() => {}} />
          <IconTitleCell iconName="card-outline" title="订单与卡包" onPress={() => {}} />
          <IconTitleCell iconName="happy-outline" title="表情" onPress={() => {}} />
        </View>
        <View style={tw`mt-2`}>
          <IconTitleCell
            iconName="settings-outline"
            title="设置"
            onPress={() => router.push('/setting')}
          />
        </View>
      </ScrollView>
      <View style={tw`mb-4`}>
        <IconTitleCell hideRightArrow={true} title="切换主题" onPress={toggleTheme} />
      </View>
    </SafeAreaView>
  );
};

export default MainPage;
