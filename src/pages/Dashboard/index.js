import React from 'react'
// import * as userActions from '../../store/actions/user'
// import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const Dashboard = props => {
  console.log(props)
  return (
    <div>
      Hello { props.user.nickname }
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.user.user
})

const mapDispatchToProps = dispatch => ({
  // actions: bindActionCreators(userActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)