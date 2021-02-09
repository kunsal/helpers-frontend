import BaseService from "./base-service";
import axios from "axios";
import userService from "./user-service";

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
      if (error.response.status == 401) {
        userService.logout();
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
      
      if (response.status === 200) {
        return response.data;
      } 
    } catch (error) {
      if (error.response.status == 401) {
        userService.logout();
      }
      console.log(error.response)
    }
  }

  async getHelpsByCoordinates(tl, ll, bl, rl) {
    try {
      const response = await axios.get(`
        ${this.endpoint}/helps?coordinates=true&leftLong=${ll}&rightLong=${rl}&topLat=${tl}&bottomLat=${bl}`, 
      {
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
      if (error.response.status == 401) {
        userService.logout();
      }
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
      if (error.response.status == 401) {
        userService.logout();
      }
      console.log(error.response)
    }
  }

  async myHelps(id) {
    try {
      const response = await axios.get(`${this.endpoint}/helps/me`, {
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
      if (error.response.status == 401) {
        userService.logout();
      }
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
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Something happened')
      }
    } catch (error) {
      if (error.response.status == 401) {
        userService.logout();
      }
      console.log(error.response)
      return [];
    }
  }

  async reopen(id) {
    try {
      const response = await axios.post(`${this.endpoint}/helps/reopen`, JSON.stringify({id}), {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${this.token()}`
        }
      });

      
      return response;
      
    } catch (error) {
      if (error.response.status === 422) {
        return error.response;
      }
      if (error.response.status == 401) {
        userService.logout();
      }
      throw new Error(error.response)
    }
  }

}

export default new HelpService;