import React, {useCallback, useState} from 'react';
import {Alert, FlatList, View} from 'react-native';
import {FAB, Portal} from 'react-native-paper';
import {BookItem} from '../../components/BookItem/BookItem';
import {EmptyListCard} from '../../components/EmptyListCard/EmptyListCard';
import realmContext from '../../db';
import {BookSchema} from '../../db/BookSchema';
import {BookFormModal} from '../../modals/BookForm/BookForm.modal';
import {BookSearchModal} from '../../modals/BookSearch/BookSearch.modal';

import BookListScreenStyles from './BookListScreen.styles';

const {useRealm, useQuery} = realmContext;

export const BookListScreen = () => {
  // state
  const [selectedBook, setSelectedBook] = useState<(BookSchema & Realm.Object) | undefined
  >();
  const [bookFormVisible, setBookFormVislble] = useState(false);
  const [bookSearchVisible, setBookSearchVisible] = useState(false);
  const [fabState, setFabState] = useState({open: false});

  // hooks
  const realm = useRealm();
  const bookList = useQuery(BookSchema);

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
      <BookSearchModal
        dismissAction={() => setBookSearchVisible(false)}
        selectBookAction={() => {
          setBookSearchVisible(false);
        }}
        visible={bookSearchVisible}
      />
      <Portal>
        <FAB.Group
          open={fabState.open}
          icon={fabState.open ? 'close' : 'plus'}
          style={BookListScreenStyles.fab}
          onStateChange={({open}) => setFabState({open})}
          actions={[
            {
              icon: 'book-search',
              label: 'Book Search',
              onPress: () => setBookSearchVisible(true),
            },
            {
              icon: 'book-plus',
              label: 'Add Book',
              onPress: () => setBookFormVislble(true),
            },
          ]}
          visible={!bookFormVisible || !bookSearchVisible}
        />
      </Portal>
    </View>
  );
};
