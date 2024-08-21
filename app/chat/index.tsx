import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import tw from 'twrnc';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Menu, MenuOptions, MenuOption, MenuTrigger, MenuProvider } from 'react-native-popup-menu';
import * as ImagePicker from 'expo-image-picker';

import { useTheme } from '@/context/ThemeContext';

type Message = {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  text?: string;
  image?: string;
  time: string;
};

const initialMessages: Message[] = [
  {
    id: '1',
    user: {
      name: '文质彬彬的狼',
      avatar: 'https://cdn.pixabay.com/photo/2024/07/15/16/09/bird-8897237_1280.jpg',
    },
    text: 'Moment',
    time: '10:25',
  },
  {
    id: '2',
    user: {
      name: 'Moment',
      avatar: 'https://cdn.pixabay.com/photo/2024/07/15/16/09/bird-8897237_1280.jpg',
    },
    text: 'Moment',
    time: '10:26',
  },
  {
    id: '3',
    user: {
      name: 'Moment',
      avatar: 'https://cdn.pixabay.com/photo/2024/07/15/16/09/bird-8897237_1280.jpg',
    },
    image: 'https://cdn.pixabay.com/photo/2024/07/15/16/09/bird-8897237_1280.jpg',
    time: '10:27',
  },
  // 更多消息
];

const MessageBubble: React.FC<{ message: Message }> = ({ message }) => {
  const { colors } = useTheme();
  const isOwnMessage = message.user.name === '你';

  return (
    <View
      style={[
        tw`flex-row p-2`,
        isOwnMessage ? tw`justify-end` : tw`justify-start`,
        { marginVertical: 4 },
      ]}
    >
      {!isOwnMessage && (
        <Image
          source={{ uri: message.user.avatar }}
          style={tw`w-8 h-8 rounded-full mr-2 self-start`}
        />
      )}
      <Menu>
        <MenuTrigger triggerOnLongPress>
          <View
            style={[tw`max-w-[90%] min-w-[50%]`, isOwnMessage ? tw`items-end` : tw`items-start`]}
          >
            {!isOwnMessage && (
              <Text style={[tw`text-xs font-semibold mb-1`, { color: colors.text }]}>
                {message.user.name}
              </Text>
            )}
            <View
              style={[
                tw`p-3`,
                {
                  backgroundColor: isOwnMessage ? colors.primary : '#f0f0f0',
                  borderRadius: 16,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.1,
                  shadowRadius: 2,
                },
              ]}
            >
              {message.text && (
                <Text
                  style={[
                    tw`text-sm leading-5`,
                    { color: isOwnMessage ? colors.primaryText : colors.text },
                  ]}
                >
                  {message.text}
                </Text>
              )}
              {message.image && (
                <Image
                  source={{ uri: message.image }}
                  style={[tw`mt-2 rounded-lg`, { width: 180, height: 180 }]}
                />
              )}
            </View>
            <Text style={tw`text-xs mt-1 text-gray-500`}>{message.time}</Text>
          </View>
        </MenuTrigger>
        <MenuOptions>
          <MenuOption onSelect={() => alert('复制')} text="复制" />
          <MenuOption onSelect={() => alert('删除')} text="删除" />
          <MenuOption onSelect={() => alert('收藏')} text="收藏" />
        </MenuOptions>
      </Menu>
      {isOwnMessage && (
        <Image
          source={{ uri: message.user.avatar }}
          style={tw`w-8 h-8 rounded-full ml-2 self-start`}
        />
      )}
    </View>
  );
};

const Chat: React.FC = () => {
  const { colors } = useTheme();
  const [inputText, setInputText] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const flatListRef = useRef<FlatList>(null);

  const scrollToBottom = () => {
    flatListRef.current?.scrollToEnd({ animated: true });
  };

  const handleSendText = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: (messages.length + 1).toString(),
        user: {
          name: '你',
          avatar: 'https://cdn.pixabay.com/photo/2024/07/15/16/09/bird-8897237_1280.jpg',
        },
        text: inputText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, newMessage];
        setTimeout(scrollToBottom, 100);

        return updatedMessages;
      });
      setInputText('');
    }
  };

  const handleSendImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      const newMessage: Message = {
        id: (messages.length + 1).toString(),
        user: {
          name: '你',
          avatar: 'https://cdn.pixabay.com/photo/2024/07/15/16/09/bird-8897237_1280.jpg',
        },
        image: result.assets[0].uri,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, newMessage];
        setTimeout(scrollToBottom, 100);

        return updatedMessages;
      });
    }
  };

  useEffect(() => {
    setTimeout(scrollToBottom, 100);
  }, []);

  return (
    <MenuProvider>
      <KeyboardAvoidingView
        style={tw`flex-1`}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={({ item }) => <MessageBubble message={item} />}
          keyExtractor={(item) => item.id}
          style={tw`flex-1 bg-white`}
          contentContainerStyle={tw`p-2`}
        />
        <View
          style={[
            tw`flex-row items-center p-3 border-t`,
            { backgroundColor: '#f9f9f9', borderColor: colors.border },
          ]}
        >
          <Ionicons
            name="image-outline"
            size={24}
            color={colors.placeholder}
            style={tw`mr-2`}
            onPress={handleSendImage}
          />
          <Ionicons name="happy-outline" size={24} color={colors.placeholder} style={tw`mr-2`} />
          <TextInput
            style={[
              tw`flex-1 p-2 rounded-full border border-gray-300`,
              {
                backgroundColor: '#ffffff',
                color: colors.inputText,
              },
            ]}
            placeholder="输入消息..."
            placeholderTextColor={colors.placeholder}
            value={inputText}
            onChangeText={setInputText}
          />
          <Pressable onPress={handleSendText} style={tw`ml-2 p-2`}>
            <Ionicons name="send" size={24} color={colors.primary} />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </MenuProvider>
  );
};

export default Chat;
