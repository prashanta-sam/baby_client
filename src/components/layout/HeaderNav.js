import React from 'react'
import { useState } from "react";
import { Link } from 'react-router-dom'
import siteConfig from '../../siteConfig';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Slices/user/UserSlice';
import { SettingOutlined } from '@ant-design/icons';
import "../../App.css";

export const HeaderNav = () => {
    const [isNavExpanded, setIsNavExpanded] = useState(false)
    const {
      status,
      userInfo,
      token,
      error,
      isAuth
  }= useSelector((state) => state.user)
 // console.table(userInfo)
 const dispatch = useDispatch()

  return (
    <nav className="navigation">
      <a href="/" className="brand-name">
        myBaby      
      </a>
      { isAuth ? <p style={{marginLeft:'10px'}}> &nbsp;{"\bUser :" +userInfo?.user_name}</p> : null}
      <button className="hamburger"  
       onClick={() => {
          setIsNavExpanded(!isNavExpanded);
        }}>
        {/* hamburger svg code... */}
      </button>
      {/* nav menu code... */}


      <div
        className={
          isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
        }
      >
        <ul>
          <li>        
            <Link to="/">Home</Link>        
          </li>
          <li>
          <Link to="/faq">FAQ</Link>        
          </li>
          <li>
          <Link to="/about-us">About Us</Link>
          </li>
          {
            isAuth ?
            <>
                <li>
                <SettingOutlined  onClick={()=> dispatch(logout())}>Logout</SettingOutlined>
                </li>
         
            </> 
            : 
            <>
              <li>
              <Link to="/signin">Signin</Link>
              </li>
          <li>
          <Link to="/signup">Signup</Link>
          </li>
           
          
            </>
          
          }
        </ul>
      </div>
    </nav>
  )
}
