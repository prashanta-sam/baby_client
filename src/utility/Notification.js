import { Space, notification ,Button} from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { useEffect } from 'react';

let api = undefined;

const setApi = (ctxApi) => {
  api = ctxApi;
};


const createNotification = async (type, message, description, duration) => {
    const key = `open${Date.now()}`;

    api.destroy(key)
    const close = () => {
        // console.log(
        //   'Notification was closed. Either the close button was clicked or duration time elapsed.',
        // );
      };
      const autoClose=(key)=>{
            api.destroy(key)
      }
        const timer = setTimeout(() => {
            //console.log('Auto close in 3 second!')
            api.destroy(key)
        }, 3000);

    const btn = (
        <Space>
          <Button type="link" style={{display:'none'}} size="small" onClick={() => api.destroy(key)}>
            Destroy All
          </Button>
          <Button type="primary" style={{display:'none'}} size="small" onClick={() => api.destroy(key)}>
            Confirm
          </Button>
        </Space>
      );
      api[type]({
         message,
         description,    
         duration:3000,    
        //  btn,
         key,
         onClose: close,  
      });
 
    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         console.log('This will run after 1 second!')
    //     }, 1000);
    //     return () => clearTimeout(timer);
    // }, []);
};
export default createNotification;
export { setApi, api };
