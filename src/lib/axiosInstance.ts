import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://challenge.crossmint.io/api/",
});

axiosInstance.interceptors.request.use((config) => {
  const candidateId = process.env.candidateId;
  if (candidateId) {
    config.data = {...config.data, candidateId};
  }
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  return config;
});

export default axiosInstance;
