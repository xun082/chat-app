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
          <Text style={[tw`text-lg font-semibold`, { color: colors.text }]}>用户信息</Text>
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
    if (!searchResult && id) {
      async function fetchUserInfo() {
        try {
          const data = await getUserInfo(id as string);

          console.log(data.data);

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
        <Text style={[tw`text-lg`, { color: colors.text }]}>用户信息未找到</Text>
      </View>
    );
  }

  return (
    <View style={[tw`flex-1 p-4`, { backgroundColor: colors.background }]}>
      <View
        style={[
          tw`flex-row items-center p-4 rounded-lg shadow-lg mb-4`,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
            borderWidth: 1,
            shadowColor: colors.shadowColor,
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 8,
            elevation: 5,
          },
        ]}
      >
        <Image
          source={{ uri: user.avatar || 'https://example.com/avatar.jpg' }}
          style={tw`w-20 h-20 rounded-full border-2 border-gray-300`}
        />
        <View style={tw`ml-4 flex-1`}>
          <Text style={[tw`text-xl font-semibold mb-1`, { color: colors.text }]}>
            {user.username}
          </Text>
          <Text style={[tw`text-sm`, { color: colors.placeholder }]}>
            群昵称: {user.username || 'Genie Timer'}
          </Text>
          <Text style={[tw`text-sm`, { color: colors.placeholder }]}>地区: {user.region}</Text>
        </View>
      </View>

      <Pressable
        style={[
          tw`p-4 rounded-lg shadow-lg mb-4`,
          { backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1 },
        ]}
      >
        <Text style={[tw`text-base font-medium`, { color: colors.text }]}>设置备注和标签</Text>
      </Pressable>

      <View
        style={[
          tw`p-4 rounded-lg shadow-lg mb-4`,
          { backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1 },
        ]}
      >
        <Text style={[tw`text-sm mb-2`, { color: colors.placeholder }]}>个性签名</Text>
        <Text style={[tw`text-base`, { color: colors.text }]}>{user.signature || '暂无签名'}</Text>
      </View>

      <Pressable
        style={[
          tw`p-4 rounded-lg shadow-lg mb-4`,
          { backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1 },
        ]}
      >
        <Text style={[tw`text-base font-medium`, { color: colors.text }]}>朋友圈</Text>
      </Pressable>

      {user.isFriend ? (
        <Pressable
          style={[
            tw`py-4 mt-6 items-center rounded-lg`,
            {
              backgroundColor: colors.primary,
              shadowColor: '#000',
              shadowOpacity: 0.2,
              shadowOffset: { width: 0, height: 2 },
              shadowRadius: 2,
              elevation: 5,
            },
          ]}
        >
          <Text style={[tw`text-lg font-semibold`, { color: colors.primaryText }]}>发送信息</Text>
        </Pressable>
      ) : (
        <Link
          href={{
            pathname: '/(home)/reply/[id]',
            params: { id: id as string },
          }}
          style={[
            tw`py-4 mt-6 items-center rounded-lg`,
            {
              backgroundColor: colors.primary,
              shadowColor: '#000',
              shadowOpacity: 0.2,
              shadowOffset: { width: 0, height: 2 },
              shadowRadius: 2,
              elevation: 5,
            },
          ]}
        >
          <Text style={[tw`text-lg font-semibold`, { color: colors.primaryText }]}>
            添加到通讯录
          </Text>
        </Link>
      )}
    </View>
  );
};

export default ContactUserInfo;
