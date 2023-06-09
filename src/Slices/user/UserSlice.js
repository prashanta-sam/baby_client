import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
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

export const userSignin=createAsyncThunk( 'user/userSignin',
    async (formData) => {
        const data = await postForm('user/signin',formData);
        return data;
      }
)

const UserSlice=createSlice({
    name:'user',
    initialState,
    reducers: {
       
        logout(state) {
        
            state.error=null
            state.status=0
            state.token = "";
            state.isAuth=false
            state.userInfo={}
            //localStorage.removeItem("token");
            localStorage.setItem("token", '');
   
       },
       setError:(state,{payload})=>{
            state.error=""    
       }
      
    },

        extraReducers: {
        
            // product api
           
              [userSignup.fulfilled]:  (state, action) => {               
               
                const {status,token,msg,data} = action.payload;   
                state.status = status;
            
                state.error = msg 
                if(status===1)
                {               
                   state.userInfo = data;
                   state.isAuth=true
                   state.token=token           
                   localStorage.setItem('token', token);               
                }     
              
            },
            [userSignin.fulfilled]:  (state, action) => {               
               
                const {status,token,msg,data} = action.payload;   
                state.status = status;
                state.error = msg 
                if(status===1)
                {               
                   state.userInfo = data;
                   state.isAuth=true
                   state.token=token           
                   localStorage.setItem('token', token);               
                }     
              
            },
              
          }

})






export const {logout,setError} = UserSlice.actions;
export default UserSlice.reducer