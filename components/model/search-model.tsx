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
import { Link } from 'expo-router';

import { searchUserByEmail } from '@/services';
import { useSearchStore } from '@/store/useSearchStore';

interface FullScreenModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const FullScreenModal: React.FC<FullScreenModalProps> = ({ isVisible, onClose }) => {
  const [search, setSearch] = useState<string>('2042204285@qq.com');
  const { searchResult, setSearchResult, clearSearchResult } = useSearchStore();

  const handleOnClose = () => {
    setSearch('');
    onClose();
  };

  const handleSearchSubmit = async () => {
    try {
      const response = await searchUserByEmail({ email: search });
      const data = response.data;

      if (data) {
        setSearchResult(data);
      }
    } catch (error) {
      console.error('Error searching user:', error);
      clearSearchResult();
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
            {searchResult ? (
              <Pressable onPress={handleOnClose}>
                <Link
                  href={{
                    pathname: '/(home)/user/[id]',
                    params: { id: searchResult._id },
                  }}
                >
                  <View style={tw`mb-4 p-4 bg-gray-800 rounded-lg`}>
                    <Text style={tw`text-white mb-2`}>用户名: {searchResult.username}</Text>
                    <Text style={tw`text-white mb-2`}>邮箱: {searchResult.email}</Text>
                    <Text style={tw`text-white mb-2`}>
                      创建时间: {new Date(searchResult.createdAt * 1000).toLocaleString()}
                    </Text>
                    <Image
                      source={{ uri: searchResult.avatar }}
                      style={tw`w-16 h-16 rounded-full`}
                    />
                  </View>
                </Link>
              </Pressable>
            ) : (
              <Text style={tw`text-white text-center`}>没有找到匹配的用户</Text>
            )}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default FullScreenModal;
