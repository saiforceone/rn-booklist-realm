import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Import Screens
import {BookListScreen} from '../screens/BookList/BookList.screen';

const BookListStack = createNativeStackNavigator();

export default () => {
  return (
    <BookListStack.Navigator>
      <BookListStack.Screen name="bookList" component={BookListScreen} />
    </BookListStack.Navigator>
  );
};
