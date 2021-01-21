import store from '../redux/store';

class BaseService {
  baseurl = process.env.REACT_APP_API_URL;
  endpoint;

  constructor() {
    this.endpoint = this.baseurl+'/api/v1';
  }

  errorMessage(message) {
    return {
      errors: { 
        error: [message]
      }
    }
  }

  // getToken = () => {
  //   const state = store.getState();
  //   if (state.userToken !== undefined) return state.userToken.tokenData;
  // }

  // token = () => {
  //   return this.getToken().accessToken;
  // }
}

export default BaseService;