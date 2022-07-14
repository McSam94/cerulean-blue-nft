import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const OPENSEA_API_KEY = process.env.NEXT_PUBLIC_OPENSEA_API_KEY;

const ApiUtils = () => {
  const apiClient = axios.create({
    baseURL: BASE_URL,
  });

  apiClient.interceptors.request.use((request) => {
    let finalRequest = request;
    if (!!OPENSEA_API_KEY) {
      finalRequest = {
        ...request,
        headers: {
          ...request.headers,
          'X-API-KEY': OPENSEA_API_KEY,
        },
      };
    }

    return finalRequest;
  });

  return apiClient;
};

export default ApiUtils();
