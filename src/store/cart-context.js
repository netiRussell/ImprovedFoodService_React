import React from "react";

const CartContext = React.createContext({
  cartItems: [],
  isShown: false,
  allItems: [],
  setAllItems: () => {},
  orderStatus: false,
  setOrderStatus: () => {},
});

export default CartContext;
