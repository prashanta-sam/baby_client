import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postJson } from "../../api/Api";


const initialState={
    status:'idle', 
    usersInfo: [],
    token: localStorage.getItem("token") || "",
    error: null,
    isAuth:false
}

const validateUser=createAsyncThunk(
    'auth/validate',
    async () => {
        const data = await postJson('user/signin');
        return data;
      }
)



const Auth=createSlice({
    name:'auth',
    initialState,
    reducers: {
        logout(state) {
             state.token = "";
        },
    },
    extraReducers(builder) {
        builder
        // product api
        .addCase(validateUser.pending, (state) => {
            state.status = 'loading';
          })
        .addCase(validateUser.fulfilled, (state, action) => {
            
             const {data,status,token,msg}= action.payload;           
             if(status===1)
             {
                state.status = 'idle';
                state.usersInfo = data;
                state.isAuth=true
                state.token=token           
                localStorage.setItem('token', token);               
             }
             else
             {
                state.status = 'failed';
                state.error = msg
             }
             
        })
        .addCase(validateUser.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          })
          
      }

})

export const { 
    logout,
    validate
} = Auth.actions

export default Auth.reducer