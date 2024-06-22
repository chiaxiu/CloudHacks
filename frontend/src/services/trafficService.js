import axios from 'axios';

const apiBaseUrl = 'http://localhost:5000/api';

const getTrafficData = async () => {
  const { data } = await axios.get(`${apiBaseUrl}/data`);
  console.log('hii', data);

  return data;
};

export default {
  getTrafficData
};
