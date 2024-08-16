import React, { useLayoutEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, Image, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';

import { useTheme } from '@/context/ThemeContext';
import { useUserStore } from '@/stores/userStore';
import { UpdateUserDto, updateUserInfo, uploadSingleFile } from '@/services';

const UpdateUserProfileForm: React.FC = () => {
  const { colors } = useTheme();
  const { user } = useUserStore();
  const { control, handleSubmit, setValue } = useForm<UpdateUserDto>({
    defaultValues: {
      username: user.username || '',
      region: user.region || '',
      signature: user.signature || '',
      avatar: user.avatar || '',
      backgroundImage: user.backgroundImage || '',
    },
  });
  const navigation = useNavigation();
  const router = useRouter();
  const [uploading, setUploading] = useState<boolean>(false);

  const onSubmit = async (data: UpdateUserDto) => {
    try {
      const response = await updateUserInfo(data);
      console.log('User info updated successfully:', response);

      router.push('/user');
    } catch (error) {
      console.error('Failed to update user info:', error);
      // 在这里处理失败后的逻辑，例如显示错误提示
    }
  };

  const getFileNameFromUri = (uri: string): string => {
    return uri.split('/').pop() || 'default-filename.jpg';
  };

  const pickImage = async (field: keyof UpdateUserDto) => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Permission to access camera roll is required!');

      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      setUploading(true);

      const fileName = getFileNameFromUri(pickerResult.assets[0].uri);

      const response = await fetch(pickerResult.assets[0].uri);
      const blob = await response.blob();

      const file = new File([blob], fileName, { type: blob.type });

      const data = await uploadSingleFile(file, 'moment', fileName);

      setValue(field, data.data.url);

      setUploading(false);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={tw`flex-1 items-center justify-center`}>
          <Text style={[tw`text-lg font-semibold`, { color: colors.text }]}>个人信息</Text>
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
    <View style={[tw`flex-1 p-6`, { backgroundColor: colors.background }]}>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={tw`mb-5`}>
            <Text style={[tw`mb-2 text-base font-medium`, { color: colors.text }]}>用户名</Text>
            <TextInput
              style={[
                tw`p-3 border rounded-lg shadow-sm`,
                {
                  borderColor: colors.border,
                  color: colors.text,
                  backgroundColor: colors.inputBackground,
                },
              ]}
              placeholder="请输入用户名"
              placeholderTextColor={colors.placeholder}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value || ''}
            />
          </View>
        )}
        name="username"
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={tw`mb-5`}>
            <Text style={[tw`mb-2 text-base font-medium`, { color: colors.text }]}>地区</Text>
            <TextInput
              style={[
                tw`p-3 border rounded-lg shadow-sm`,
                {
                  borderColor: colors.border,
                  color: colors.text,
                  backgroundColor: colors.inputBackground,
                },
              ]}
              placeholder="请输入所在地区"
              placeholderTextColor={colors.placeholder}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value || ''}
            />
          </View>
        )}
        name="region"
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={tw`mb-5`}>
            <Text style={[tw`mb-2 text-base font-medium`, { color: colors.text }]}>个性签名</Text>
            <TextInput
              style={[
                tw`p-3 border rounded-lg shadow-sm`,
                {
                  borderColor: colors.border,
                  color: colors.text,
                  backgroundColor: colors.inputBackground,
                },
              ]}
              placeholder="请输入个性签名"
              placeholderTextColor={colors.placeholder}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value || ''}
            />
          </View>
        )}
        name="signature"
      />

      <Controller
        control={control}
        render={({ field: { value } }) => (
          <View style={tw`mb-5`}>
            <Text style={[tw`mb-2 text-base font-medium`, { color: colors.text }]}>头像</Text>
            <Pressable onPress={() => pickImage('avatar')} style={tw`mb-3`}>
              <Image
                source={{ uri: value || 'https://placeholder.url/default-avatar.png' }}
                style={tw`w-24 h-24 rounded-full border-2 border-gray-300 shadow-sm`}
              />
              {uploading && (
                <Text style={[tw`text-sm mt-2`, { color: colors.text }]}>上传中...</Text>
              )}
            </Pressable>
          </View>
        )}
        name="avatar"
      />

      <Controller
        control={control}
        render={({ field: { value } }) => (
          <View style={tw`mb-5`}>
            <Text style={[tw`mb-2 text-base font-medium`, { color: colors.text }]}>背景图片</Text>
            <Pressable onPress={() => pickImage('backgroundImage')} style={tw`mb-3`}>
              <Image
                source={{ uri: value || 'https://placeholder.url/default-background.png' }}
                style={tw`w-full h-48 rounded-lg border-2 border-gray-300 shadow-sm`}
              />
              {uploading && (
                <Text style={[tw`text-sm mt-2`, { color: colors.text }]}>上传中...</Text>
              )}
            </Pressable>
          </View>
        )}
        name="backgroundImage"
      />

      <Pressable
        onPress={handleSubmit(onSubmit)}
        style={[
          tw`p-4 mt-6 rounded-lg`,
          {
            backgroundColor: colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
            shadowOpacity: 0.3,
            shadowRadius: 10,
          },
        ]}
      >
        <Text style={[tw`text-white text-lg font-semibold`, { color: colors.primaryText }]}>
          保存修改
        </Text>
      </Pressable>
    </View>
  );
};

export default UpdateUserProfileForm;
