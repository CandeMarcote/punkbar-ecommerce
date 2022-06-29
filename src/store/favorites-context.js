import React from "react";

const FavoritesContext = React.createContext({
    items:[],
    amount: 0,
    toggleItem: (item) => {},
    clearFavorites: () => {},
})

export default FavoritesContext;