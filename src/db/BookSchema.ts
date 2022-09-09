import {Realm} from '@realm/react';

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
