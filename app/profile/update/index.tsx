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

const FormInput = ({ label, placeholder, control, name, colors, secureTextEntry = false }: any) => (
  <Controller
    control={control}
    render={({ field: { onChange, onBlur, value } }) => (
      <View style={tw`mb-5`}>
        <Text style={[tw`mb-2 text-base font-medium`, { color: colors.text }]}>{label}</Text>
        <TextInput
          style={[
            tw`p-3 border rounded-lg shadow-sm`,
            {
              borderColor: colors.border,
              color: colors.text,
              backgroundColor: colors.inputBackground,
            },
          ]}
          placeholder={placeholder}
          placeholderTextColor={colors.placeholder}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value || ''}
          secureTextEntry={secureTextEntry}
        />
      </View>
    )}
    name={name}
  />
);

const ImagePickerField = ({ label, value, onPickImage, colors, style, uploading }: any) => (
  <View style={tw`mb-5`}>
    <Text style={[tw`mb-2 text-base font-medium`, { color: colors.text }]}>{label}</Text>
    <Pressable onPress={onPickImage} style={tw`mb-3`}>
      <Image
        source={{ uri: value || 'https://placeholder.url/default-avatar.png' }}
        style={tw`${style} rounded-lg border-2 border-gray-300 shadow-sm`}
      />
      {uploading && <Text style={[tw`text-sm mt-2`, { color: colors.text }]}>上传中...</Text>}
    </Pressable>
  </View>
);

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
      await updateUserInfo(data);
      router.push('/user');
    } catch (error) {
      console.error('Failed to update user info:', error);
      // 处理错误逻辑
    }
  };

  const pickImage = async (field: keyof UpdateUserDto) => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('需要访问相册权限！');

      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      setUploading(true);

      try {
        const response = await fetch(pickerResult.assets[0].uri);
        const blob = await response.blob();
        const file = new File([blob], `image-${Date.now()}`, { type: blob.type });

        const data = await uploadSingleFile(file);

        setValue(field, data.data.url);
      } catch (error) {
        console.error('上传图片失败', error);
      } finally {
        setUploading(false);
      }
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
      <FormInput
        label="用户名"
        placeholder="请输入用户名"
        control={control}
        name="username"
        colors={colors}
      />

      <FormInput
        label="地区"
        placeholder="请输入所在地区"
        control={control}
        name="region"
        colors={colors}
      />

      <FormInput
        label="个性签名"
        placeholder="请输入个性签名"
        control={control}
        name="signature"
        colors={colors}
      />

      <ImagePickerField
        label="头像"
        value={control._formValues.avatar}
        onPickImage={() => pickImage('avatar')}
        colors={colors}
        style="w-24 h-24 rounded-full"
        uploading={uploading}
      />

      <ImagePickerField
        label="背景图片"
        value={control._formValues.backgroundImage}
        onPickImage={() => pickImage('backgroundImage')}
        colors={colors}
        style="w-full h-48"
        uploading={uploading}
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
