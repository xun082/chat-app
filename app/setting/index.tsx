import React from 'react';
import { SafeAreaView, View, Text, Switch, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

import { useTheme } from '@/context/ThemeContext';

const SettingsPage: React.FC = () => {
  const { isDarkMode, toggleTheme, colors } = useTheme();
  const navigation = useNavigation();
  const router = useRouter();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable onPress={() => navigation.goBack()} style={tw`pl-4`}>
          <Text style={[tw`text-lg`, { color: colors.text }]}>返回</Text>
        </Pressable>
      ),
      headerTitle: () => (
        <View style={tw`flex-1 items-center justify-center`}>
          <Text style={[tw`text-lg`, { color: colors.text }]}>设置</Text>
        </View>
      ),
      headerRight: () => (
        <Pressable onPress={() => navigation.goBack()} style={tw`pr-4`}>
          <Text style={[tw`text-lg`, { color: colors.text }]}>完成</Text>
        </Pressable>
      ),
      headerStyle: {
        backgroundColor: colors.background,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
      },
      headerTitleAlign: 'center',
    });
  }, [navigation, colors]);

  const handleLogout = async () => {
    await AsyncStorage.clear();

    router.push('/login');
  };

  return (
    <SafeAreaView style={[tw`flex-1`, { backgroundColor: colors.background }]}>
      <View style={tw`p-4`}>
        <View style={tw`flex-row justify-between items-center mb-4`}>
          <Text style={[tw`text-lg`, { color: colors.text }]}>暗黑模式</Text>
          <Switch value={isDarkMode} onValueChange={toggleTheme} />
        </View>
      </View>

      {/* 添加退出登录按钮 */}
      <Pressable
        onPress={handleLogout}
        style={[
          tw`p-4 mt-6 rounded-lg mx-4`,
          {
            backgroundColor: 'red', // 退出登录按钮为红色
            alignItems: 'center',
            justifyContent: 'center',
          },
        ]}
      >
        <Text style={tw`text-lg font-semibold text-white`}>退出登录</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default SettingsPage;
