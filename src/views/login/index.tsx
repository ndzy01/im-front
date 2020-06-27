import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { setUserName } from '../../redux/user.redux';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import api from '../../http';

import './login.scss';
import { createHashHistory } from 'history';
const history = createHashHistory();

const LoginForm = connect((state) => state, { setUserName })((props: any) => {
  useEffect(() => {
    if (props.User.user && props.User.user !== '') {
      history.push('/talk');
    }
  }, [props.User.user]);
  const onFinish = (values: any) => {
    props.setUserName(values.username);
    api('/im/login', 'POST', { username: values.username });
  };
  const checkPassword = (rule: any, val: any, callback: any) => {
    if (!val) {
      callback();
    }
    if (val !== 'ndzy') {
      callback('密码错误！');
    }
    callback();
  };
  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: '请输入你的名字！' }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="用户名"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          { required: true, message: '请输入密码！', validator: checkPassword },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="密码"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          进入聊天室
        </Button>
      </Form.Item>
    </Form>
  );
});

const Login = () => {
  return (
    <div className="login-page">
      <div className="login-body">
        <div className="login-form">
          <div className="login-form-content">
            <LoginForm></LoginForm>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
