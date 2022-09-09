import React from 'react';
import {Text, View} from 'react-native';

import EmptyListCardStyles from './EmptyListCard.styles';

export const EmptyListCard = () => {
  return (
    <View style={EmptyListCardStyles.container}>
      <Text style={EmptyListCardStyles.mainText}>No Results Found</Text>
    </View>
  );
};
