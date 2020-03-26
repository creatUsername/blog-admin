import Cookies from 'js-cookie'

const defaultState = {
  token: Cookies.get('blog-admin-token') || ''
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: 
      }
    default:
      break;
  }
}