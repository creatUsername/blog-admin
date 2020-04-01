import { getToken } from '../../libs/auth'
import { SET_USER, RESET_USER } from '../constants'

const initialState = {
  token: getToken(),
  user: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        token: action.payload.token,
        user: action.payload.userInfo
      }
    case RESET_USER:
      return {
        token: null,
        user: {}
      }
    default:
      return state
  }
}