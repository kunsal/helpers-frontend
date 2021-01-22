import * as actionTypes from '../actions/types';

const initialState = [];

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.SET_USER:
      return  action.payload
    case actionTypes.CLEAR_USER:
      return initialState;  
    default:
      return state;
  }
}

const initialTokenState = null

export const userTokenReducer = (state = initialTokenState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER_TOKEN:
      return  action.payload
    case actionTypes.CLEAR_USER_TOKEN:
      return initialTokenState;
    default: 
      return state;
  }
}

export default userReducer; 