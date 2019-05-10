import Noty from 'noty';

const notification = (text, type) => new Noty({ container: '.notifications-container' , text, type, progressBar: false, theme: 'nest', timeout: 3000 }).show();

const error = (text) => notification(text, 'error');
const success = (text) => notification(text, 'success');
const warning = (text) => notification(text, 'warning');
const info = (text) => notification(text, 'warning');
const alert = (text) => notification(text, 'alert');

export default {
  error,
  success,
  warning,
  info,
  alert
}