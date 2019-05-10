function addAuthorization(headers) {
  let newHeaders = headers;
  newHeaders.Authorization = `Bearer `;

  return newHeaders;
}

const handleResponse = response => {
  if (!response.ok) {
    return response.text().then(err => {
      throw new Error(err);
    });
  }
  return response.text()
    .then(text => text.length ? JSON.parse(text) : {});
}


function makeRequest(method, auth, body) {
  let headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }

  if (auth) {
    headers = addAuthorization(headers);
  }

  let options = {
    method,
    headers
  };

  if (body) {
    var formBody = [];
    for (var prop in body) {
      var encodedKey = encodeURIComponent(prop);
      var encodedValue = encodeURIComponent(body[prop]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    options.body = formBody.join("&");
  }
  return options;
}

const get = (endpoint, auth) => {
  let options = makeRequest('GET', auth);
  return fetch(endpoint, options).then(handleResponse);
}

const post = (endpoint, auth, data) => {
  let options = makeRequest('POST', auth, data);
  return fetch(endpoint, options).then(handleResponse);
}

const update = (endpoint, auth, data) => {
  let options = makeRequest('PUT', auth, data);
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