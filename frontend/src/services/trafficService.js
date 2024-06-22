import axios from 'axios';

const apiBaseUrl = 'http://localhost:5000/api';

const fetchTrafficData = async ({ selectedExpressway }) => {
  const { data } = await axios.get(`${apiBaseUrl}/traffic_data`, {
    params: { expressway: selectedExpressway }
  });

  return data;
};

export default {
  fetchTrafficData
};
