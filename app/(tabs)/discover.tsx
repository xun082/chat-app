import React, { useLayoutEffect } from 'react';
import { View, Text, Pressable, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import tw from 'twrnc';

import { useTheme } from '@/context/ThemeContext';

const DiscoverScreen = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={tw`flex-1 items-center justify-center`}>
          <Text style={[tw`text-lg`, { color: colors.text }]}>发现</Text>
        </View>
      ),
      headerRight: () => (
        <View accessible={true} style={tw`flex-row pr-4`}>
          <Pressable onPress={() => alert('Search pressed')}>
            <Ionicons name="search" size={24} color={colors.text} style={tw`mr-4`} />
          </Pressable>
          <Pressable onPress={() => alert('Add pressed')}>
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
    <ScrollView style={[tw`flex-1`, { backgroundColor: colors.background }]}>
      <Pressable
        style={[
          tw`flex-row items-center p-4`,
          {
            backgroundColor: colors.background,
            borderBottomColor: colors.border,
            borderBottomWidth: 1,
          },
        ]}
        onPress={() => alert('Moments pressed')}
      >
        <Image
          source={{ uri: 'https://cdn.pixabay.com/photo/2024/07/15/16/09/bird-8897237_1280.jpg' }} // 朋友圈图标的URL
          style={tw`w-10 h-10 rounded-full mr-4`}
        />
        <Text style={[tw`text-lg`, { color: colors.text }]}>朋友圈</Text>
      </Pressable>
    </ScrollView>
  );
};

export default DiscoverScreen;
