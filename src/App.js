
import './App.css';
import CustomRoutes from './CustomRoutes';
import { notification } from 'antd';

import { setApi } from './utility/Notification'
function App() {
  const [api, contextHolder] = notification.useNotification();
  setApi(api);
  return (
    <div className="App">      
       {contextHolder}       
       <CustomRoutes/>   
    </div>
  );
}

export default App;
