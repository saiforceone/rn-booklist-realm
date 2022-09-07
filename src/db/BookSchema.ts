import {Realm} from '@realm/react';

/**
 * BookSchema
 * Title
 * summary
 * ISBN
 * Author
 * Acquired
 */

export class BookSchema extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  title!: string;
  summary!: string;
  isbn!: string;
  author!: string;
  createdAt!: Date;

  static generate(
    title: string,
    summary: string,
    isbn: string,
    author: string,
  ) {
    return {
      _id: new Realm.BSON.ObjectId(),
      title,
      summary,
      isbn,
      author,
      createdAt: new Date(),
    };
  }

  static schema = {
    name: 'BookList',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      title: 'string',
      summary: 'string',
      isbn: 'string',
      author: 'string',
      createdAt: 'date',
    },
  };
}
