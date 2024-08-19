import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, Image, ScrollView, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router'; // 使用useRouter来进行页面跳转

import DropdownMenu from '@/components/menu/DropdownMenu';
import { useTheme } from '@/context/ThemeContext';
import { Friend, getFriendsList } from '@/services';

export default function ContactsScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const router = useRouter(); // 获取路由对象
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [friends, setFriends] = useState<Array<Friend>>([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={tw`flex-1 items-center justify-center`}>
          <Text style={[tw`text-lg font-bold`, { color: colors.text }]}>通讯录</Text>
        </View>
      ),
      headerRight: () => (
        <View accessible={true} style={tw`flex-row pr-4`}>
          <Pressable onPress={() => alert('Search pressed')}>
            <Ionicons name="search" size={24} color={colors.text} style={tw`mr-4`} />
          </Pressable>
          <Pressable onPress={() => setMenuVisible(true)}>
            <Ionicons name="add-circle-outline" size={24} color={colors.text} />
          </Pressable>
        </View>
      ),
      headerStyle: {
        backgroundColor: colors.background,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
      },
      headerTitleAlign: 'center',
    });
  }, [navigation, colors]);

  useEffect(() => {
    async function loadFriends() {
      const data = await getFriendsList();

      setFriends(data.data);
    }

    loadFriends();
  }, []);

  return (
    <ScrollView style={{ backgroundColor: colors.background }}>
      <View style={tw`p-4`}>
        <Pressable
          style={[
            tw`flex-row items-center p-4 rounded mb-4`,
            {
              backgroundColor: colors.card,
              shadowColor: colors.shadowColor || '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 2,
            },
          ]}
        >
          <Ionicons name="person-add" size={24} color={colors.primary} />
          <Text style={[tw`ml-4 text-base font-semibold`, { color: colors.text }]}>新的朋友</Text>
        </Pressable>

        <Pressable
          style={[
            tw`flex-row items-center p-4 rounded mb-4`,
            {
              backgroundColor: colors.card,
              shadowColor: colors.shadowColor || '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 2,
            },
          ]}
        >
          <Ionicons name="people" size={24} color={colors.primary} />
          <Text style={[tw`ml-4 text-base font-semibold`, { color: colors.text }]}>群聊</Text>
        </Pressable>

        <Pressable
          style={[
            tw`flex-row items-center p-4 rounded mb-4`,
            {
              backgroundColor: colors.card,
              shadowColor: colors.shadowColor || '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 2,
            },
          ]}
        >
          <Ionicons name="pricetag" size={24} color={colors.primary} />
          <Text style={[tw`ml-4 text-base font-semibold`, { color: colors.text }]}>标签</Text>
        </Pressable>

        <Pressable
          style={[
            tw`flex-row items-center p-4 rounded mb-4`,
            {
              backgroundColor: colors.card,
              shadowColor: colors.shadowColor || '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 2,
            },
          ]}
        >
          <Ionicons name="person" size={24} color={colors.primary} />
          <Text style={[tw`ml-4 text-base font-semibold`, { color: colors.text }]}>公众号</Text>
        </Pressable>

        <Pressable
          style={[
            tw`flex-row items-center p-4 rounded mb-4`,
            {
              backgroundColor: colors.card,
              shadowColor: colors.shadowColor || '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 2,
            },
          ]}
        >
          <Ionicons name="chatbubble-ellipses" size={24} color={colors.primary} />
          <Text style={[tw`ml-4 text-base font-semibold`, { color: colors.text }]}>
            企业微信联系人
          </Text>
        </Pressable>
      </View>

      <View style={tw`p-4`}>
        {friends &&
          friends.map((friend, index) => (
            <View key={index}>
              <Text style={[tw`mb-2 text-sm`, { color: colors.placeholder }]}>
                {friend.friendUsername.charAt(0).toUpperCase()}
              </Text>
              <Pressable
                onPress={() =>
                  router.push({
                    pathname: '/(home)/contact/[id]',
                    params: { id: friend.friendId },
                  })
                }
                style={[
                  tw`flex-row items-center p-4 rounded mb-4`,
                  {
                    backgroundColor: colors.card,
                    shadowColor: colors.shadowColor || '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 2,
                  },
                ]}
              >
                <Image source={{ uri: friend.avatar }} style={tw`w-10 h-10 rounded-full`} />
                <Text style={[tw`ml-4 text-base font-semibold`, { color: colors.text }]}>
                  {friend.friendRemark}
                </Text>
              </Pressable>
            </View>
          ))}
      </View>
      <DropdownMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />
    </ScrollView>
  );
}
