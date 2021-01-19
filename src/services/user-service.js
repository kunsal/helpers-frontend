import Axios from 'axios';
import BaseService from './base-service';

class UserService extends BaseService {

  async register(data) {
    console.log(data);
    try {
      const response = await Axios.post(`${this.endpoint}/users`, JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }
      });

      if (response.status === 201) {
        return response.data;
      } else {
        throw new Error('Could not save aggregator. Please try again')
      }
    } catch (error) {

      if (error.response.status === 422) {
        return error.response.data;
      }

      if (error.response.status < 422) {
        return this.errorMessage(error.response.data.message)
      }
      throw new Error('An error occurred. Please try again', error.response)
    }
  }
}

export default new UserService();