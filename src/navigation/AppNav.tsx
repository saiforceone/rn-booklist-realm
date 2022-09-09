import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BookListStackNavigator from './BookListStackNavigator';

export default () => {
  return (
    <NavigationContainer>
      <BookListStackNavigator />
    </NavigationContainer>
  );
};
