import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { postForm, postJson } from "../../api/Api";


const initialState={
    status:0, 
    userInfo: {},
    token: localStorage.getItem("token") || "",
    error: null,
    isAuth:false
}




const UserSlice=createSlice({
    name:'user',
    initialState,
    reducers: {
        usersLoading(state, action) {
            // Use a "state machine" approach for loading state instead of booleans
            if(state.status === 1) {
                state.status = 0
            }
        },
        usersReceived(state, action) {
            const {status,token,msg,data} = action.payload;   
            if(status === 1) 
            {
                state.status = 1
                state.userInfo = data
                state.error=msg
                state.isAuth=true
                localStorage.setItem('token', token);    
            }
        },
        logout(state) {
        
            state.error=null
            state.status=0
            state.token = "";
            state.isAuth=false
            state.userInfo={}
            //localStorage.removeItem("token");
            localStorage.setItem("token", '');

       },
      
    }
})



export const userSignup = (formData) => async (dispatch) => {
    dispatch(usersLoading()); 
    const response = await postForm('user/signup',formData); 
    dispatch(usersReceived(response));

}
export const {usersLoading, usersReceived,logout} = UserSlice.actions;
export default UserSlice.reducer