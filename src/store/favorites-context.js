import React from "react";

const FavoritesContext = React.createContext({
    items:[],
    userId: -1,
    toggleItem: (item) => {},
    clearFavorites: () => {},
})

export default FavoritesContext;