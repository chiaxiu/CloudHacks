import { useEffect, useState } from 'react';
import trafficService from './services/trafficService';
import ExpresswaySelector from './components/ExpresswaySelector';

const App = () => {
  const [data, setData] = useState(null);
  const [selectedExpressway, setSelectedExpressway] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await trafficService.getTrafficData();
      setData(response.message);
    };
    fetchData();
  }, []);

  const handleExpresswayChange = (expressway) => {
    setSelectedExpressway(expressway);
  };

  return (
    <div>
      <h1>Traffic Congestion Information</h1>
      <ExpresswaySelector onSelectExpressway={handleExpresswayChange} />
    </div>
  );
};

export default App;
