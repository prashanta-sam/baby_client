import React, { useEffect } from 'react'
import ClassList from '../product/ClassList'
import InfiniteScrollList from '../dev/InfiniteScrollList';
import ScrollList, { scrollWraper } from '../dev/ScrollList';

 const Home = () => {
  useEffect(()=>{
    let stateObj = { id: "100" };
    window.history.pushState(stateObj,
      "Home", "/");
  },[])
  return (
    <>
        <div>Home</div>
         {/* <ClassList/>  */}
         <InfiniteScrollList/>
        
    </>
   
  )
}
export default Home