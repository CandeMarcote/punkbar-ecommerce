import React from 'react';
import Modal from '../UI/Modal';
import ToggleFavorite from '../favorites/ToggleFavorite';
import '../../styles/itemDetail.css'

const ItemDetail = ({product, onClose}) => {
  let ingredients;

  if(product.type === 'burger') {
    ingredients = product.ingredients.map(ingredient => {
      return <li key={Math.random()}>{ingredient}</li> 
    })
  }

  return (
    <Modal onClose={onClose}>
        {product.type === 'beer' && (
        <div className='itemDetail beer__itemDetail'>
            <h3>{product.name}</h3>
            <div className='detailImgContainer'>
              <img src={product.img} alt="Buzz beer" width='30%'/>
            </div>
            <div className='description'>
              <p>{product.description}</p>
                <p>IBU: {product.ibu}</p>
                <p>ABV: {product.abv}</p>
            </div>
          <ToggleFavorite product={product}/>
        </div>
        )}
        
        {product.type === 'burger' && (
        <div className='itemDetail burger__itemDetail'>
          <h3>{product.name}</h3>
          <img src={product.img} alt="Buzz beer" width='30%'/>
          <div className='ingredients'>
            <div>
              <h6>Ingredients:</h6>
              <ul>
                {ingredients}
              </ul>
            </div>
          </div>
          <ToggleFavorite product={product}/>
        </div>
        )}
    </Modal>
  )
}

export default ItemDetail;