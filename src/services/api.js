import axios from 'axios';

const api = axios.create({
  baseURL: 'http://18.118.172.42:4000',
});

// const api = axios.create({
//   baseURL: 'http://167.99.14.178:3333',
// });

// const api = axios.create({
//   baseURL: 'localhost:4000',
// });

export default api;