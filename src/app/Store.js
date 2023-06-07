
import {configureStore} from '@reduxjs/toolkit'
import  ProductSlice from '../Slices/product/ProductSlice'
import UserSlice from '../Slices/user/UserSlice'

const reducer = {
   product:ProductSlice,
   user:UserSlice
  }

export const Store=configureStore({
    reducer:reducer
})