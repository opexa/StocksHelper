import storageService from './StorageService';
import moment from 'moment';

const calculateExpiring = (expires_in) => {
  expires_in = expires_in / 24 / 60 / 60 / 1000;
  let expiryDate = moment().add(expires_in, 'days').format('MM/DD/YYYY HH:MM:SS');
  
  return expiryDate;
}

const authorize = (token, expires) => {
  storageService.set('authtoken', token);
  storageService.set('expires', calculateExpiring(expires));
}

const unauthorize = () => {
  storageService.remove('authtoken');
  storageService.remove('expires');
}

const isAuthorized = () => {
  const token = storageService.get('authtoken');
  const expires = new Date(storageService.get('expires'));

  if (token) {
    const now = new Date();
    if (expires < now) {
      unauthorize();
      return false;
    }
    return true;
  }
  return false;
}

const getToken = () => {
  const token = storageService.get('authtoken');
  return token;
}

export default {
  authorize,
  unauthorize,
  isAuthorized,
  getToken
}