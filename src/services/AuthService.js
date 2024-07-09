import axios from 'axios';
import config from '../config';

const AuthApiService = {
  postLogin(credentials) {
    return axios.post(`${config.API_ENDPOINT}/auth/`, credentials)
      .then(res => res.data)
      .catch(err => {
        // Axios wraps the response error in err.response
        console.log('error:', err.response ? err.response.data : err);
        // Optionally, you can reject the promise to allow further chaining with .catch
        return Promise.reject(err.response ? err.response.data : err);
      });
  },
  postUser(user) {
    return axios.post(`${config.API_ENDPOINT}/users`, user)
      .then(res => res.data)
      .catch(err => {
        console.log('error:', err.response ? err.response.data : err);
        // Optionally, you can reject the promise to allow further chaining with .catch
        return Promise.reject(err.response ? err.response.data : err);
      });
  },
}

export default AuthApiService;