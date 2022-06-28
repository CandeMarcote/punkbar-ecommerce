import React, { useContext, useState, useEffect } from 'react';
import FavoritesList from './FavoritesList';
import SearchByName from '../items/filters/SearchByName';
import FavoritesContext from '../../store/favorites-context';
import '../../styles/favorites.css'
import getRequestData from '../../services/services';

const FavoritesListContainer = () => {
    const [searchValue, setSearchValue] = useState('');
    const [favorites, setFavorites] = useState([]);
    const [beers, setBeers] = useState([]);
    const [burgers, setBurgers] = useState([]);

    /*let getFetch = async (category, id) => {
      if(category === "beer") {
        let response = await getRequestData(`https://api.punkapi.com/v2/beers/${id}`);
        const transformData = response.map(product => {
          return {
              id: product.id,
              name: product.name,
              description: product.description,
              ibu: product.ibu,
              abv: product.abv,
              price: product.ph,
              img: product.image_url,
              type: 'beer',
          }
        })
        console.log(transformData)
        //aca hacer una funcion que concatene los resultados
        setBeers([...beers, transformData]);

      } else {
        let response = await getRequestData(`https://my-burger-api.herokuapp.com/burgers/${id}`)
        console.log(response)

        const transformData = response.map(product => {
          return {
              id: product.id,
              name: product.name,
              ingredients: product.ingredients,
              price: 10,
              type: 'burger',
              faved: false,
              img: "https://img.playbuzz.com/image/upload/ar_1.5,c_pad,f_jpg,b_auto/cdn/a503e7eb-0166-4f30-86d6-d276dfcbd3bc/42447522-65cd-428e-ae12-14a2b3754be4_560_420.jpg",
          }
       });

      //aca hacer una funcion que concatene los resultados
       setBurgers(transformData)
      }
    }*/

    /*let fetchDB = async () => {
      const url = "http://localhost:8080/favorites";
      let resp = await getRequestData(url);

      //separar por usuario que despues lo voy separar en el login lo100to
      const user1favorites = resp.filter(element => element.userId === 1);
      setFavorites(user1favorites);


      favorites.forEach(element => {
        getFetch(element.category, element.productNumber)
        //SEGUIR ACA
      });

    }
    
    useEffect(()=> {
      fetchDB();
      console.log(beers)
    }, [searchValue])*/
    const favoritesCtx = useContext(FavoritesContext);

    const existingItem = favoritesCtx.items.filter(item => item.name.toLowerCase().trim() === searchValue.toLowerCase().trim());



    function getSearchValueHandler(val) {
      setSearchValue(val);
    }

  return (
    <div className='favoriteItemContainer'>
        <h3>These are your favorites!</h3>
        <div className='filterContainer'>
          <SearchByName onGetSearchValue={getSearchValueHandler}/>
        </div>
        {!searchValue ? <FavoritesList items={favoritesCtx.items}/> : <FavoritesList items={existingItem}/>}
    </div>
  )
}

export default FavoritesListContainer