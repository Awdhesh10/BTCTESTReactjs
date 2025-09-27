import axios from 'axios';

const API = axios.create({
  baseURL: 'https://api.learn24x7.io/api',
  headers: {  
    'scope-header': 'x-auth-request',
    'Content-Type': 'application/x-www-form-urlencoded',
    'con':'_OnlineExam',   
  }
});

export default API;


