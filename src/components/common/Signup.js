import { Button, Form, Input, Select ,Tooltip} from 'antd';
import { EyeOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';
import validator from 'validator'
import { useDispatch, useSelector } from 'react-redux';
import { userSignup } from '../../Slices/user/UserSlice';
import Notification from '../../utility/Notification'
import { Navigate} from 'react-router-dom';

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

  const {
      status,
      usersInfo,
      token,
      error,
      isAuth
  }= useSelector((state) => state.user)
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
  const onGenderChange = (value) => {
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
    console.log(values);
    let formData=new FormData()
    formData.append('username',values.username)
    formData.append('email',values.email)
    formData.append('password',values.password)
    formData.append('password_confirmation',values.confirm_password)

    try {
      // const done = await dispatch(userSignup(formData)).unwrap()
      dispatch(userSignup(formData))
      .unwrap()
      .then((done) => {
        // handle result here
   
            Notification(
              done.status===1? 'success' : done.status===-1 ? 'info' :'error',
              done.msg,'',3000);

            if(done.status===1)
              Navigate()
      })
      .catch((rejectedValueOrSerializedError) => {
        // handle error here
      })

      

        // Navigate.push("/home");
    }
    catch (rejectedValueOrSerializedError) 
    {
      //showToast('error', `Fetch failed: ${err.message}`)
      console.log(rejectedValueOrSerializedError)
      Notification(
        'error',
        error,'',3000);
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
        {/* <Button type="link" htmlType="button" onClick={onFill}>
          Fill form
        </Button> */}
      </Form.Item>
      {status===1 ? null :
        <span style={{
          fontWeight: 'bold',
          color: 'red',
        }}>{error}</span>}
    </Form>
  );
};
export default Signup;
