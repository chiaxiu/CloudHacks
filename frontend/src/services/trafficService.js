import axios from 'axios';

const apiBaseUrl = 'http://localhost:5000/api';

const getTrafficData = async () => {
  const { data } = await axios.get(`${apiBaseUrl}/data`);

  return data;
};

export default {
  getTrafficData
};
