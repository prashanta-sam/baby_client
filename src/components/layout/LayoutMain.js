import React from 'react'
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import  MyHeader  from './MyHeader';
import  MyFooter  from './MyFooter';
import CustomRoutes from '../../CustomRoutes';
const { Header, Content, Footer,Sider } = Layout;
const LayoutMain = ({children}) => {


  return (
 
      <div>
        <header>
         <MyHeader/>
        </header>
        <main>
          {children}
        </main>
        <footer>
          {/* Footer content */}
          <MyFooter/>
        </footer>
      </div>
    );
  
}


export default LayoutMain