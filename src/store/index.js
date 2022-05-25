import {configureStore} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';
import {rootReducer} from '../reducers';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage:AsyncStorage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
});

export default store;
