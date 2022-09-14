import React, {useCallback, useEffect, useState} from 'react';
import {Alert, FlatList, View} from 'react-native';
import {FAB} from 'react-native-paper';
import {BookItem} from '../../components/BookItem/BookItem';
import {EmptyListCard} from '../../components/EmptyListCard/EmptyListCard';
import realmContext from '../../db';
import {BookSchema} from '../../db/BookSchema';
import {BookFormModal} from '../../modals/BookForm/BookForm.modal';

import BookListScreenStyles from './BookListScreen.styles';

const {useRealm, useQuery} = realmContext;

export const BookListScreen = () => {
  // state
  const [selectedBook, setSelectedBook] = useState<(BookSchema & Realm.Object) | undefined
  >();
  const [bookFormVisible, setBookFormVislble] = useState(false);
  // hooks
  const realm = useRealm();
  const bookList = useQuery(BookSchema);

  useEffect(() => {
    realm.write(() => {
      // realm.create(
      //   'Book',
      //   BookSchema.generate(
      //     'Animal Farm',
      //     'Animal Farm is a beast fable, in form of satirical allegorical novella, by George Orwell, first published in England on 17 August 1945',
      //     '9786589711384',
      //     'George Orwell',
      //     false,
      //   ),
      // );
      // realm.deleteAll();
    });
  }, [realm]);

  const deleteBook = useCallback(
    (book: BookSchema & Realm.Object) => {
      Alert.alert(
        'Delete Book?',
        `You are about to delete the book: [${book.title} by ${book.author}]. Would you like to continue? `,
        [
          {text: 'No'},
          {
            onPress: () => {
              realm.write(() => {
                realm.delete(book);
              });
            },
            style: 'destructive',
            text: 'Yes',
          },
        ],
      );
    },
    [realm],
  );

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={bookList}
        keyExtractor={item => item._id.toHexString()}
        ListEmptyComponent={<EmptyListCard />}
        renderItem={({item}) => (
          <BookItem
            key={`book-${item._id.toHexString()}`}
            editAction={() => {
              setSelectedBook(item);
              setBookFormVislble(true);
            }}
            deleteAction={() => {
              deleteBook(item);
            }}
            book={item}
          />
        )}
      />
      <BookFormModal
        book={selectedBook}
        visible={bookFormVisible}
        dismissAction={() => {
          setBookFormVislble(false);
          if (selectedBook) {
            setSelectedBook(undefined);
          }
        }}
        saveBookAction={() => {
          setSelectedBook(undefined);
          setBookFormVislble(false);
        }}
      />
      <FAB
        icon="plus"
        style={BookListScreenStyles.fab}
        onPress={() => setBookFormVislble(true)}
      />
    </View>
  );
};
