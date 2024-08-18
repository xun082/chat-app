import React, { useLayoutEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import tw from 'twrnc';

import { useTheme } from '@/context/ThemeContext';

interface IconTitleCellProps {
  title: string;
}

const defaultProps: IconTitleCellProps = {
  title: 'default title',
};

IconTitleCell.defaultProps = defaultProps;

export default function IconTitleCell(props: IconTitleCellProps) {
  const { colors } = useTheme();

  return (
    <View style={[tw`flex-row items-center rounded h-5`, { backgroundColor: colors.background }]}>
      <Text style={[tw`ml-4 text-xs`, { color: colors.text }]}>{props.title}</Text>
    </View>
  );
}
