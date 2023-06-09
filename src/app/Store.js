
import {configureStore,combineReducers} from '@reduxjs/toolkit'
import  ProductSlice from '../Slices/product/ProductSlice'
import UserSlice from '../Slices/user/UserSlice'
import storage from 'redux-persist/lib/storage';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import testUserSlice  from '../Slices/user/testUserSlice';
import ClassListSlice from '../Slices/product/ClassListSlice';

const persistConfig = {
  key: 'root',
  storage,
}


const reducer = combineReducers({
    product:ProductSlice,
    user:UserSlice,
    testuser:testUserSlice,
    classList:ClassListSlice
  })
  const persistedReducer = persistReducer(persistConfig, reducer)

export const Store=configureStore({
    reducer:persistedReducer, 
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

// export const persistor = persistStore(Store)
