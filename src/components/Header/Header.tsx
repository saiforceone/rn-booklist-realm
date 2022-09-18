import React, {FC} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';

import HeaderStyles from './Header.styles';

interface HeaderProps {
  actionElement?: React.ReactNode;
  title: string;
}

export const Header: FC<HeaderProps> = ({actionElement, title}) => {
  return (
    <View style={HeaderStyles.container}>
      <Text style={HeaderStyles.title} numberOfLines={1}>
        {title}
      </Text>
      {actionElement}
    </View>
  );
};
