import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Modal,
  ScrollView,
  Image,
} from 'react-native';
import tw from 'twrnc';

import { searchUserByEmail } from '@/services';

interface FullScreenModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const FullScreenModal: React.FC<FullScreenModalProps> = ({ isVisible, onClose }) => {
  const [search, setSearch] = useState<string>('2042204285@qq.com');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleOnClose = () => {
    setSearch('');
    setSearchResults([]); // 清空搜索结果
    onClose();
  };

  const handleSearchSubmit = async () => {
    const response = await searchUserByEmail({ email: search });
    const data = response.data;

    if (data) {
      setSearchResults([data]); // 假设 API 返回单个用户对象，将其包装在数组中
    } else {
      setSearchResults([]);
    }
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleOnClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={tw`flex-1 justify-end`}
      >
        <View style={tw`w-full h-full bg-black`}>
          <View style={tw`flex-row items-center justify-between p-4`}>
            <TextInput
              style={tw`flex-1 h-10 bg-gray-800 text-white px-4 rounded-lg`}
              placeholder="账号/手机号"
              placeholderTextColor="gray"
              value={search}
              onChangeText={setSearch}
              returnKeyType="search"
              onSubmitEditing={handleSearchSubmit}
              autoFocus
            />
            <Pressable onPress={handleOnClose} style={tw`ml-2`}>
              <Text style={tw`text-white text-lg`}>取消</Text>
            </Pressable>
          </View>
          <ScrollView style={tw`p-4`}>
            {searchResults.map((user, index) => (
              <View key={index} style={tw`mb-4 p-4 bg-gray-800 rounded-lg`}>
                <Text style={tw`text-white mb-2`}>用户名: {user.username}</Text>
                <Text style={tw`text-white mb-2`}>邮箱: {user.email}</Text>
                <Text style={tw`text-white mb-2`}>
                  创建时间: {new Date(user.createdAt * 1000).toLocaleString()}
                </Text>
                <Image source={{ uri: user.avatar as string }} style={tw`w-16 h-16 rounded-full`} />
              </View>
            ))}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default FullScreenModal;
