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

  let total_cars = 0;
  if (trafficData) {
    total_cars = trafficData
      .map((data) => data.number_of_cars)
      .reduce((a, b) => a + b);
  }

  return (
    <div className='container my-5' style={{ maxWidth: '800px' }}>
      <h1 className='text-center mb-4' style={{ color: '#007bff' }}>
        Street Smart
      </h1>
      <h3 className='text-center mb-4' style={{ color: '#007bff' }}>
        Live Traffic Congestion Information
      </h3>
      <ExpresswaySelector onSelectExpressway={handleExpresswayChange} />
      <button className='btn btn-primary mt-3' onClick={fetchData}>
        Fetch Traffic Data
      </button>
      <div className='traffic-data-container mt-4'>
        {isLoading && (
          <div className='loader-container'>
            <span className='loader' />
          </div>
        )}
        {!isLoading && trafficData && (
          <div className='mt-4'>
            <h3 style={{ marginBottom: '20px' }}>
              {selectedExpressway} <i>(Total Cars: {total_cars})</i>
            </h3>
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
