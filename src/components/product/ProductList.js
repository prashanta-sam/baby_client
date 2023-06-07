

import React, { useEffect } from 'react'
import { decrement, fetchProduct, increment,removeProduct,removeProd } from '../Slices/product/ProductSlice'
import {useDispatch,useSelector} from 'react-redux'

export const ProductList=()=>{

    const dispatch = useDispatch()
    //const posts = useSelector(selectAllPosts)
  

   const count = useSelector((state) => state.product.count)
   const products = useSelector((state) => state.product.product);
   const status = useSelector((state) => state.product.status);
   const error = useSelector((state) => state.product.error);


   const deleteProduct = id => (e)=>{
      alert(id);
   }


    useEffect(() => {
      if (status === 'idle') 
      {
        dispatch(fetchProduct())
      }
    }, [])

    if (status === 'loading') {
      return <div>Loading...</div>;
    }
  
    if (status === 'failed') {
      return <div>Error: {error}</div>;
    }
  
    return <>
        <p>Product List</p>
        <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
      <div>
        <h2>Products</h2>
        <div>
        {products.map((item,i) => (
          <div key={item.id}>
             <p> {item.id}  {item.name}</p> 
             <button onClick={()=> dispatch(removeProd(item.id))}>Delete</button>
          </div>
          
        ))}
        </div>
      </div>
    </div>
    </>
}
