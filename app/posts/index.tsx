import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View, Pressable, Image, ScrollView } from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { useTheme } from '@/context/ThemeContext';

const Post = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const router = useRouter();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true, // 设置顶部栏透明
      headerLeft: () => (
        <View accessible={true} style={tw`flex-row pl-4`}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </Pressable>
        </View>
      ),
      // 将 headerTitle 设置为空的 View
      headerTitle: () => <View />,
      headerRight: () => (
        <View accessible={true} style={tw`flex-row pr-4`}>
          <Pressable
            onPress={() => {
              router.push('/posts/upload');
            }}
          >
            <Ionicons name="camera" size={24} color={colors.text} />
          </Pressable>
        </View>
      ),
      headerStyle: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderBottomWidth: 0,
      },
      headerTitleAlign: 'center',
    });
  }, [navigation, colors]);

  return (
    <ScrollView style={[tw`flex-1`, { backgroundColor: colors.background }]}>
      <View style={tw`relative`}>
        {/* 背景图片 */}
        <Image
          source={{
            uri: 'https://cdn.pixabay.com/photo/2023/11/01/11/15/cable-car-8357178_1280.jpg',
          }}
          style={tw`w-full h-64`}
        />

        {/* 头像 */}
        <View style={tw`absolute bottom-0 right-0 flex-row items-end p-4`}>
          <Text style={tw`text-white text-lg mr-2`}>moment</Text>
          <Image
            source={{
              uri: 'https://cdn.pixabay.com/photo/2023/11/01/11/15/cable-car-8357178_1280.jpg',
            }}
            style={tw`w-16 h-16 rounded-full border-2 border-white`}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Post;
