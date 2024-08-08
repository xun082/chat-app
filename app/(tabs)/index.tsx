import { View, Text, Pressable, ScrollView } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import tw from 'twrnc';

import DropdownMenu from '@/components/menu/DropdownMenu';
import { useTheme } from '@/context/ThemeContext';

const User = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [menuVisible, setMenuVisible] = useState<boolean>(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={tw`flex-1 items-center justify-center`}>
          <Text style={[tw`text-lg`, { color: colors.text }]}>微信</Text>
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
    <ScrollView>
      <Text>User</Text>
      <DropdownMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />
    </ScrollView>
  );
};

export default User;
