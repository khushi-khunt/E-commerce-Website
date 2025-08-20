import { BASE_URL } from "@/utils/environment";
import axios from 'axios';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': [
    'Origin',
    'Accept',
    'X-Requested-With',
    'Content-Type',
    'Authorization',
  ],
};

const client = axios.create({
  baseURL: BASE_URL,
  headers,
});

// Request interceptor
client.interceptors.request.use(
  (config) => {
    // console.log("Axios Interceptor - Config:", config);
    const isLoginEndpoint = config.url?.includes("/auth/login");

    // Skip adding token for login
    if (!isLoginEndpoint) {
      const auth = localStorage.getItem("persist:root");
      if (auth) {
        try {
          const parsed = JSON.parse(auth);
          const authState = JSON.parse(parsed.auth);

          const token = authState.token
          // console.log("Redux Token:", token); 
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            // console.log("Token added to request headers:", token);
          }
          else {
            console.warn(" Token is missing");
          }
        } catch (error) {
          console.error(" Failed to parse persisted auth state", error);
        }

      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);


export default client;
