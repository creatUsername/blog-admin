import React from 'react'
import Cookies from 'js-cookie'

const Dashboard = ({ history }) => {
  const LogOut = () => {
    Cookies.remove('blog-admin-token')
    history.push('/login')
  }

  return (
    <div>
      Dashboard
      <button onClick={LogOut}>log out</button>
    </div>
  )
}

export default Dashboard