import React, { useRef } from 'react';

const ItemForm = (props) => {
    const amountInputRef = useRef();

    function submitHandler(e) {
        e.preventDefault();

        const enteredAmount = Number(amountInputRef.current.value)

        if(enteredAmount < 0) return


        props.onAddToCart(enteredAmount)        
    }

  return (
    <form onSubmit={submitHandler}>
        <input ref={amountInputRef} type="number" step={1} min={1} defaultValue={1}/>
        <button type='submit'>Add</button>
    </form>
  )
}

export default ItemForm