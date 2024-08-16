import React, { useLayoutEffect } from 'react';
import { View, Text, Image, Pressable, ScrollView } from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';

import { useTheme } from '@/context/ThemeContext';
import { useUserStore } from '@/stores/userStore';

const ContactUserInfo = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { user } = useUserStore();
  const router = useRouter();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={tw`flex-1 items-center justify-center`}>
          <Text style={[tw`text-lg`, { color: colors.text }]}>个人信息</Text>
        </View>
      ),
      headerStyle: {
        backgroundColor: colors.background,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
      },
      headerTitleAlign: 'center',
      headerTintColor: colors.text,
    });
  }, [navigation, colors]);

  const menuItems = [
    { label: '头像', value: user.avatar, type: 'image', style: 'rounded-full' },
    { label: '背景图片', value: user.backgroundImage, type: 'image' },
    { label: '名字', value: user.username || '未设置' },
    { label: '邮箱号', value: user.email || '未设置' },
    { label: '地区', value: user.region || '未设置' },
    { label: '个性签名', value: user.signature || '未设置' },
  ];

  const handleEditProfile = () => {
    router.push('/profile/update');
  };

  return (
    <ScrollView style={[tw`flex-1`, { backgroundColor: colors.background }]}>
      <View style={tw`p-4`}>
        {menuItems.map((item, index) => (
          <View
            key={index}
            style={tw`flex-row justify-between items-center p-4 border-b border-gray-800`}
          >
            <Text style={[tw`text-base`, { color: colors.text }]}>{item.label}</Text>
            <View style={tw`flex-row items-center`}>
              {item.type === 'image' ? (
                <Image
                  source={{
                    uri:
                      item.value ||
                      'https://cdn.pixabay.com/photo/2024/07/17/08/53/sunrise-8901014_1280.jpg',
                  }}
                  style={[
                    tw`w-16 h-16`, // 缩小图片尺寸
                    item.style === 'rounded-full' ? tw`rounded-full` : tw``,
                  ]}
                />
              ) : (
                <Text style={[tw`text-base`, { color: colors.placeholder }]}>{item.value}</Text>
              )}
            </View>
          </View>
        ))}
      </View>

      {/* 修改用户信息的按钮 */}
      <Pressable
        onPress={handleEditProfile}
        style={[
          tw`p-4 m-4 rounded bg-blue-500`,
          {
            backgroundColor: colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
          },
        ]}
      >
        <Text style={[tw`text-white text-lg`, { color: colors.primaryText }]}>修改用户信息</Text>
      </Pressable>
    </ScrollView>
  );
};

export default ContactUserInfo;
