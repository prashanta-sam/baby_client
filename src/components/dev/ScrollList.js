import { React, useRef } from "react";
import { Loader } from '../../utility/Loader';


const ScrollList=({ callback, component,isFetching }) =>{
  const listInnerRef = useRef();
  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {       
        callback();
      }
    }
  };
  return (
  
      <div
        onScroll={onScroll}
        ref={listInnerRef}
        style={{ height: "60vh", overflowY: "auto"}}
      >       
         {component}   
         {isFetching ? "Fetching more items...": null}     
      </div>
     
  
  );
}

export default ScrollList;
