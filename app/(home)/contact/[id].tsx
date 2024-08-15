import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { useLocalSearchParams, Link } from 'expo-router';

import { useTheme } from '@/context/ThemeContext';
import { useSearchStore } from '@/stores/useSearchStore';
import { getUserInfo, UserResponseTypes } from '@/services';

const ContactUserInfo = () => {
  const { id } = useLocalSearchParams();
  const searchResult = useSearchStore((state) => state.searchResult) as
    | UserResponseTypes
    | undefined;
  const [user, setUser] = useState<UserResponseTypes | null>(searchResult || null);
  const navigation = useNavigation();
  const { colors } = useTheme();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={tw`flex-1 items-center justify-center`}>
          <Text style={[tw`text-lg`, { color: colors.text }]}>用户信息</Text>
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

  useEffect(() => {
    // 如果从搜索跳转，则直接使用 searchResult，不需要发起请求
    // 如果从用户列表跳转，则 searchResult 为空，需要发起网络请求
    if (!searchResult && id) {
      async function fetchUserInfo() {
        try {
          const data = await getUserInfo(id as string);
          setUser(data.data);
        } catch (error) {
          console.error('获取用户信息失败:', error);
          setUser(null);
        }
      }

      fetchUserInfo();
    } else if (searchResult) {
      setUser(searchResult);
    }
  }, [id, searchResult]);

  if (!user) {
    return (
      <View
        style={[tw`flex-1 justify-center items-center`, { backgroundColor: colors.background }]}
      >
        <Text style={[tw`text-white`, { color: colors.text }]}>用户信息未找到</Text>
      </View>
    );
  }

  return (
    <View style={[tw`flex-1`, { backgroundColor: colors.background }]}>
      <View style={tw`flex-row p-4 items-center`}>
        <Image
          source={{ uri: user.avatar || 'https://example.com/avatar.jpg' }}
          style={tw`w-16 h-16 rounded-full`}
        />
        <View style={tw`ml-4`}>
          <Text style={[tw`text-xl font-bold`, { color: colors.text }]}>{user.username}</Text>
          <Text style={[tw`text-sm`, { color: colors.placeholder }]}>
            群昵称: {user.username || 'Genie Timer'}
          </Text>
          <Text style={[tw`text-sm`, { color: colors.placeholder }]}>地区: {'未知'}</Text>
        </View>
      </View>

      <Pressable style={[tw`p-4 border-t border-b`, { borderColor: colors.border }]}>
        <Text style={[tw`text-white`, { color: colors.text }]}>设置备注和标签</Text>
      </Pressable>

      <View style={[tw`p-4 border-t border-b`, { borderColor: colors.border }]}>
        <Text style={[tw`text-gray-400`, { color: colors.placeholder }]}>个性签名</Text>
        <Text style={[tw`text-white`, { color: colors.text }]}>{'暂无签名'}</Text>
      </View>

      <Pressable style={[tw`p-4 border-t border-b`, { borderColor: colors.border }]}>
        <Text style={[tw`text-white`, { color: colors.text }]}>朋友圈</Text>
      </Pressable>

      <Pressable style={[tw`p-4 border-t border-b`, { borderColor: colors.border }]}>
        <Text style={[tw`text-white`, { color: colors.text }]}>视频号: {}</Text>
      </Pressable>

      <Link
        href={{
          pathname: '/(home)/reply/[id]',
          params: { id: id as string },
        }}
        style={[tw`p-4 mt-4 items-center`, { backgroundColor: colors.inputBackground }]}
      >
        <Text style={[tw`text-blue-400`, { color: colors.text }]}>添加到通讯录</Text>
      </Link>
    </View>
  );
};

export default ContactUserInfo;
