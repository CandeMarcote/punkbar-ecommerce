import React, { useContext, useState, useEffect } from 'react';
import FavoritesList from './FavoritesList';
import SearchByName from '../items/filters/SearchByName';
import FavoritesContext from '../../store/favorites-context';
import '../../styles/favorites.css'
import getRequestData from '../../services/services';

const FavoritesListContainer = () => {
    const [searchValue, setSearchValue] = useState('');
    const [favorites, setFavorites] = useState([]);
    //const favoritesCtx = useContext(FavoritesContext);









  
  
    const [favoritesFromDB, setFavoritesFromDB] = useState([]);
    const [isFavoritesLoading, setIsFavoritesLoading] = useState(false);
    const theUserId = 1;
  
    useEffect(()=> {
      getDB()
    }, []);
  
    //GET ITEMS FROM DB
    let getDB = async () => {
      setIsFavoritesLoading(true)
      const url = `http://localhost:8080/favorites/${theUserId}`;
      const res = await getRequestData(url);

      let beers = []
      for (let i = 0; i < res.length; i++) {
        const element = res[i];
        if(element.category === "beer") {
          const response = await getRequestData(`https://api.punkapi.com/v2/beers/${element.productNumber}`);
          const transform = response.map(item => {
            return {
              id: item.id,
              name: item.name,
              description: item.description,
              ibu: item.ibu,
              abv: item.abv,
              price: item.ph,
              img: item.image_url,
              type: 'beer',
            }
          })
          beers = beers.concat(transform);
          console.log(beers)
        } else {
          const response = await getRequestData(`https://my-burger-api.herokuapp.com/burgers/${element.productNumber}`);
          const transform2 = response.map(item => {
            return {
              id: item.id,
              name: item.name,
              ingredients: item.ingredients,
              description:item.description,
              price: 10,
              type: 'burger',
              img: "https://img.playbuzz.com/image/upload/ar_1.5,c_pad,f_jpg,b_auto/cdn/a503e7eb-0166-4f30-86d6-d276dfcbd3bc/42447522-65cd-428e-ae12-14a2b3754be4_560_420.jpg",
          }
          })
          beers = beers.concat(response);
        }
        setIsFavoritesLoading(false);
        if(!isFavoritesLoading) {
          
          setFavorites(beers);
        }
      }
    }
    
    console.log(favorites)
























    const existingItem = favorites.filter(item => item.name.toLowerCase().trim() === searchValue.toLowerCase().trim());

    function getSearchValueHandler(val) {
      setSearchValue(val);
    }
    
    /*useEffect(()=>{
      setFavorites(favoritesCtx.items)
      console.log(favoritesCtx.items)
    },[])*/

  return (
    <div className='favoriteItemContainer'>
        <h3>These are your favorites!</h3>
        <div className='filterContainer'>
          <SearchByName onGetSearchValue={getSearchValueHandler}/>
        </div>
    {!searchValue ? <FavoritesList items={favorites}/>  : <FavoritesList items={existingItem}/>}
    </div>
  )
}

export default FavoritesListContainer