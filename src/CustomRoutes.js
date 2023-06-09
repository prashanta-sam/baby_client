import { BrowserRouter, Routes,Route,Navigate,NavLink } from "react-router-dom";
import React, { lazy, Suspense } from 'react';

import { useSelector } from 'react-redux';

import { PRIVATE_ROUTE, PUBLIC_ROUTE } from './route.constants';
import { Loader } from './utility/Loader';

import ErrorBoundary from './ErrorBoundary'

import  MyHeader  from "./components/layout/MyHeader";
import LayoutMain from "./components/layout/LayoutMain";
import { RND } from "./components/dev/RND";
import Signup from "./components/common/Signup";
import { Cart } from "./components/cart/Cart";
import { ProductList } from "./components/product/ProductList";


const Signin = lazy(() => import('./components/common/Signin'))
const FAQ = lazy(() => import('./components/common/FAQ'))
const AboutUs = lazy(() => import('./components/common/AboutUs'))
const Home =lazy(()=>import('./components/dashboard/Home'))


export const ProtectedRoute = ({ children }) => {
  const  user  =  useSelector((state)=> state.user.isAuth);
  if (!user) {
    // user is not authenticated
    return <Navigate to="/signin" replace/>;
  }
  return children;
};
export const HomeRoute = ({ children }) => {
  const  isAuth  =  useSelector((state)=> state.user.isAuth);
  if (isAuth) {    // user is not authenticated
    return <Navigate to="/" replace/>;
  }
  return children;
};

export const publicRoutes = [
      {
        path: PUBLIC_ROUTE.ABOUT_US,
        component: <AboutUs/>,
      },
      {
        path: PUBLIC_ROUTE.FAQ,
        component:<FAQ/>,
      },
      {
        path: PUBLIC_ROUTE.SIGN_IN,
        component: <Signin/>,
      },
    
      {
        path:PUBLIC_ROUTE.TESTING_URL,
        component: <RND/>,
      },
      {
        path:PUBLIC_ROUTE.HOME,
        component: <Home/>,
      },
      {
        path: PUBLIC_ROUTE.SIGN_UP,
        component: <Signup/>,
      },
      {
        path: PUBLIC_ROUTE.PRODUCT_LIST,
        component: <ProductList/>,
      },
]
export const privateRoutes = [
  {
    path: PRIVATE_ROUTE.CART,
    component:  <Cart/>,
  },
 
]


export default function CustomRoutes() {
  const  isAuth  =  useSelector((state)=> state.user.isAuth);
    return (
      <ErrorBoundary>
        <Suspense fallback={<Loader />}>    
            <BrowserRouter>     
               <LayoutMain>
                    <Routes>
                            {/* PUBLIC */}
                            {

                            publicRoutes.map(({path,component},index) => (
                              

                                 ((path==='/signin' || path==='/signup') && isAuth) ?
                                    <Route key={index} path={path} element={<Home/>}/>
                                   :                                   
                                   <Route key={index} path={path} element={component}
                                
                                 
                                  />  
                            ))                          
                        
                            
                            }      
                          {/* PRIVATE */}
                           {

                              privateRoutes.map(({path,component},index) => (
                                <Route key={index} path={path} element={
                                  <ProtectedRoute>
                                      <component />
                                  </ProtectedRoute>
                                }/>  
                            ))                          


                            }  
                           
                     
                
                        
                  </Routes>
                </LayoutMain>
            </BrowserRouter>
        </Suspense>
      </ErrorBoundary>
    );
  }