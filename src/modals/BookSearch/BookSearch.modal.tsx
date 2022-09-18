import React, {FC, useCallback, useState} from 'react';
import {Alert, ScrollView, View} from 'react-native';
import {IconButton, Modal, Portal, Text, TextInput} from 'react-native-paper';
import {Header} from '../../components/Header/Header';
import {OL_LEGACY_BOOK_SEARCH_URL} from '../../constants';
import {BookResult} from '../../@types/bookResult';

import BookSearchModalStyles from './BookSearchModal.styles';
import {BookResultCard} from '../../components/BookResultCard/BookResultCard';
import {NewBookData} from '../../@types/newBookData';

import bookContext from '../../db';
import {BookSchema} from '../../db/BookSchema';
const {useRealm} = bookContext;

interface BookSearchModalProps {
  dismissAction: () => void;
  selectBookAction: () => void;
  visible: boolean;
}

export const BookSearchModal: FC<BookSearchModalProps> = ({
  dismissAction,
  selectBookAction,
  visible,
}) => {
  // state
  const [filterText, setFilterText] = useState('');
  const [bookResults, setBookResults] = useState<BookResult[]>([]);
  // hooks & functions
  const realm = useRealm();

  const execSearch = useCallback(() => {
    if (!filterText.trim().length) {
      return Alert.alert(
        'Unable To Search',
        "Please enter the name of the book you'd like to search for.",
      );
    }

    fetch(`${OL_LEGACY_BOOK_SEARCH_URL}?q=${filterText}`)
      .then(response => response.json())
      .then(data => {
        const {docs} = data as {[key: string]: any};
        if (docs) {
          const books = docs as BookResult[];
          setBookResults(books);
        }
      });
  }, [filterText]);

  const execSaveBook = useCallback(
    (bookData: NewBookData) => {
      realm.write(() => {
        realm.create('Book', BookSchema.generateWithObject(bookData));
      });
      selectBookAction();
    },
    [realm, selectBookAction],
  );

  return (
    <Portal>
      <Modal
        contentContainerStyle={BookSearchModalStyles.container}
        visible={visible}>
        <Header
          actionElement={<IconButton icon="close" onPress={dismissAction} />}
          title="Book Search"
        />
        <View style={BookSearchModalStyles.content}>
          <Text>Book Search</Text>
          <View style={BookSearchModalStyles.searchContainer}>
            <TextInput
              mode="outlined"
              onChangeText={text => setFilterText(text)}
              placeholder="Type book name and tap button to search"
              style={BookSearchModalStyles.searchInput}
            />
            <IconButton icon="book-search" onPress={execSearch} />
          </View>
          <ScrollView
            contentContainerStyle={BookSearchModalStyles.resultContainer}>
            {bookResults.length ? (
              bookResults.map((book, index) => (
                <BookResultCard
                  key={`book-${index}`}
                  book={book}
                  selectBookAction={bookData => {
                    console.log('book data: ', bookData);
                    execSaveBook(bookData);
                  }}
                />
              ))
            ) : (
              <View>
                <Text>No Results Yet</Text>
              </View>
            )}
          </ScrollView>
        </View>
      </Modal>
    </Portal>
  );
};
