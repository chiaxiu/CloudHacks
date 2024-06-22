import { useEffect, useState } from 'react';
import trafficService from './services/trafficService';

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await trafficService.getTrafficData();
      console.log(response);
      setData(response);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>hiii {data}</h1>
    </div>
  );
};

export default App;
