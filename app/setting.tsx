import React from 'react';
import { SafeAreaView, View, Text, StatusBar, Switch, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';

import { useTheme } from '@/context/ThemeContext';

const SettingsPage: React.FC = () => {
  const { isDarkMode, toggleTheme, colors } = useTheme();
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`pl-4`}>
          <Text style={[tw`text-lg`, { color: colors.text }]}>返回</Text>
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <View style={tw`flex-1 items-center justify-center`}>
          <Text style={[tw`text-lg`, { color: colors.text }]}>深色模式</Text>
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`pr-4`}>
          <Text style={[tw`text-lg`, { color: colors.text }]}>完成</Text>
        </TouchableOpacity>
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
    <SafeAreaView style={[tw`flex-1`, { backgroundColor: colors.background }]}>
      <View style={tw`p-4`}>
        <View style={tw`flex-row justify-between items-center mb-4`}>
          <Text style={[tw`text-lg`, { color: colors.text }]}>跟随系统</Text>
          <Switch value={isDarkMode} onValueChange={toggleTheme} />
        </View>
        <Text style={[tw`text-sm`, { color: colors.text }]}>
          启用后，将跟随系统打开或关闭深色模式
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SettingsPage;
