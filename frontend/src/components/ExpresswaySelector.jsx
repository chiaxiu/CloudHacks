/* eslint-disable react/prop-types */
import { useState } from 'react';

const ExpresswaySelector = ({ onSelectExpressway }) => {
  const [expressway, setExpressway] = useState('');

  const handleExpresswayChange = (event) => {
    const selectedExpressway = event.target.value;
    setExpressway(selectedExpressway);
    onSelectExpressway(selectedExpressway);
  };

  return (
    <div className='form-group'>
      <label htmlFor='expressway-select' style={{ fontWeight: 'bold' }}>
        Select an Expressway:
      </label>
      <select
        id='expressway-select'
        className='form-control'
        value={expressway}
        onChange={handleExpresswayChange}
      >
        <option value=''>Select...</option>
        <option value='AYE'>Ayer Rajah Expressway (AYE)</option>
        <option value='BKE'>Bukit Timah Expressway (BKE)</option>
        <option value='CTE'>Central Expressway (CTE)</option>
        <option value='ECP'>East Coast Parkway (ECP)</option>
        <option value='KPE'>Kallange-Paya Lebar Expressway (KPE)</option>
        <option value='KJE'>Kranji Expressway (KJE)</option>
        <option value='Loyang Ave / Tanah Merah Coast Road'>
          Loyang Ave / Tanah Merah Coast Road
        </option>
        <option value='MCE'>Marina Coastal Expressway (MCE)</option>
        <option value='PIE'>Pan Island Expressway (PIE)</option>
        <option value='Sentosa Gateway'>Sentosa Gateway</option>
        <option value='SLE'>Seletar Expressway (SLE)</option>
        <option value='TPE'>Tampines Expressway (TPE)</option>
        <option value='Tuas Checkpoint'>Tuas Checkpoint</option>
        <option value='Woodlands Checkpoint'>Woodlands Checkpoint</option>
      </select>
    </div>
  );
};

export default ExpresswaySelector;
