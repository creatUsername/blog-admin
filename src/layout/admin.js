import React, { useState } from 'react'
import { Layout, Menu } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons'
import { withRouter } from 'react-router-dom'
import routes from '../routerMap'

const { Header, Sider, Content } = Layout

const MyLayouts = ({ children, location, history }) => {
  const [collapsed, setCollapsed] = useState(false)
  const selectedKeys = [location.pathname]
  const whiteList = [
    '/login',
    '/404'
  ]

  const toggle = () => {
    setCollapsed(x => !x)
  }

  const MenuSelected = ({ item, key, keyPath }) => {
    history.push(key)
  }

  if (whiteList.includes(location.pathname)) {
    return (
      <>
        {children}
      </>
    )
  }
  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        className="layout-sider"
        collapsed={collapsed}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          onClick={MenuSelected}
          defaultSelectedKeys={['/']}
          selectedKeys={selectedKeys}
        >
          {
            routes.map( route => {
              if (!route.hidden) {
                return (
                  <Menu.Item
                    key={route.path}
                  >
                    {route.icon && <route.icon />}
                    <span>{route.title}</span>
                  </Menu.Item>
                )
              }
              return undefined
            })
          }
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle,
            style: {
              paddingLeft: 10
            }
          })}
        </Header>
        <Content
          className="layout-main"
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default withRouter(MyLayouts)
