import React from 'react';

const FavoritesContext = React.createContext({
    items: [],
    toggleItem: (item) => {},
});

export default FavoritesContext;