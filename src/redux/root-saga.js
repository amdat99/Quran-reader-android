import {all, call} from 'redux-saga/effects';

import {userSagas} from './user/user.sagas';
import {pageSagas} from './page/page.sagas';

export default function* rootSaga() {
  yield all([call(userSagas), call(pageSagas)]);
}
