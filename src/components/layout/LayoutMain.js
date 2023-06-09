import React from 'react'
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import  MyHeader  from './MyHeader';
import  {HeaderNav}  from './HeaderNav';
import  MyFooter  from './MyFooter';
import CustomRoutes from '../../CustomRoutes';
const { Header, Content, Footer,Sider } = Layout;
const LayoutMain = ({children}) => {

  const styles = {
    layout: { flexDirection: 'row', overflowX: 'hidden' },
    content: {
      padding: '70px 0 0',
      flexShrink: '0',
      background: '#f1f3f6',
      position: 'relative',
    },
    footer: {
      background: '#ffffff',
      textAlign: 'center',
      borderTop: '1px solid #ededed',
    },
  };
  
  return (
 
      <div>
        <header>
         {/* <MyHeader/> */}
         <HeaderNav/>
        </header>
        <main>
            <Content className="isomorphicContent" style={styles.content}>
               {children}
            </Content>
         
        </main>
        <footer>
          {/* Footer content */}
          <MyFooter/>
        </footer>
      </div>
    );
  
}


export default LayoutMain