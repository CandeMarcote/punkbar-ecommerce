import React, { useState } from 'react';
import '../../../styles/filters.css';

const FilterByIbu = (props) => {
    const [maxValue, setMaxValue] = useState(100);
    const [minValue, setMinValue] = useState(1);

    function getMaxValueHandler(e) {
        setMaxValue(e.target.value);
    }

    function getMinValueHandler(e) {
        setMinValue(e.target.value);
    }

    function submitHandler(e) {
        e.preventDefault();
        props.onGetIbuValues(minValue, maxValue);
    }

  return (
    <form className='ibu' onSubmit={submitHandler}>
        <h5>Filter by IBU</h5>
        <div>
            <label htmlFor="minValue">Lowest IBU value </label>
            <input id='minValue' type="number" min={1} max={100} step={1} onChange={getMinValueHandler} placeholder='1'/>
        </div>
        <div>
            <label htmlFor="maxValue">Higest IBU value </label>
            <input id='maxValue' type="number" min={1} max={100} step={1} onChange={getMaxValueHandler} placeholder='100' defaultValue={100}/>
        </div>
        <button type="submit">Search</button>
    </form>
  )
}

export default FilterByIbu