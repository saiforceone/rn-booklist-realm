import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import {BookSchema} from '../../db/BookSchema';
import BookItemStyles from './BookItem.styles';

interface BookItemProps {
  book: BookSchema & Realm.Object;
  editAction: () => void;
  deleteAction: () => void;
}

export const BookItem: FC<BookItemProps> = ({
  book,
  editAction,
  deleteAction,
}) => {
  return (
    <View style={BookItemStyles.container}>
      <View style={BookItemStyles.bookContainer}>
        <Text style={BookItemStyles.bookTitle}>{book.title}</Text>
        <Text numberOfLines={2} style={BookItemStyles.bookSummary}>
          {book.summary}
        </Text>
      </View>
      <View style={BookItemStyles.buttonContainer}>
        <IconButton
          mode="contained"
          icon="pencil-box-outline"
          onPress={editAction}
          size={20}
        />
        <IconButton
          iconColor="#ff3300"
          mode="contained"
          icon="trash-can"
          onPress={deleteAction}
          size={20}
        />
      </View>
    </View>
  );
};
