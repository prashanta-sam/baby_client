import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { postForm, postJson } from "../../api/Api";

const initialState={
    status:0, 
    items: [], 
    userList:[],
    error: null, 
    currPage:1,
    prevPage:0,
    isFetching:false,
    wasLastList:false
}

export const fetchClassList=createAsyncThunk( 'user/fetchClassList',
    async (currPage) => {
       // const data = await postForm('product/get-classes');
        const result = await fetch(`https://jsonplaceholder.typicode.com/photos?_page=${currPage}&_limit=10`);
        const data=await result.json();   
        let arr = [...data].filter((d,idx) => idx < 20)
        console.log(arr)   
        return arr;
      }
)



const ClassListSlice=createSlice({
    name:'classList',
    initialState,
    reducers: {       
    
       setError:(state,{payload})=>{
            state.error=""    
       },
    },

        extraReducers: {        
            // product api
            [fetchClassList.pending]:  (state, action) => {   
              // const {status,msg,data} = action.payload;   
              state.status = 0;            
              state.error = "Loading"              
            
            },
         
              [fetchClassList.fulfilled]:  (state, action) => {   
                // const {status,msg,data} = action.payload;   
                state.status = 1;            
                state.error = "success" 
                state.items = action.payload;       
                state.userList=action.payload;       
            },
            [fetchClassList.rejected]:  (state, action) => {   
              // const {status,msg,data} = action.payload;   
              state.status = 0;            
              state.error = "failed"              
            
            },
              
          }

})






export const {setError} = ClassListSlice.actions;
export default ClassListSlice.reducer