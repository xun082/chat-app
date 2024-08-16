import React, { useLayoutEffect, useState } from 'react';
import { View, Text, Image, Pressable, ScrollView, Alert } from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';

import { useTheme } from '@/context/ThemeContext';
import { useUserStore } from '@/stores/userStore';

const ContactUserInfo = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { user, setUser } = useUserStore();
  const [selectedImage, setSelectedImage] = useState(user.avatar);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={tw`flex-1 items-center justify-center`}>
          <Text style={[tw`text-lg`, { color: colors.text }]}>个人信息</Text>
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

  const pickImage = async () => {
    // 请求访问图片库的权限
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    console.log(permissionResult);

    if (permissionResult.granted === false) {
      Alert.alert('Permission to access camera roll is required!');

      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(pickerResult);

    if (!pickerResult.canceled) {
      setSelectedImage(pickerResult.assets[0].uri);
      setUser({ ...user, avatar: pickerResult.assets[0].uri });
    }
  };

  const menuItems = [
    { label: '头像', value: selectedImage, type: 'image', onPress: pickImage },
    { label: '名字', value: user.username || '未设置' },
    { label: '拍一拍', value: '点击头像' },
    { label: '邮箱号', value: user.email || '未设置' },
    { label: '二维码名片', value: '', icon: 'qr-code' },
    { label: '更多信息', value: '' },
    { label: '来电铃声', value: '' },
    { label: '微信豆', value: '' },
    { label: '我的地址', value: '' },
  ];

  return (
    <ScrollView style={[tw`flex-1`, { backgroundColor: colors.background }]}>
      <View style={tw`p-4`}>
        {menuItems.map((item, index) => (
          <Pressable
            key={index}
            onPress={item.onPress}
            style={tw`flex-row justify-between items-center p-4 border-b border-gray-800`}
          >
            <Text style={[tw`text-base`, { color: colors.text }]}>{item.label}</Text>
            <View style={tw`flex-row items-center`}>
              {item.type === 'image' ? (
                <Image
                  source={{
                    uri:
                      item.value ||
                      'https://cdn.pixabay.com/photo/2024/07/17/08/53/sunrise-8901014_1280.jpg',
                  }}
                  style={tw`w-12 h-12 rounded-full`}
                />
              ) : (
                <Text style={[tw`text-base`, { color: colors.placeholder }]}>{item.value}</Text>
              )}
              {item.icon ? (
                <Ionicons name={item.icon} size={20} color={colors.placeholder} style={tw`ml-2`} />
              ) : null}
              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.placeholder}
                style={tw`ml-2`}
              />
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

export default ContactUserInfo;
