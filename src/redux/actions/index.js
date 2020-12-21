import * as actionTypes from './types';

// User actions
export const setUser = user => {
  return {
    type: actionTypes.SET_USER,
    payload: {
      currentUser: user
    }
  }
}

export const clearUser = () => {
  return {
    type: actionTypes.CLEAR_USER
  }
}

export const setUserToken = tokenData => {
  return {
    type: actionTypes.SET_USER_TOKEN,
    payload: { tokenData }
  }
}

export const clearUserToken = () => {
  return {
    type: actionTypes.CLEAR_USER_TOKEN
  }
}


