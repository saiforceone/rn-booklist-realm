import {createRealmContext} from '@realm/react';
import {BookSchema} from './BookSchema';

const config: Realm.Configuration = {
  schema: [BookSchema],
  schemaVersion: 1,
};

export default createRealmContext(config);
