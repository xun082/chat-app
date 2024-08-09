import React, { useLayoutEffect } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { useLocalSearchParams, Link } from 'expo-router';

import { useTheme } from '@/context/ThemeContext';
import { useSearchStore } from '@/store/useSearchStore';
import { UserResponseTypes } from '@/services';

const UserId = () => {
  const { id } = useLocalSearchParams();
  const searchResult = useSearchStore((state) => state.searchResult) as UserResponseTypes;
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
        backgroundColor: colors.background, // 设置导航栏背景色为主题背景色
        borderBottomWidth: 1,
        borderBottomColor: colors.border, // 设置底部边框颜色为主题边框色
      },
      headerTitleAlign: 'center',
      headerTintColor: colors.text, // 设置导航栏按钮颜色为主题文本色
    });
  }, [navigation, colors]);

  if (!searchResult) {
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
          source={{ uri: searchResult.avatar || 'https://example.com/avatar.jpg' }}
          style={tw`w-16 h-16 rounded-full`}
        />
        <View style={tw`ml-4`}>
          <Text style={[tw`text-xl font-bold`, { color: colors.text }]}>
            {searchResult.username}
          </Text>
          <Text style={[tw`text-sm`, { color: colors.placeholder }]}>
            群昵称: {searchResult.username || 'Genie Timer'}
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

export default UserId;
