// import axios from 'axios';

// export default axios.create({
//   baseURL: 'http://localhost:8000',
//   withCredentials: true,
// });

import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://ai-notes-summariser-dep-server.onrender.com',
  withCredentials: true // ✅ Sends cookie with every request
});

export default instance;
