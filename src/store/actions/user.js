import { SET_USER, RESET_USER } from '../constants'
import { setToken, removeToken } from '../../libs/auth'

export const setUser = info => {
  return dispatch => {
    setToken(info.token)
    dispatch({
      type: SET_USER,
      payload: info
    })
  }
}

export const resetUser = () => {
  return dispatch => {
    removeToken()
    dispatch({
      type: RESET_USER
    })
  }
}