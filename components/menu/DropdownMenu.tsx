import React from 'react';
import { View, Text, Pressable, Modal } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import tw from 'twrnc';
import { useRouter } from 'expo-router';

import { useTheme } from '@/context/ThemeContext';

interface DropdownMenuProps {
  visible: boolean;
  onClose: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ visible, onClose }) => {
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onClose}>
      <Pressable style={tw`flex-1 justify-start items-end`} onPress={onClose}>
        <View
          accessible={true}
          style={[
            tw`mt-12 mr-4 rounded-lg overflow-hidden`,
            { backgroundColor: colors.background },
          ]}
        >
          <Pressable style={tw`flex-row items-center p-4`} onPress={() => alert('发起群聊')}>
            <Ionicons name="chatbubble-ellipses-outline" size={24} color={colors.text} />
            <Text style={[tw`ml-4`, { color: colors.text }]}>发起群聊</Text>
          </Pressable>
          <Pressable
            style={tw`flex-row items-center p-4`}
            onPress={() => {
              onClose();
              router.push('/add-friends');
            }}
          >
            <Ionicons name="person-add-outline" size={24} color={colors.text} />
            <Text style={[tw`ml-4`, { color: colors.text }]}>添加朋友</Text>
          </Pressable>
          <Pressable style={tw`flex-row items-center p-4`} onPress={() => alert('扫一扫')}>
            <Ionicons name="scan-outline" size={24} color={colors.text} />
            <Text style={[tw`ml-4`, { color: colors.text }]}>扫一扫</Text>
          </Pressable>
          <Pressable style={tw`flex-row items-center p-4`} onPress={() => alert('收付款')}>
            <Ionicons name="card-outline" size={24} color={colors.text} />
            <Text style={[tw`ml-4`, { color: colors.text }]}>收付款</Text>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
};

export default DropdownMenu;
