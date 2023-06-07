
import {configureStore,combineReducers} from '@reduxjs/toolkit'
import  ProductSlice from '../Slices/product/ProductSlice'
import UserSlice from '../Slices/user/UserSlice'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';


const persistConfig = {
  key: 'root',
  storage,
}


const reducer = combineReducers({
    product:ProductSlice,
    user:UserSlice
  })
  const persistedReducer = persistReducer(persistConfig, reducer)

export const Store=configureStore({
    reducer:persistedReducer, 
    // devTools: process.env.NODE_ENV !== 'production',
    // middleware: [thunk]
})

// export const persistor = persistStore(Store)
