import React from 'react';
import Item from './Item';
import Card from '../UI/Card';

const itemList = (props) => {
  const arr = props.products.map((product) => {
    return <Item product={product} key={product.id}/>
  })

  return (
    <Card>
      <p>Page: {props.currentPage}</p>
      <button onClick={props.goToFirstPage}> {'<<'} </button>
      <button onClick={props.prevPageHandler}>Previous</button>
      <button onClick={props.nextPageHandler}>Next</button>
      <button onClick={props.goToLastPage}> {'>>'} </button>
      {arr}
    </Card>
  )
}

export default itemList