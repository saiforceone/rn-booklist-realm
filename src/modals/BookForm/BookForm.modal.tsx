import React, {FC, useCallback, useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {Button, Modal, Portal, Text, TextInput} from 'react-native-paper';
import {BookData, BookSchema} from '../../db/BookSchema';
import bookContext from '../../db';

const {useRealm} = bookContext;

import BookFormModalStyles from './BookForm.styles';

const DEFAULT_BOOK_DATA: BookData = {
  author: '',
  isbn: '',
  summary: '',
  title: '',
};

interface BookFormModalProps {
  book?: BookSchema & Realm.Object;
  dismissAction: () => void;
  saveBookAction: () => void;
  visible: boolean;
}

export const BookFormModal: FC<BookFormModalProps> = ({
  book,
  dismissAction,
  saveBookAction,
  visible,
}) => {
  // state
  const [bookData, setBookData] = useState<BookData>(() => DEFAULT_BOOK_DATA);

  // hooks
  const realm = useRealm();

  useEffect(() => {
    if (visible && book) {
      setBookData(book);
    }

    if (visible && !book) {
      setBookData(DEFAULT_BOOK_DATA);
    }
  }, [visible, book]);

  const updateBookData = useCallback((key: string, value: string) => {
    setBookData(prev => ({...prev, [key]: value}));
  }, []);

  const saveBook = useCallback(() => {
    realm.write(() => {
      if (book) {
        book.title = bookData.title;
        Object.keys(bookData)
          .filter(k => k !== '_id')
          .forEach(dataKey => {
            // @ts-ignore
            book[dataKey] = bookData[dataKey];
          });
        saveBookAction();
      } else {
        const newBook = BookSchema.generate(
          bookData.title,
          bookData.summary,
          bookData.isbn,
          bookData.author,
        );
        realm.create('Book', newBook);
        saveBookAction();
      }
    });
  }, [bookData, book, realm, saveBookAction]);

  return (
    <Portal>
      <Modal
        contentContainerStyle={BookFormModalStyles.containerModal}
        onDismiss={dismissAction}
        visible={visible}>
        <View>
          <Text style={BookFormModalStyles.title}>
            {book ? 'Edit' : 'Add New'} Book
          </Text>
        </View>
        <ScrollView>
          <TextInput
            label="ISBN"
            mode="outlined"
            onChangeText={text => updateBookData('isbn', text)}
            placeholder="ISBN"
            style={BookFormModalStyles.textInput}
            value={bookData.isbn}
          />
          <TextInput
            label="Book Title"
            mode="outlined"
            onChangeText={text => updateBookData('title', text)}
            placeholder="Book Title"
            style={BookFormModalStyles.textInput}
            value={bookData.title}
          />
          <TextInput
            label="Summary"
            mode="outlined"
            multiline
            onChangeText={text => updateBookData('summary', text)}
            placeholder="Summary"
            style={BookFormModalStyles.textInput}
            value={bookData.summary}
          />
          <TextInput
            label="Author"
            mode="outlined"
            onChangeText={text => updateBookData('author', text)}
            placeholder="Author"
            style={BookFormModalStyles.textInput}
            value={bookData.author}
          />
        </ScrollView>
        <Button icon="content-save" mode="contained" onPress={() => saveBook()}>
          Save Book
        </Button>
      </Modal>
    </Portal>
  );
};
