import { useState } from 'react';
import trafficService from './services/trafficService';
import ExpresswaySelector from './components/ExpresswaySelector';
import TrafficCamera from './components/TrafficCamera';
import './App.css';

const App = () => {
  const [trafficData, setTrafficData] = useState(null);
  const [selectedExpressway, setSelectedExpressway] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    setTrafficData(null);
    try {
      const response = await trafficService.fetchTrafficData({
        selectedExpressway
      });
      setTrafficData(response);
    } catch (error) {
      console.error('Error fetching data: ' + error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExpresswayChange = (expressway) => {
    setSelectedExpressway(expressway);
  };

  return (
    <div className='container my-5' style={{ maxWidth: '800px' }}>
      <h1 className='text-center mb-4' style={{ color: '#343a40' }}>
        Traffic Congestion Information
      </h1>
      <ExpresswaySelector onSelectExpressway={handleExpresswayChange} />
      <button className='btn btn-primary mt-3' onClick={fetchData}>
        Fetch Traffic Data
      </button>
      <div className='traffic-data-container'>
        {isLoading && (
          <div className='loader-container'>
            <span className='loader' />
          </div>
        )}
        {!isLoading && trafficData && (
          <div className='mt-4'>
            <h3 style={{ marginBottom: '20px' }}>{selectedExpressway}</h3>
            <div className='row'>
              {trafficData.map((data) => (
                <TrafficCamera key={data.camera_id} data={data} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
