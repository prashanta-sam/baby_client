import { Button, Form, Input, Select ,Tooltip} from 'antd';
import { EyeOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useState,useEffect } from 'react';
import validator from 'validator'
import { useDispatch, useSelector } from 'react-redux';
import { userSignup,setError } from '../../Slices/user/UserSlice';
import Notification from '../../utility/Notification'
import { Navigate, useNavigate} from 'react-router-dom';

const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
const Signup = () => {
  const navigate = useNavigate();
  const {
      status,
      userInfo,
      token,
      error,
      isAuth,count
  }= useSelector((state) => state.user)
  console.table(isAuth)
  const dispatch = useDispatch()


  const [form] = Form.useForm();
  const [errorMessage, setErrorMessage] = useState('')
  const [isShown, setIsSHown] = useState(false);
  const validate = (password) => {
  
    if(password.length > 0)
    {
      // const isValid=  validator.isStrongPassword(password, {
      //   minLength: 8, minLowercase: 1,
      //   minUppercase: 1, minNumbers: 1, minSymbols: 1
      // })
      // if (isValid ) 
      // {
      //   setErrorMessage('Is Strong Password')
      // } else {
      //   setErrorMessage('Is Not Strong Password')
      // }

    }
    else
    setErrorMessage('')
  }
  const onGenderChange = async (value) => {
    switch (value) {
      case 'male':
        form.setFieldsValue({
          note: 'Hi, man!',
        });
        break;
      case 'female':
        form.setFieldsValue({
          note: 'Hi, lady!',
        });
        break;
      case 'other':
        form.setFieldsValue({
          note: 'Hi there!',
        });
        break;
      default:
    }
  };
  const onFinish = async (values) => {
    let formData=new FormData()
    formData.append('username',values.username)
    formData.append('email',values.email)
    formData.append('password',values.password)
    formData.append('password_confirmation',values.confirm_password)
    dispatch(userSignup(formData))           
    if(status===1)
    { 
      return navigate("/", { replace: true })            
    }
             
  };
  const onReset = () => {
    form.resetFields();
  };
  const onFill = () => {
    form.setFieldsValue({
      note: 'Hello world!',
      gender: 'male',
    });
  };


  // This function is called when the checkbox is checked or unchecked
  const togglePassword = () => {
    setIsSHown((isShown) => !isShown);
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
    Notification(
      status===1? 'success' : status===-1 ? 'info' :'error',
      error,'',3000);     
}, [error]);

  return (
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
      }}
    >
      <Form.Item
        name="username"
        label="Username"
        rules={[
          {
            required: true,
            message: 'Please enter your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[
          {
            required: true,
            message: 'Please enter your email!',
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
              <EyeOutlined className="site-form-item-icon" onClick={togglePassword}/>
              <Tooltip title="Min 8 characters,
              1 lowercase,
              1 uppercase,
              1 digit,
              1 symbol" trigger="hover">
               <InfoCircleOutlined className="site-form-item-icon" />
            </Tooltip>
            </>
          } 
          type={isShown ? "text" : "password"}  onChange={(e) => validate(e.target.value)}/>
       
      </Form.Item>
      {errorMessage === '' ? null :
        <span style={{
          fontWeight: 'bold',
          color: 'red',
        }}>{errorMessage}</span>}
      <Form.Item
        name="confirm_password"
        label="Confirm Password"
        rules={[
          {
            required: true,
            message: 'Please enter your password!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
        
      </Form.Item>
      <p>{userInfo?.user_name}</p>
      {status===1 ? null :
        <span style={{
          fontWeight: 'bold',
          color: 'red',
        }}>{error}</span>}
    </Form>
  );
};
export default Signup;