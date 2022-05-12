import React, {useRef} from 'react';

export const inputValue = undefined;

const ItemFilter = () => {
    const inputValueRef = useRef();
    inputValue = inputValueRef.current.value;

    function findItemHandler(event) {
        event.preventDefault();
        if(inputValue.trim() === '') return
        console.log(inputValueRef.current.value)
    }
    
  return (
    <form onSubmit={findItemHandler}>
        <input type="text" ref={inputValueRef}/>
        <button type='submit'>Buscar</button>
    </form>
  )
}

export default ItemFilter