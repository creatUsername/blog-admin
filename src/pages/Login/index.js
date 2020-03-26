import React, { useState } from 'react'
import { Card, Form, Input, Checkbox, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import servicePath from '../../api'
import axios from 'axios'
import Cookies from 'js-cookie'

const Login = props => {
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('123456')
  const [isLoading, setIsLoading] = useState(false)

  const onFinish = values => {
    setIsLoading(() => true)
    axios({
      method: 'post',
      url: servicePath.LOGIN,
      data: {
        username: values.username,
        password: values.password
      }
    }).then(res => {
      setIsLoading(true)
      if (res.data.code === 200) {
        setIsLoading(false)
        Cookies.set('blog-admin-token', res.data.token)
        message.success(res.data.message)
        let RedirectUrl = props.location.state ? props.location.state.from.pathname : '/'
        props.history.push(RedirectUrl)
      } else {
        message.error(res.data.message)
        setIsLoading(false)
      }
    }).finally(() => {
      setIsLoading(false)
    })
  }

  return (
    <div className="login-container">
      <Card
        title="Login"
        className="login-wrapper"
      >
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
              value={username}
              onChange={e => setUsername(() => e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onPressEnter={() => onFinish}
            />
          </Form.Item>
          <Form.Item>
            <Form.Item
              name="remember"
              valuePropName="checked"
              noStyle
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={isLoading}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login