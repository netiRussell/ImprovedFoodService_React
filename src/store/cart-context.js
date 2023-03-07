import React from "react";

const CartContext = React.createContext({
  cartItems: [],
  isShown: false,
  allItems: [],
  setAllItems: () => {},
});

export default CartContext;
