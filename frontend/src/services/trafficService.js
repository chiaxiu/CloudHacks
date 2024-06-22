import axios from 'axios';

const apiBaseUrl = 'http://localhost:5000/api';

const getTrafficData = async () => {
  const { data } = await axios.get(`${apiBaseUrl}/data`);
  console.log('hii', data);

  return data;
};

const fetchTrafficData = async ({ selectedExpressway }) => {
  const { data } = await axios.get(`${apiBaseUrl}/traffic_data`, {
    params: { expressway: 'PIE' }
  });

  console.log(data);
  return data;
};

export default {
  getTrafficData,
  fetchTrafficData
};
