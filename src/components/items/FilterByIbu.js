import React, {useState} from 'react';


const FilterByIbu = (props) => {
    const [smallestValue, setSmallestValue] = useState(0);
    const [greatestValue, setGreatestValue] = useState(100);

    function getSmallestValueHander(e) {
        setSmallestValue(e.target.value)
    }

    function getGreatestValueHander(e) {
        setGreatestValue(e.target.value)
    }

    function searchHandler(e){
        e.preventDefault();
        props.onGetIbuValues(smallestValue, greatestValue);
    }

  return (
    <div>
        <p>Search by IBU</p>
        <form onSubmit={searchHandler}>
            <label htmlFor="minValue"><input type="number" onChange={getSmallestValueHander} placeholder='min value'/></label>
            <label htmlFor="maxValue"><input type="number" onChange={getGreatestValueHander} placeholder='max value'/></label>
            <button type='submit'>Search</button>
        </form>
    </div>
  )
}

export default FilterByIbu