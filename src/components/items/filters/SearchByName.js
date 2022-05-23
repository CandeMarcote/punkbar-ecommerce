import React, {useState} from 'react';
import '../../../styles/filters.css';

const SearchByName = (props) => {
    const [filterInput, setFilterInput] = useState('');

    function inputChangeHandler(e) {
        setFilterInput(e.target.value);
    }
    
    function submitHandler(e) {
      e.preventDefault();
      props.onGetSearchValue(filterInput);
    }
    
  return (
    <form onSubmit={submitHandler} className='filterBySearch'>
        <label htmlFor="search"><h5>Search by name</h5></label>
        <input type="text" id='search' placeholder='type a name here' onChange={inputChangeHandler}/>
        <button type='submit'>Search</button>
    </form>
  )
}

export default SearchByName