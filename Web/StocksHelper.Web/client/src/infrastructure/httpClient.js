import { UNEXPECTED_ERROR } from '../constants/AppConstants';
import AuthService from '../services/AuthService';

function addAuthorization(headers) {
  let newHeaders = headers;
  newHeaders.Authorization = `Bearer ${AuthService.getToken()}`;

  return newHeaders;
}

const handleResponse = response => {
  if (!response.ok) {
    return response.text().then(err => {
      throw new Error(err || UNEXPECTED_ERROR);
    });
  }
  return response.text()
    .then(text => text.length ? JSON.parse(text) : {});
}


function makeRequest(method, auth, body, formData) {
  let headers = { 
    'Content-Type': formData ? 'application/x-www-form-urlencoded' : 'application/json'
  }

  if (auth) {
    headers = addAuthorization(headers);
  }

  let options = {
    method,
    headers
  };

  if (body) {
    if (formData) {
      var formBody = [];
      for (var prop in body) {
        var encodedKey = encodeURIComponent(prop);
        var encodedValue = encodeURIComponent(body[prop]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      options.body = formBody.join("&");
    }
    else {
      options.body = JSON.stringify(body);
    }
  }

  return options;
}

const get = (endpoint, auth) => {
  let options = makeRequest('GET', auth);
  return fetch(endpoint, options).then(handleResponse);
}

const post = (endpoint, auth, data, formData = false) => {
  let options = makeRequest('POST', auth, data, formData);
  return fetch(endpoint, options).then(handleResponse);
}

const update = (endpoint, auth, data, formData = false) => {
  let options = makeRequest('PUT', auth, data, formData);
  return fetch(endpoint, options).then(handleResponse);
}

const remove = (endpoint, auth) => {
  let options = makeRequest('DELETE', auth);
  return fetch(endpoint, options).then(handleResponse);
}

export default {
  get,
  post,
  update,
  remove
}