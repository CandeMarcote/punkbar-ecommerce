import {useContext} from 'react';
import FavoritesContext from '../../store/favorites-context';


const ToggleFavorite = ({product}) => {
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
        })
    }
    
  return (
    <button onClick={toggleFavoriteHandler}>{'♥'}</button>
  )
}

export default ToggleFavorite