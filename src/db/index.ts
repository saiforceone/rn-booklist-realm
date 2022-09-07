import {createRealmContext} from '@realm/react';
import {BookSchema} from './BookSchema';

const config = {
  schema: [BookSchema],
};

export default createRealmContext(config);
