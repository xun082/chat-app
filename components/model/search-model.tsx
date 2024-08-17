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
import { useSearchStore } from '@/stores/useSearchStore';
import { useTheme } from '@/context/ThemeContext';

interface FullScreenModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const FullScreenModal: React.FC<FullScreenModalProps> = ({ isVisible, onClose }) => {
  const { colors } = useTheme();
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
        <View style={[tw`w-full h-full rounded-t-lg`, { backgroundColor: colors.background }]}>
          <View style={tw`flex-row items-center justify-between p-4 border-b border-gray-300`}>
            <TextInput
              style={[
                tw`flex-1 h-10 px-4 rounded-full`,
                {
                  backgroundColor: colors.inputBackground,
                  color: colors.text,
                  borderColor: colors.primary,
                  borderWidth: 1,
                },
              ]}
              placeholder="账号/手机号"
              placeholderTextColor={colors.placeholder}
              value={search}
              onChangeText={setSearch}
              returnKeyType="search"
              onSubmitEditing={handleSearchSubmit}
              autoFocus
            />
            <Pressable onPress={handleOnClose} style={tw`ml-4`}>
              <Text style={[tw`text-lg`, { color: colors.primary }]}>取消</Text>
            </Pressable>
          </View>
          <ScrollView style={tw`p-4`}>
            {searchResult ? (
              <Link
                href={{
                  pathname: '/(home)/contact/[id]',
                  params: { id: searchResult._id },
                }}
                asChild
              >
                <Pressable onPress={handleOnClose}>
                  <View
                    style={[
                      tw`mb-4 p-4 rounded-lg flex-row items-center w-full`,
                      {
                        backgroundColor: colors.card,
                        borderColor: colors.border,
                        borderWidth: 1,
                        shadowColor: colors.text,
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.3,
                        shadowRadius: 5,
                        elevation: 5,
                      },
                    ]}
                  >
                    <Image
                      source={{ uri: searchResult.avatar }}
                      style={tw`w-20 h-20 rounded-full border-2 border-gray-300`}
                    />
                    <View style={tw`flex-1 ml-4`}>
                      {/* 使用 flex-1 和 ml-4 控制布局 */}
                      <Text style={[tw`text-base font-medium mb-2`, { color: colors.text }]}>
                        用户名: {searchResult.username}
                      </Text>
                      <Text style={[tw`text-base font-medium mb-2`, { color: colors.text }]}>
                        邮箱: {searchResult.email}
                      </Text>
                      <Text style={[tw`text-base font-medium`, { color: colors.text }]}>
                        创建时间:{' '}
                        {new Date(parseInt(searchResult.createdAt) * 1000).toLocaleString()}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              </Link>
            ) : (
              <Text style={[tw`text-center`, { color: colors.text }]}>没有找到匹配的用户</Text>
            )}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default FullScreenModal;
