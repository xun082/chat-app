import React, { useLayoutEffect } from 'react';
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';

import { useTheme } from '@/context/ThemeContext';

const AddFriendRequestScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={tw`flex-1 items-center justify-center`}>
          <Text style={[tw`text-lg`, { color: colors.text }]}>添加好友</Text>
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

  return (
    <ScrollView style={[tw`flex-1`, { backgroundColor: colors.background }]}>
      <View style={tw`p-4`}>
        <Text style={[tw`text-lg mb-4`, { color: colors.text }]}>发送添加好友申请</Text>
        <View style={[tw`p-4 rounded mb-4`, { backgroundColor: colors.inputBackground }]}>
          <TextInput
            style={[tw`text-white`, { height: 100, color: colors.text }]}
            multiline
            value="我是群聊“Loopy 的编程秘书”的moment"
            placeholderTextColor={colors.placeholder}
          />
        </View>

        <Text style={[tw`text-lg mb-4`, { color: colors.text }]}>设置备注</Text>
        <View style={[tw`p-4 rounded mb-4`, { backgroundColor: colors.inputBackground }]}>
          <TextInput
            style={[tw`text-white`, { color: colors.text }]}
            placeholder="Gee"
            placeholderTextColor={colors.placeholder}
            value="Gee"
          />
        </View>
        <Text style={[tw`mb-4`, { color: colors.placeholder }]}>对方的群昵称: “Genie Timer”</Text>

        <Pressable style={[tw`p-4 rounded mb-4`, { backgroundColor: colors.inputBackground }]}>
          <Text style={[tw`text-white`, { color: colors.text }]}>标签</Text>
        </Pressable>

        <Pressable style={[tw`p-4 rounded mb-4`, { backgroundColor: colors.inputBackground }]}>
          <Text style={[tw`text-white`, { color: colors.text }]}>描述</Text>
        </Pressable>

        <Text style={[tw`text-lg mb-4`, { color: colors.text }]}>设置朋友权限</Text>
        <Pressable
          style={[
            tw`p-4 rounded mb-4 flex-row justify-between items-center`,
            { backgroundColor: colors.inputBackground },
          ]}
        >
          <Text style={[tw`text-white`, { color: colors.text }]}>聊天、朋友圈、微信运动等</Text>
          <Text style={{ color: colors.text }}>✓</Text>
        </Pressable>
        <Pressable style={[tw`p-4 rounded mb-4`, { backgroundColor: colors.inputBackground }]}>
          <Text style={[tw`text-white`, { color: colors.text }]}>仅聊天</Text>
        </Pressable>
      </View>

      <Pressable style={[tw`p-4 m-4 rounded items-center`, { backgroundColor: colors.text }]}>
        <Text style={tw`text-white text-lg`}>发送</Text>
      </Pressable>
    </ScrollView>
  );
};

export default AddFriendRequestScreen;
