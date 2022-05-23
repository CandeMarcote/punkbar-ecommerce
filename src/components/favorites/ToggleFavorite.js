import { useContext, useState, useEffect} from 'react';
import FavoritesContext from '../../store/favorites-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faHeart, faHeartHalf } from '@fortawesome/free-solid-svg-icons';
import '../../styles/filters.css'

const ToggleFavorite = ({product}) => {
  const [isFaved, setIsFaved] = useState(false);
  const favoritesCtx = useContext(FavoritesContext);

  const existingItem = favoritesCtx.items.find(element => element.name === product.name);

  useEffect(()=>{
    setIsFaved(existingItem);
  }, [existingItem])

  function toggleFavoriteHandler() {
    favoritesCtx.toggleItem({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        ibu: product.ibu,
        abv: product.abv,
        img: product.img,
        ingredients: product.ingredients,
        type: product.type,
    })
    setIsFaved(!isFaved);
  }
  
  return (
    <>
    {isFaved ? <button className='fave' onClick={toggleFavoriteHandler}><FontAwesomeIcon icon={faHeart} beat/></button> : <button className='fave' onClick={toggleFavoriteHandler}>{'♡'}</button>}
    </>
  )
}

export default ToggleFavorite