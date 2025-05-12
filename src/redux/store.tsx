import { applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from './storage';
import { composeWithDevTools } from '@redux-devtools/extension';
import { legacy_createStore as createStore } from 'redux';
import thunk from 'redux-middleware/lib/thunk';

import appReducer from './reducers';
import { toggleToast } from './actions';

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['worker', 'trade'],
  blacklist: []
};

const enhancer = compose(applyMiddleware(thunk));

const persistedReducer = persistReducer<{ [key: string]: any }>(persistConfig, appReducer);

export const store = createStore(persistedReducer, process.env.NEXT_PUBLIC_NODE_ENV === "production" ? enhancer : composeWithDevTools(enhancer));

export type RootState = ReturnType<typeof store.getState>

export type typeOfDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

export const quickToast = (feed: { text: string }) => store.dispatch(toggleToast(feed));
