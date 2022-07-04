import { useState, useEffect } from "react";
import FavoritesContext from "./favorites-context";
/* import postRequestData from "../services/postService";
import deleteRequestData from "../services/deleteService";
import getRequestData from "../services/services"; */
import { getFavorites, postFavorite, deleteFavorite } from "../services/favoritesService";

const FavoritesProvider = (props) => {
    const [favorites, setFavorites] = useState([]);
    const theUserId = props.userId;

    useEffect(()=> {
      if(theUserId > -1) {
        getFavoritesFromDB();
      }
    }, [theUserId]);
  
    //GET FAVORITES FROM DB: 1) get the results from the DB. For every item check whether it's a beer or a burger, make the request, transform the data and set the results to the state favorites
    let getFavoritesFromDB = async () => {
      const url = `http://localhost:8080/favorites/${theUserId}`;
      const res = await getFavorites(url);

      let beers = []
      for (let i = 0; i < res.length; i++) {
        const element = res[i];
        if(element.category === "beer") {
          const response = await getFavorites(`https://api.punkapi.com/v2/beers/${element.productNumber}`);
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
        } else {
          const response = await getFavorites(`https://my-burger-api.herokuapp.com/burgers/${element.productNumber}`);
          const arrayAUX = [];
          arrayAUX.push(response)
          const transform = arrayAUX.map(item => {
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
          beers = beers.concat(transform);
        }
        setFavorites(beers);
      }
    }

    //CLEAR FAVORITES FROM THE FRONTEND: used when closing session so the favorites don't persist in the next session

    function clearFavorites() {
      const clearFavorites = [];
      setFavorites(clearFavorites);
    }    

    //TOGGLE FAVORITES: add or remove favorites based on whether they've been added before or not
    function toggleFavoriteHandler(item){
      const existingItemIndex = favorites.findIndex(element => element.id  === item.id && element.type === item.type);
      const existingItem = favorites[existingItemIndex];
      let updatedItems = undefined;
      
      const theItem = {
        productNumber: item.id,
        category: item.type,
        userId: theUserId,
      }
      if(!existingItem) {
        const url = "http://localhost:8080/favorites/";
        
        postFavorite(url, theItem);
        updatedItems = [...favorites, item];
      } else {
        const url = `http://localhost:8080/favorites/${theUserId}`;

        const existingItemIndex = favorites.findIndex((element) => element.id === item.id && element.type === item.type);
        const existingItem = favorites[existingItemIndex];
        deleteFavorite(url, theItem);
        updatedItems = favorites.filter(element => element !== existingItem);
      }
      setFavorites(updatedItems)
    }
    
    const favoritesContext = {
      items: favorites,
      userId: theUserId,
      toggleItem: toggleFavoriteHandler,
      clearFavorites: clearFavorites,
    }

  return (
      <>
        <FavoritesContext.Provider value={favoritesContext}>
            {props.children}
        </FavoritesContext.Provider>
      </>
  )
}

export default FavoritesProvider;