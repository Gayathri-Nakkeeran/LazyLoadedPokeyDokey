import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage/session';
import { persistReducer, persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/sagas';
import sliceReducer from "./slice/slice.js";
const persistConfig = {
  key: 'root',
  storage,
}

const sagaMiddleWare = createSagaMiddleware();
const persistedReducer = persistReducer(persistConfig, sliceReducer)
const appStore = configureStore({ reducer: persistedReducer, middleware: [sagaMiddleWare] });
sagaMiddleWare.run(rootSaga);

export default appStore;
export const persistor = persistStore(appStore);