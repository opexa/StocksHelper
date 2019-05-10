export default {
  get: (key) => {
    return localStorage.getItem(key);
  },
  set: (key, value) => {
    if (typeof(value) === 'object') {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, value.toString());
    }
  },
  remove: (key) => {
    localStorage.removeItem(key);
  }
}