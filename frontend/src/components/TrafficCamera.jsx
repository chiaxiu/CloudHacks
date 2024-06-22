/* eslint-disable react/prop-types */
import { useState } from 'react';

const TrafficCamera = ({ data }) => {
  const [showAnnotated, setShowAnnotated] = useState(false);

  const toggleAnnotatedImage = () => {
    setShowAnnotated(!showAnnotated);
  };

  return (
    <div className='col-md-6 mb-4'>
      <div className='card'>
        <img
          src={data.image_url}
          style={{ display: showAnnotated ? 'none' : 'block', width: '100%' }}
          alt='Camera View'
        />
        <img
          src={`data:image/jpeg;base64,${data.annotated_image_url}`}
          style={{ display: showAnnotated ? 'block' : 'none', width: '100%' }}
          alt='Annotated View'
        />
        <div className='card-body'>
          <h5 className='card-title'>{data.camera_description}</h5>
          <p className='card-text'>Timestamp: {data.timestamp}</p>
          <p className='card-text'>Congestion: {data.description}</p>
          <button
            className='btn btn-secondary mt-2'
            onClick={toggleAnnotatedImage}
          >
            {showAnnotated ? 'Show Original Image' : 'Show Annotated Image'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrafficCamera;
