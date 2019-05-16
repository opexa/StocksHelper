export const DOMAIN = 'localhost:44366';
export const API_BASE_URL = `https://${DOMAIN}`;
export const LOGIN_URL = `${API_BASE_URL}/api/account/login`;
export const REGISTER_URL = `${API_BASE_URL}/api/account/register`;

export const FETCH_MY_TEAMS_URL = `${API_BASE_URL}/api/teams/fetchmyteams`;
export const LOAD_MY_TEAM_URL = `${API_BASE_URL}/api/teams/load`;
export const SUGGEST_MEMBER = `${API_BASE_URL}/api/teams/suggestmember?input=`

export const FILL_ALL_FIELDS = 'Please fill all fields.';
export const PASSWORDS_DONT_MATCH = 'Passwords don\'t match.';
export const UNEXPECTED_ERROR = 'An unexpected error occured. Please reload the page and try again.';

export const DEFAULT_GROUP_PHOTO = 'http://gigapan.com/images/default-group-avatar.jpg?1380820092';