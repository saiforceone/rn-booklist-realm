import {Realm} from '@realm/react';
import {NewBookData} from '../@types/newBookData';

/**
 * BookSchema
 * Title
 * summary
 * ISBN
 * Author
 * purchased
 */

export class BookSchema extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  title!: string;
  summary!: string;
  isbn!: string;
  author!: string;
  createdAt!: Date;
  purchased!: boolean;

  static generate(
    title: string,
    summary: string,
    isbn: string,
    author: string,
    purchased?: boolean,
  ) {
    return {
      _id: new Realm.BSON.ObjectId(),
      title,
      summary,
      isbn,
      author,
      createdAt: new Date(),
      purchased,
    };
  }

  static generateWithObject(bookData: NewBookData) {
    return this.generate(
      bookData.title,
      bookData.summary,
      bookData.isbn,
      bookData.author,
      false,
    );
  }

  static schema = {
    name: 'Book',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      title: 'string',
      summary: 'string',
      isbn: 'string',
      author: 'string',
      createdAt: 'date',
      purchased: {type: 'bool', default: false},
    },
  };
}

export interface BookData {
  _id?: Realm.BSON.ObjectId;
  createdAt?: Date;
  title: string;
  summary: string;
  isbn: string;
  author: string;
  purchased?: boolean;
}
