import React from 'react'

import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { getJson } from '../../api/Api';
// import { client } from '../api/client'
const initialState={    
    count:0, 
    product: [],
    status: 'idle',
    error: null
}
  

  export const fetchProduct = createAsyncThunk(
    'items/fetchItems',
    async () => {
      const data = await getJson('users');
      return data;
    }
  );
  export const removeProd=createAsyncThunk(
    'items/removeProduct',
    async () => {
      const data = await getJson();
      return data;
    }
  )

export const ProductSlice=createSlice({
    name:'product',
    initialState,
    reducers:{
        increment:(state)=>{
            state.count+=1;
        },
        decrement:(state)=>{

            state.count-=1;
        },
        incrementByValue:(state,action)=>{
            state.count+=action.payload
        },
        removeProduct: (state,action)=>{

            const idx=action.payload;
            const temp = [...state.product];
            // removing the element using splice    
            state.product= temp.filter((item, i) => item.id !== idx);
        }
    },
    extraReducers(builder) {
        builder
        // product api
        .addCase(fetchProduct.pending, (state) => {
            state.status = 'loading';
          })
        .addCase(fetchProduct.fulfilled, (state, action) => {
             state.status = 'idle';
             state.product = action.payload;
        })
        .addCase(fetchProduct.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          })
          .addCase(removeProd.fulfilled,(state,action)=>{
            const idx=action.payload;
            const temp = [...state.product];
            // removing the element using splice    
            state.product= temp.filter((item, i) => item.id !== idx);
          })
      }


})


// const { reducer } = ProductSlice;

// Action creators are generated for each case reducer function
export const { 
    increment, 
    decrement,     
    getProductList,
    fetchPosts,
    removeProduct,
    incrementByValue

} = ProductSlice.actions

export default ProductSlice.reducer