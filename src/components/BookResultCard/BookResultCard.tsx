import React, {FC, useCallback} from 'react';
import {Alert, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import {BookResult} from '../../@types/bookResult';
import {NewBookData} from '../../@types/newBookData';

import BookResultCardStyles from './BookresultCard.styles';

interface BookResultCardProps {
  selectBookAction: (data: NewBookData) => void;
  book: BookResult;
}

export const BookResultCard: FC<BookResultCardProps> = ({
  book,
  selectBookAction,
}) => {
  const onSelectBook = useCallback(() => {
    Alert.alert(
      'Add book to you list?',
      `You are about to add the book [${book.title}]. Would you like to continue?`,
      [
        {text: 'No'},
        {
          onPress: () => {
            selectBookAction({
              title: book.title,
              author: book.author_name
                ? book.author_name.join(', ')
                : 'Unknown Author',
              isbn: book.isbn ? book.isbn[0] : 'ISBN Unknown',
              summary: book.first_sentence
                ? book.first_sentence.join(', ')
                : 'Summary Unavailable',
            });
          },
          text: 'Yes',
        },
      ],
    );
  }, [book, selectBookAction]);

  return (
    <TouchableOpacity onPress={onSelectBook}>
      <View style={BookResultCardStyles.container}>
        <Text>Title: {book.title ? book.title : 'No Title'}</Text>
        <Text>
          Author:{' '}
          {book.author_name ? book.author_name.join(', ') : 'Author Missing'}
        </Text>
        <Text>
          Summary:{' '}
          {book.first_sentence
            ? book.first_sentence.join(', ')
            : 'No Summary Available'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
