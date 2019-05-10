import httpClient from '../infrastructure/httpClient';
import { LOGIN_URL, REGISTER_URL } from '../constants/AppConstants';

export default {
  login: async (credientials) => {
    return await httpClient.post(LOGIN_URL, false, credientials);
  },
  register: async (credientials) => {
    return await httpClient.post(REGISTER_URL, false, credientials);
  }
}