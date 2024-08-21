import React, { useLayoutEffect, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  FlatList,
  Image,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import tw from 'twrnc';
import { useRouter } from 'expo-router';

import { useTheme } from '@/context/ThemeContext';

type Contact = {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
};

const contactsData: Contact[] = [
  {
    id: '1',
    name: 'Loopy 的编程秘籍',
    avatar: 'https://example.com/avatar1.png',
    lastMessage: '胡说八道工程师: 简单的那个代码块。',
    lastMessageTime: '09:24',
  },
  {
    id: '2',
    name: '超级简历WonderCV APP',
    avatar: 'https://example.com/avatar2.png',
    lastMessage: '想拿下年薪25w+的产品经理offer？',
    lastMessageTime: '09:04',
  },
  {
    id: '3',
    name: '掘金·前端技术交流群0x9',
    avatar: 'https://example.com/avatar3.png',
    lastMessage: '想拿下年薪25w+的产品经理offer？',
    lastMessageTime: '00:43',
  },
];

const ContactItem: React.FC<{ contact: Contact; onLongPress: () => void }> = ({
  contact,
  onLongPress,
}) => {
  const { colors } = useTheme();
  const router = useRouter();

  return (
    <Pressable
      style={[
        tw`flex-row items-center p-3 rounded-lg mx-4 my-2`,
        {
          backgroundColor: colors.cellBackGround,
          boxShadow: `0px 2px 6px ${colors.shadowColor}`,
        },
      ]}
      onPress={() => {
        router.push('/chat');
      }}
      onLongPress={onLongPress}
    >
      <Image
        source={{ uri: contact.avatar }}
        style={[
          tw`w-14 h-14 rounded-full mr-4`,
          {
            borderColor: colors.border,
            borderWidth: 1,
          },
        ]}
      />
      <View style={tw`flex-1`}>
        <View style={tw`flex-row justify-between items-center`}>
          <Text style={[tw`text-base font-semibold`, { color: colors.text }]}>{contact.name}</Text>
          <Text style={[tw`text-xs`, { color: colors.placeholder }]}>
            {contact.lastMessageTime}
          </Text>
        </View>
        <Text
          style={[
            tw`text-sm mt-1`,
            {
              color: colors.secondaryText,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            },
          ]}
          numberOfLines={1}
        >
          {contact.lastMessage}
        </Text>
      </View>
    </Pressable>
  );
};

const User = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={tw`flex-1 items-center justify-center`}>
          <Text style={[tw`text-lg font-extrabold`, { color: colors.text }]}>微信</Text>
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
        borderBottomWidth: 0.5,
        borderBottomColor: colors.border,
      },
      headerTitleAlign: 'center',
    });
  }, [navigation, colors]);

  const handleLongPress = (contact: Contact) => {
    setSelectedContact(contact);
    setMenuVisible(true);
  };

  const renderMenu = () => {
    if (!selectedContact) return null;

    return (
      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
          <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
            <View style={tw`bg-gray-800 p-4 rounded-lg shadow-lg w-3/4`}>
              <Text style={tw`text-center text-lg font-semibold mb-4 text-white`}>
                {selectedContact.name}
              </Text>
              <Pressable
                style={tw`p-2 border-b border-gray-600 active:bg-gray-700`}
                onPress={() => {
                  // 标为未读功能
                  setMenuVisible(false);
                }}
              >
                <Text style={tw`text-base text-center text-white`}>标为未读</Text>
              </Pressable>
              <Pressable
                style={tw`p-2 border-b border-gray-600 active:bg-gray-700`}
                onPress={() => {
                  // 置顶该聊天功能
                  setMenuVisible(false);
                }}
              >
                <Text style={tw`text-base text-center text-white`}>置顶该聊天</Text>
              </Pressable>
              <Pressable
                style={tw`p-2 border-b border-gray-600 active:bg-gray-700`}
                onPress={() => {
                  // 不显示该聊天功能
                  setMenuVisible(false);
                }}
              >
                <Text style={tw`text-base text-center text-white`}>不显示该聊天</Text>
              </Pressable>
              <Pressable
                style={tw`p-2 active:bg-gray-700`}
                onPress={() => {
                  // 删除该聊天功能
                  setMenuVisible(false);
                }}
              >
                <Text style={tw`text-base text-center text-red-500`}>删除该聊天</Text>
              </Pressable>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  return (
    <View style={[tw`flex-1`, { backgroundColor: colors.background }]}>
      <FlatList
        data={contactsData}
        renderItem={({ item }) => (
          <ContactItem contact={item} onLongPress={() => handleLongPress(item)} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={tw`pb-4`}
      />
      {renderMenu()}
    </View>
  );
};

export default User;
