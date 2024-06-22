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
          src={showAnnotated ? data.annotated_image_url : data.image_url}
          className='card-img-top'
          alt='Camera View'
        />
        <div className='card-body'>
          <h5 className='card-title'>{data.camera_description}</h5>
          <p className='card-text'>Timestamp: {data.timestamp}</p>
          <p className='card-text'>Congestion: {data.description}</p>
          <button
            className='btn btn-secondary mt-2'
            onClick={toggleAnnotatedImage}
          >
            Toggle Annotated Image
          </button>
          {showAnnotated && (
            <div className='mt-3'>
              <img src={data.annotated_image_url} alt='Annotated View' />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrafficCamera;
