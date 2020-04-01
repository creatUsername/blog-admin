import React, { Component } from 'react'
import * as userActions from '../../store/actions/user'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Avatar, Dropdown, Menu } from 'antd'
import { Link, withRouter } from 'react-router-dom'

class MyHeader extends Component {
  logout = () => {
    const { actions, history } = this.props
    actions.resetUser()
    history.push('/login')
  }

  render() {
    return (
      <>
        <div className="header-right">
          <Dropdown overlay={() => (
            <Menu>
              <Menu.Item>
                <Link to="/">首页</Link>
              </Menu.Item>
              <Menu.Item>
                <span onClick={this.logout}>退出登录</span>
              </Menu.Item>
            </Menu>
          )}>
            <Avatar style={{ backgroundColor: '#87d068' }}>
              { this.props.user.nickname }
            </Avatar>
          </Dropdown>
        </div>
        <style>{`
          .header-right {
            display: inline-block;
            float: right;
            padding-right: 10px;
          }
        `}</style>
      </>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.user
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(userActions, dispatch)
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyHeader))
