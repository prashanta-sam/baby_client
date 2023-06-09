
import React, { useEffect } from 'react'
import { Button, Form, Input, Select ,Tooltip} from 'antd';
import { EyeOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';
import validator from 'validator'
import { useDispatch, useSelector } from 'react-redux';
import { setError, userSignin } from '../../Slices/user/UserSlice';
import Notification from '../../utility/Notification'
import { useNavigate} from 'react-router-dom';


 const Signin = () => {
  const [form] = Form.useForm();

  const navigate = useNavigate();
  const {
      status,
      userInfo,
      token,
      error,
      isAuth
  }= useSelector((state) => state.user)
  console.table(isAuth)
  const dispatch = useDispatch()

  const [isShown, setIsSHown] = useState(false);

  const onFinish = async (values) => {
    console.log(values);
    let formData=new FormData()
    formData.append('email',values.email)
    formData.append('password',values.password)
  
      dispatch(userSignin(formData))           
      if(status===1)
      { 
        return navigate("/", { replace: true })            
      }
      else
      {
        if(error)
        Notification(
          status===1? 'success' : status===-1 ? 'info' :'error',
          error,'',3000);    

      
          
      }
    

  };
  useEffect(() => {
    dispatch(setError())
    return () => {            
    }
  }, [])
  
  useEffect(() => {
    dispatch(setError())
    if (error===null || error ==='') {
        return;
    }
    console.log(error)
      Notification(
        status===1? 'success' : status===-1 ? 'info' :'error',
        error,'',3000);     
}, [error]);
  return (
    <div>
         <Form
  
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
      }}
    >
    
      <Form.Item
        name="email"
        label="Email"
        rules={[
          {
            required: true,
            message: 'Please enter your email or username',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,  
            message: 'Please enter your password!',
          },
        ]}
      >
        <Input     
          // prefix={<LockOutlined className="site-form-item-icon" />}
         suffix={
          <>
              <EyeOutlined className="site-form-item-icon" onClick={()=>  setIsSHown((isShown) => !isShown)}/>
             
            </>
          } 
          type={isShown ? "text" : "password"}/>
       
      </Form.Item>
     
     
      <Form.Item >
        <Button type="primary" htmlType="submit">
          Login
        </Button>
       
        {/* <Button type="link" htmlType="button" onClick={onFill}>
          Fill form
        </Button> */}
      </Form.Item>

      
    </Form>

    </div>
    
  )
}

export default Signin