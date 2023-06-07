
import React from 'react';
import { Link } from 'react-router-dom'
import siteConfig from '../../siteConfig';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Slices/user/UserSlice';

const MyHeader = () => {
      const {
        status,
        userInfo,
        token,
        error,
        isAuth
    }= useSelector((state) => state.user)
   // console.table(userInfo)
   const dispatch = useDispatch()

  return(
    <nav className="nav-wrapper">
      <div className="container">
        <Link to="/" className="brand-logo">{siteConfig.siteName}</Link>
        <div className="right">
          <button><Link to="/">Home</Link></button>
          <button><Link to="/faq">FAQ</Link></button>
          <button><Link to="/about-us">About Us</Link></button>
          {
            isAuth ?
            <>
             <p>{userInfo?.user_name}</p>
             <button onClick={dispatch(logout())}>Logout</button>
            </> 
            : 
            <>
              <button><Link to="/signin">Signin</Link></button>
               <button><Link to="/signup">Signup</Link></button>
            </>
          
          }
        </div>
      </div>
    </nav>  
  )
}

export default MyHeader;