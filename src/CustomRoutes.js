import { BrowserRouter, Routes,Route,Navigate,NavLink } from "react-router-dom";
import React, { lazy, Suspense } from 'react';

import { useSelector } from 'react-redux';

import { PUBLIC_ROUTE } from './route.constants';
import { Loader } from './utility/Loader';

import ErrorBoundary from './ErrorBoundary'

import  MyHeader  from "./components/layout/MyHeader";
import LayoutMain from "./components/layout/LayoutMain";
import { RND } from "./components/dev/RND";
import Signup from "./components/common/Signup";


const Signin = lazy(() => import('./components/common/Signin'))
const FAQ = lazy(() => import('./components/common/FAQ'))
const AboutUs = lazy(() => import('./components/common/AboutUs'))
const Home =lazy(()=>import('./components/dashboard/Home'))
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
        path: PUBLIC_ROUTE.SIGN_UP,
        component: <Signup/>,
      },
      {
        path:PUBLIC_ROUTE.TESTING_URL,
        component: <RND/>,
      }
]


export const ProtectedRoute = ({ children }) => {

    const  user  =  useSelector((state)=> state.user.isAuth);

    if (!user) {
      // user is not authenticated
      return <Navigate to="/signin" replace/>;
    }
    return children;
  };
export default function CustomRoutes() {
    return (
      <ErrorBoundary>
        <Suspense fallback={<Loader />}>    
            <BrowserRouter>     
               <LayoutMain>
                    <Routes>
                            {
                            publicRoutes.map(({path,component},index) => (
                                <Route key={index} path={path} element={component}/>  
                            ))}                   
                            <Route path="/"element={<ProtectedRoute>
                                                      <Home />
                                                    </ProtectedRoute>
                                                  }
                              />
                                
                        
                  </Routes>
                </LayoutMain>
            </BrowserRouter>
        </Suspense>
      </ErrorBoundary>
    );
  }