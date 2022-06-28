import React from 'react';
import '../../styles/spinner.css';

const Spinner = () => {
  return (
    <div className='spinnerContainer'>
      <div className='outer-spinner'></div>
      <div className='inner-spinner'></div>
    </div>
  )
}

export default Spinner