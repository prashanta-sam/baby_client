import React, { useState } from 'react'

export const RND = () => {
    const [search,setSearch]=useState('')
    const [count,setCount]=useState(0)



    //======================= for debounce ==================
    const [debounceTimer,setDebounceTimer]=useState(null)
    const debounce = (callback, time) => {
      window.clearTimeout(debounceTimer);
      setDebounceTimer(window.setTimeout(callback, time))
    };

    const suggetion=(e)=>{
        debounce(callApi,500)           
        setSearch(e.target.value)
    }
    const callApi=async ()=>{
        console.log(search)  
        
    }
    //======================= for throttling ==================
       
    const [throttleTimer,setThrottleTimer]=useState(false)
    const callApiThrottle=async ()=>{
       
        return {status:1}
        
    }
    const Throttle=(callback,time)=>{
        console.log(throttleTimer)
        if (throttleTimer) return false;
       
        setThrottleTimer(true)
        setTimeout(async () => {
           const data= await callback();            
            //throttlePause is set to false once the function has been called, allowing the throttle function to loop 
            if(data.status==1)
            {
                setThrottleTimer(false) 
                setCount(count + 1)  
                
            }
                              
          }, time);
    }
    const clickMe=()=>{

        Throttle(callApiThrottle,500)     
       
    }

  return (
    <div>
        <p>Debounce Example</p>
        <input type='text' value={search} onChange={suggetion}/>
         <p>Suggetion: {search}</p>   

         <hr></hr>
         <p>Throttle Example</p>
         <button onClick={clickMe}>Click Me</button>
         <p> Search count : {count}</p>   
    </div>
  )
}
