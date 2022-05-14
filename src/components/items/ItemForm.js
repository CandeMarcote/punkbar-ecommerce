import React, { useRef } from 'react';

const ItemForm = (props) => {
  const amountInputRef = useRef();

  function submitHandler(e) {
    e.preventDefault();    
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if(enteredAmount.trim().length === 0) return;

    props.onAddToCart(enteredAmountNumber);
  }

  return (
    <form onSubmit={submitHandler}>
        <input type="number" ref={amountInputRef} step={1} min={1} defaultValue={1}/>
        <button type='submit'>Add</button>
    </form>
  )
}

export default ItemForm