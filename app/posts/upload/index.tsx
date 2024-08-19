import React, { useLayoutEffect, useState } from 'react';
import { View, Text, Pressable, TextInput, Image, ScrollView, Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import tw from 'twrnc';
import * as ImagePicker from 'expo-image-picker';

import { useTheme } from '@/context/ThemeContext';
import { uploadMultipleFiles } from '@/services';
import { createPost, CreatePostDto } from '@/services/post';

interface ImageItem {
  id: string;
  uri: string;
}

const PostUpload: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const { colors } = useTheme();
  const [postText, setPostText] = useState<string>('');
  const [images, setImages] = useState<ImageItem[]>([]);
  const [inputHeight, setInputHeight] = useState<number>(80);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={tw`flex-1 items-center justify-center`}>
          <Text style={[tw`text-lg`, { color: colors.text }]}>发布</Text>
        </View>
      ),
      headerRight: () => (
        <Pressable
          style={tw`bg-green-500 px-4 py-2 rounded-lg m-2 border border-green-700 shadow-md`}
          onPress={handleSubmit}
        >
          <Text style={tw`text-white text-center`}>发表</Text>
        </Pressable>
      ),
      headerLeft: () => (
        <Pressable style={tw`pl-4`} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </Pressable>
      ),
      headerStyle: {
        backgroundColor: colors.background,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
      },
      headerTitleAlign: 'center',
    });
  }, [navigation, colors, postText, images]);

  const handleContentSizeChange = (contentWidth: number, contentHeight: number) => {
    if (contentHeight > inputHeight) {
      setInputHeight(contentHeight + 20);
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('没有权限', '请授予访问图片库的权限。');

      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true, // 允许多选
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      const newImages = result.assets.map((asset, index) => ({
        id: (images.length + index + 1).toString(),
        uri: asset.uri,
      }));
      setImages([...images, ...newImages]);
    }
  };

  const handleSubmit = async () => {
    if (!postText && images.length === 0) {
      Alert.alert('发布失败', '请至少输入内容或选择一张图片');

      return;
    }

    let uploadedImageUrls: string[] = [];

    if (images.length > 0) {
      // 将 URI 转换为 File 对象
      const files: File[] = await Promise.all(
        images.map(async (image, index) => {
          const response = await fetch(image.uri);
          const blob = await response.blob();

          return new File([blob], `image-${Date.now()}-${index}.jpg`, { type: blob.type });
        }),
      );

      // 调用多文件上传的接口
      const response = await uploadMultipleFiles(files);

      if (response && response.code === 201) {
        uploadedImageUrls = response.data.urls;
      } else {
        Alert.alert('上传图片失败', '请稍后重试');

        return;
      }
    }

    // 准备请求体数据
    const postData: CreatePostDto = {
      content: postText,
      images: uploadedImageUrls,
      isPublic: true,
      location: '上海市，黄浦区',
    };

    try {
      const response = await createPost(postData);

      if (response && response.code === 201) {
        Alert.alert('发布成功', '您的内容已成功发布');
        navigation.goBack();
      } else {
        Alert.alert('发布失败', '请稍后再试');
      }
    } catch (error) {
      Alert.alert('发布失败', '发生错误，请稍后再试');
    }
  };

  const renderImages = () => {
    return images.map((image) => (
      <Image
        key={image.id}
        source={{ uri: image.uri }}
        style={[
          tw`w-[30%] h-[110px] mr-1 mb-2 rounded-lg`,
          {
            borderColor: colors.border,
            borderWidth: 1,
          },
        ]}
        resizeMode="cover"
      />
    ));
  };

  return (
    <ScrollView
      style={[tw`flex-1 p-4`, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <TextInput
        style={[
          tw`text-lg p-4 mb-4`,
          {
            color: colors.text,
            backgroundColor: colors.background,
            borderColor: 'transparent',
            borderWidth: 0,
            borderRadius: 8,
            height: inputHeight,
            textAlignVertical: 'top',
          },
        ]}
        placeholder="这一刻的想法..."
        placeholderTextColor={tw.color('gray-500')}
        multiline
        value={postText}
        onChangeText={setPostText}
        onContentSizeChange={(event) =>
          handleContentSizeChange(
            event.nativeEvent.contentSize.width,
            event.nativeEvent.contentSize.height,
          )
        }
        scrollEnabled={false}
      />

      <View style={tw`flex-row flex-wrap mb-4 justify-start gap-2`}>
        {renderImages()}
        {images.length < 9 && (
          <Pressable
            style={[
              tw`w-[30%] h-[110px] justify-center items-center border-dashed border-2`,
              {
                backgroundColor: tw.color('gray-800'),
                borderColor: tw.color('gray-600'),
                borderRadius: 10,
              },
            ]}
            onPress={pickImage}
          >
            <Ionicons name="add" size={32} color={tw.color('gray-400')} />
          </Pressable>
        )}
      </View>

      <View style={tw`mt-4`}>
        <Pressable
          style={tw`flex-row items-center py-4 border-b border-gray-600`}
          onPress={() => alert('Select Location')}
        >
          <Ionicons name="location-outline" size={24} color={tw.color('gray-400')} />
          <Text style={[tw`ml-3 text-base`, { color: tw.color('gray-400') }]}>所在位置</Text>
        </Pressable>
        <Pressable
          style={tw`flex-row items-center py-4 border-b border-gray-600`}
          onPress={() => alert('Select Who Can See')}
        >
          <Ionicons name="at-outline" size={24} color={tw.color('gray-400')} />
          <Text style={[tw`ml-3 text-base`, { color: tw.color('gray-400') }]}>提醒谁看</Text>
        </Pressable>
        <Pressable style={tw`flex-row items-center py-4`} onPress={() => alert('Select Privacy')}>
          <Ionicons name="eye-outline" size={24} color={tw.color('gray-400')} />
          <Text style={[tw`ml-3 text-base`, { color: tw.color('gray-400') }]}>谁可以看</Text>
          <Text style={[tw`ml-auto text-base`, { color: tw.color('gray-400') }]}>公开</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default PostUpload;
