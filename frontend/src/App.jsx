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

      const test = await trafficService.fetchTrafficData(selectedExpressway);
      console.log(test);
    };
    fetchData();
  }, []);

  const handleExpresswayChange = (expressway) => {
    setSelectedExpressway(expressway);
  };

  return (
    <div className='container my-5' style={{ maxWidth: '800px' }}>
      <h1 className='text-center mb-4' style={{ color: '#343a40' }}>
        Traffic Congestion Information
      </h1>
      <ExpresswaySelector onSelectExpressway={handleExpresswayChange} />
    </div>
  );
};

export default App;
