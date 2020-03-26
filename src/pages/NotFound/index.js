import React from 'react'
import { Button } from 'antd'

const NotFound = ({ history }) => {
  return (
    <div>
      404
      <Button onClick={() => history.push('/')}>Go Home</Button>
      <Button onClick={() => history.goBack()}>Go Back</Button>
    </div>
  )
}

export default NotFound
