import BaseService from "./base-service";
import axios from "axios";

class HelpService extends BaseService {

  async create(data) {
    try {
      const response = await axios.post(`${this.endpoint}/helps`, JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${this.token()}`
        }
      });

      if (response.status === 201) {
        return response;
      } 
    } catch (error) {
      if (error.response.status === 422) {
        return error.response;
      }
      throw new Error(error.response)
    }
  }

  async getHelps() {
    try {
      const response = await axios.get(`${this.endpoint}/helps`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${this.token()}`
        }
      });
      console.log(response);
      if (response.status === 200) {
        return response.data;
      } 
    } catch (error) {
      console.log(error.response)
    }
  }

  async getHelp(id) {
    try {
      const response = await axios.get(`${this.endpoint}/helps/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${this.token()}`
        }
      });
      
      if (response.status === 200) {
        return response.data;
      } 
    } catch (error) {
      console.log(error.response)
    }
  }

  async categories() {
    try {
      const response = await axios.get(`${this.endpoint}/categories`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${this.token()}`
        }
      });
      console.log(response);
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Something happened')
      }
    } catch (error) {
      console.log(error.response)
      return [];
    }
  }

}

export default new HelpService;