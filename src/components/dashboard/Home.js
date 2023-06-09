import React, { useEffect } from 'react'

 const Home = () => {
  useEffect(()=>{
    let stateObj = { id: "100" };
    window.history.pushState(stateObj,
      "Home", "/");
  },[])
  return (
    <div>Home</div>
  )
}
export default Home