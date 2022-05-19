import { useContext, useState} from 'react';
import FavoritesContext from '../../store/favorites-context';


const ToggleFavorite = ({product}) => {
  const [isFaved, setIsFaved] = useState(false);
  const favoritesCtx = useContext(FavoritesContext);

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
        faved: product.faved,
    })

    setIsFaved(!isFaved);
  }
  
  return (
    <>
    {isFaved ? <button onClick={toggleFavoriteHandler}>{'♥'}</button> : <button onClick={toggleFavoriteHandler}>{'♡'}</button>}
    </>
  )
}

export default ToggleFavorite