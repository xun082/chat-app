import React, { useLayoutEffect, useState } from 'react';
import {
  Text,
  View,
  Pressable,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';

import { useTheme } from '@/context/ThemeContext';
import FullScreenModal from '@/components/model/search-model';

const menuItems = [
  {
    icon: 'https://cdn.pixabay.com/photo/2018/07/10/21/53/tournament-3529744_1280.jpg',
    title: '雷达加朋友',
    subtitle: '添加身边的朋友',
  },
  {
    icon: 'https://cdn.pixabay.com/photo/2018/07/10/21/53/tournament-3529744_1280.jpg',
    title: '面对面建群',
    subtitle: '与身边的朋友进入同一个群聊',
  },
  {
    icon: 'https://cdn.pixabay.com/photo/2018/07/10/21/53/tournament-3529744_1280.jpg',
    title: '扫一扫',
    subtitle: '扫描二维码名片',
  },
  {
    icon: 'https://cdn.pixabay.com/photo/2018/07/10/21/53/tournament-3529744_1280.jpg',
    title: '手机联系人',
    subtitle: '添加或邀请通讯录中的朋友',
  },
  {
    icon: 'https://cdn.pixabay.com/photo/2018/07/10/21/53/tournament-3529744_1280.jpg',
    title: '公众号',
    subtitle: '获取更多资讯和服务',
  },
  {
    icon: 'https://cdn.pixabay.com/photo/2018/07/10/21/53/tournament-3529744_1280.jpg',
    title: '企业微信联系人',
    subtitle: '通过手机号搜索企业微信用户',
  },
];

const AddFriends: React.FC = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [isModalVisible, setModalVisible] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={tw`flex-1 items-center justify-center`}>
          <Text style={[tw`text-lg font-bold`, { color: colors.text }]}>添加朋友</Text>
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

  const toggleModal = () => {
    if (isModalVisible) {
      setTimeout(() => {
        setModalVisible(false);
      }, 300);
    } else {
      setModalVisible(true);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[tw`flex-1`, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={tw`px-4 py-2`}>
        <Pressable onPress={toggleModal}>
          <View pointerEvents="none">
            <TextInput
              style={[
                tw`px-4 py-2 rounded-lg`,
                {
                  backgroundColor: colors.inputBackground,
                  color: colors.inputText,
                  borderWidth: 1,
                  borderColor: colors.border,
                },
              ]}
              placeholder="账号/手机号"
              placeholderTextColor={colors.placeholder}
              value=""
              readOnly={true}
            />
          </View>
        </Pressable>
        <View style={tw`flex-row items-center mt-2`}>
          <Text style={[tw`text-base`, { color: colors.placeholder }]}>我的微信号：yunmz777</Text>
          <Image
            source={{
              uri: 'https://cdn.pixabay.com/photo/2018/07/10/21/53/tournament-3529744_1280.jpg',
            }}
            style={tw`w-6 h-6 ml-2 rounded-full`} // 添加圆角
            resizeMode="cover"
          />
        </View>
      </View>
      <View style={tw`mt-4`}>
        {menuItems.map((item, index) => (
          <Pressable
            key={index}
            style={[
              tw`flex-row items-center px-4 py-3 mb-2 rounded-lg`, // 添加圆角和下方间距
              {
                backgroundColor: colors.card,
                shadowColor: colors.shadowColor || '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 3, // 适用于安卓的阴影
              },
            ]}
          >
            <Image
              source={{ uri: item.icon }}
              style={tw`w-8 h-8 mr-4 rounded-lg`} // 调整图片大小并添加圆角
              resizeMode="cover"
            />
            <View style={tw`flex-1`}>
              <Text style={[tw`text-base font-semibold`, { color: colors.text }]}>
                {item.title}
              </Text>
              {item.subtitle && (
                <Text style={[tw`text-sm mt-1`, { color: colors.placeholder }]}>
                  {item.subtitle}
                </Text>
              )}
            </View>
          </Pressable>
        ))}
      </View>
      <FullScreenModal isVisible={isModalVisible} onClose={toggleModal} />
    </KeyboardAvoidingView>
  );
};

export default AddFriends;
