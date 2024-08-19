import { Tabs } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';

const unreadMessagesCount = 5; // 示例：假设未读消息数量为 5

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '聊天',
          headerShown: true,
          tabBarIcon: ({ color, focused }) => (
            <View style={tw`relative`}>
              <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
              {unreadMessagesCount > 0 && (
                <View
                  style={tw`absolute top-[-3px] right-[-10px] min-w-[18px] h-[18px] bg-red-600 rounded-full justify-center items-center border border-white`}
                >
                  <Text style={tw`text-white text-xs font-bold`}>
                    {unreadMessagesCount > 99 ? '99+' : unreadMessagesCount}
                  </Text>
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="contact"
        options={{
          title: '联系人',
          headerShown: true,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'person-add' : 'person-add-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: '发现',
          headerShown: true,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'compass' : 'compass-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: '我',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
