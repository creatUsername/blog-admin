import React, { useState } from 'react'
import { Card, Form, Input, Checkbox, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import * as userActions from '../../store/actions/user'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import servicePath from '../../api'
import Axios from 'axios'

const Login = props => {
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('123456')
  const [isLoading, setIsLoading] = useState(false)

  const { actions } = props

  const onFinish = values => {
    setIsLoading(() => true)
    Axios({
      method: 'post',
      url: servicePath.LOGIN,
      data: { username: values.username, password: values.password }
    }).then(res => {
      if (res.data.code === 200) {
        setIsLoading(false)
        actions.setUser(res.data)
        message.success(res.data.message)
        let RedirectUrl = props.location.state ? props.location.state.from.pathname : '/'
        props.history.push(RedirectUrl)
      } else {
        setIsLoading(false)
        message.error(res.data.message)
      }
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

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(userActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)