import React from "react";

const CartContext = React.createContext({
    items: [],
    totalAmount: 0,
    userId: -1,
    addItem: (item) => {},
    removeItem: (id) => {}, 
    removeAllUnits: (id) => {},
    clearCart: () => {},
});

export default CartContext;