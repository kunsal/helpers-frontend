import * as actionTypes from '../actions/types';

const initialState = [];

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.SET_USER:
      return { currentUser: action.payload.currentUser }
    case actionTypes.CLEAR_USER:
      return initialState;  
    default:
      return state;
  }
}

const initialTokenState = {
  userToken: null
}

export const userTokenReducer = (state = initialTokenState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER_TOKEN:
      return { tokenData: action.payload.tokenData }
    case actionTypes.CLEAR_USER_TOKEN:
      return initialTokenState;
    default: 
      return state;
  }
}

export default userReducer; 