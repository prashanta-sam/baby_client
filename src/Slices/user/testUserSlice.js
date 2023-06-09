import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postForm, postJson } from "../../api/Api";


const initialState={
    status:0, 
    userInfo: [],
    error:''
 
}

export const getuser=createAsyncThunk( 'user/getusers',
    async () => {
        const data = await fetch('https://jsonplaceholder.typicode.com/posts');
        const result=await data.json();
        return result
      }
)



const testUserSlice=createSlice({
    name:'testuser',
    initialState,
    reducers: {
        logout(state) {
             state.token = "";
        },
    },
    extraReducers: {
        
        // product api
        [getuser.pending]: (state) => {
            state.status=0 
          },
          [getuser.fulfilled]:  (state, action) => {
            
           
                 state.status=1      
                 state.userInfo = action.payload;
          
        },
        [getuser.rejected]: (state, action) => {
            state.status=0     
       
          }
          
      }

})

export const {usersLoading, usersReceived,logout,incrementByValue} = testUserSlice.actions;

export default testUserSlice.reducer

