import React, { useLayoutEffect, useState } from 'react';
import { View, Text, Image, Pressable, GestureResponderEvent } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import tw from 'twrnc';

import { useTheme } from '@/context/ThemeContext';

interface CellTitleProps {
  title?: string;
  iconName?: string;
  hideRightArrow?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
}

const defaultProps: CellTitleProps = {
  title: 'default title',
  onPress: () => {
    console.log('默认的点击事件');
  },
  // 所有图标见 https://ionic.io/ionicons
  iconName: 'cube-outline',
  hideRightArrow: false,
};

CellTitle.defaultProps = defaultProps;

export default function CellTitle(props: CellTitleProps) {
  const { colors } = useTheme();
  const { onPress, iconName, hideRightArrow } = props;

  return (
    <Pressable onPress={onPress}>
      <View style={[tw`flex-row items-center`, { backgroundColor: colors.cellColor }]}>
        <View style={[tw`flex-row items-center h-14`, { flex: 1 }]}>
          <Ionicons name={iconName} size={24} style={tw`ml-4 rounded`} color={colors.primary} />
          <Text style={[tw`ml-4 text-base`, { color: colors.text }]}>{props.title}</Text>
        </View>
        {!hideRightArrow && (
          <Ionicons
            name={'chevron-forward-outline'}
            size={16}
            style={tw`mr-3 rounded`}
            color={'#b0b0b0'}
          />
        )}
      </View>
    </Pressable>
  );
}
