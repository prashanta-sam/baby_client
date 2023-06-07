import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postForm, postJson } from "../../api/Api";


const initialState={
    status:0, 
    userInfo: [],
    token: localStorage.getItem("token") || "",
    error: null,
    isAuth:false
}

export const userSignup=createAsyncThunk( 'user/userSignup',
    async (formData) => {
        const data = await postForm('user/signup',formData);
        return data;
      }
)



const UserSlice=createSlice({
    name:'user',
    initialState,
    reducers: {
        logout(state) {
             state.token = "";
        },
    },
    extraReducers(builder) {
        builder
        // product api
        .addCase(userSignup.pending, (state) => {
            state.status = 'loading';
          })
        .addCase(userSignup.fulfilled, (state, action) => {
            
             const {status,token,msg,data} = action.payload;   
             state.status = status;
             state.error = msg 
             if(status===1)
             {               
                state.usersInfo = data;
                state.isAuth=true
                state.token=token           
                localStorage.setItem('token', token);               
             }     
             
        })
        .addCase(userSignup.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          })
          
      }

})



export default UserSlice.reducer