import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import tw from 'twrnc';

const Page = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isCounting, setIsCounting] = useState(false);
  const [timer, setTimer] = useState(60);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isCounting && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsCounting(false);
      setTimer(60);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isCounting, timer]);

  const sendVerificationCode = () => {
    // 发送验证码逻辑
    Alert.alert('验证码已发送到您的邮箱');
    setIsCounting(true);
  };

  const login = () => {
    // 登录逻辑
    if (verificationCode === '123456') {
      // 假设123456是正确的验证码
      Alert.alert('登录成功');
    } else {
      Alert.alert('验证码错误');
    }
  };

  return (
    <View style={tw`flex-1 justify-center items-center bg-gray-900 p-6`}>
      <Text style={tw`text-4xl font-bold text-white mb-8`}>邮箱登录</Text>
      <View style={tw`w-full flex-row items-center mb-4`}>
        <TextInput
          style={tw`flex-1 p-3 bg-gray-700 text-white rounded-l-lg`}
          placeholder="请输入邮箱"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TouchableOpacity
          style={[tw`p-3 rounded-r-lg`, isCounting ? tw`bg-gray-500` : tw`bg-indigo-500`]}
          onPress={sendVerificationCode}
          disabled={isCounting}
        >
          <Text style={tw`text-white`}>{isCounting ? `${timer}s后重发` : '发送验证码'}</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={tw`w-full p-3 mb-4 bg-gray-700 text-white rounded-lg`}
        placeholder="请输入验证码"
        placeholderTextColor="#aaa"
        keyboardType="number-pad"
        value={verificationCode}
        onChangeText={setVerificationCode}
      />
      <TouchableOpacity style={tw`w-full p-3 bg-green-500 rounded-lg shadow-lg`} onPress={login}>
        <Text style={tw`text-center text-white text-lg`}>登录</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Page;
