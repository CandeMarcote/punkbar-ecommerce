import React, { useState } from 'react';

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
    <form onSubmit={submitHandler}>
        <p>Filter by IBU</p>
        <label htmlFor="minValue">
            <input type="number" min={1} step={1} onChange={getMinValueHandler} placeholder='Min value'/>
        </label>
        <label htmlFor="maxValue">
            <input type="number" min={1} step={1} onChange={getMaxValueHandler} placeholder='Max value'/>
        </label>
        <button type="submit">Search</button>
    </form>
  )
}

export default FilterByIbu