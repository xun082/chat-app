import React, { useLayoutEffect, useState } from 'react';
import { View, Text, Image, ScrollView, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';

import DropdownMenu from '@/components/menu/DropdownMenu';
import { useTheme } from '@/context/ThemeContext';

export default function ContactsScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState<boolean>(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={tw`flex-1 items-center justify-center`}>
          <Text style={[tw`text-lg`, { color: colors.text }]}>通讯录</Text>
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

  return (
    <ScrollView style={{ backgroundColor: colors.background }}>
      <View style={tw`p-4`}>
        <View
          style={[
            tw`flex-row items-center p-4 rounded mb-2`,
            { backgroundColor: colors.inputBackground },
          ]}
        >
          <Ionicons name="person-add" size={24} color={colors.text} />
          <Text style={[tw`ml-4`, { color: colors.text }]}>新的朋友</Text>
        </View>
        <View
          style={[
            tw`flex-row items-center p-4 rounded mb-2`,
            { backgroundColor: colors.inputBackground },
          ]}
        >
          <Ionicons name="person-add" size={24} color={colors.text} />
          <Text style={[tw`ml-4`, { color: colors.text }]}>群聊</Text>
        </View>
        <View
          style={[
            tw`flex-row items-center p-4 rounded mb-2`,
            { backgroundColor: colors.inputBackground },
          ]}
        >
          <Ionicons name="pricetag" size={24} color={colors.text} />
          <Text style={[tw`ml-4`, { color: colors.text }]}>标签</Text>
        </View>
        <View
          style={[
            tw`flex-row items-center p-4 rounded mb-2`,
            { backgroundColor: colors.inputBackground },
          ]}
        >
          <Ionicons name="person" size={24} color={colors.text} />
          <Text style={[tw`ml-4`, { color: colors.text }]}>公众号</Text>
        </View>
        <View
          style={[
            tw`flex-row items-center p-4 rounded mb-2`,
            { backgroundColor: colors.inputBackground },
          ]}
        >
          <Ionicons name="chatbubble-ellipses" size={24} color={colors.text} />
          <Text style={[tw`ml-4`, { color: colors.text }]}>企业微信联系人</Text>
        </View>
      </View>

      <View style={tw`p-4`}>
        <Text style={[tw`mb-2`, { color: colors.placeholder }]}>A</Text>
        <View
          style={[
            tw`flex-row items-center p-4 rounded mb-2`,
            { backgroundColor: colors.inputBackground },
          ]}
        >
          <Image
            source={{ uri: 'https://example.com/avatar1.jpg' }}
            style={tw`w-10 h-10 rounded-full`}
          />
          <Text style={[tw`ml-4`, { color: colors.text }]}>Moment</Text>
        </View>
        <View
          style={[
            tw`flex-row items-center p-4 rounded mb-2`,
            { backgroundColor: colors.inputBackground },
          ]}
        >
          <Image
            source={{ uri: 'https://example.com/avatar2.jpg' }}
            style={tw`w-10 h-10 rounded-full`}
          />
          <Text style={[tw`ml-4`, { color: colors.text }]}>Moment</Text>
        </View>
        {/* 添加更多联系人 */}
      </View>
      <DropdownMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />
    </ScrollView>
  );
}
