import axios from 'axios';

const api = axios.create({
  baseURL: 'http://167.99.14.178:3333',
});

// const api = axios.create({
//   baseURL: 'http://192.168.43.76:3333',
// });

export default api;