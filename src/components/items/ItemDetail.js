import React from 'react';
import Modal from '../UI/Modal';
import ToggleFavorite from '../favorites/ToggleFavorite';

const ItemDetail = ({product, onClose}) => {

  return (
    <Modal onClose={onClose}>
        <div>
            <h3>{product.name}</h3>
            <img src={product.img} alt="Buzz beer" width='30%'/>
            <p>{product.description}</p>
            <div>
                <p>IBU: {product.ibu}</p>
                <p>ABV: {product.abv}</p>
            </div>
            <ToggleFavorite product={product}/>
        </div>
    </Modal>
  )
}

export default ItemDetail;