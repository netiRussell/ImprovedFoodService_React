import React, { useReducer, useState, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import CartContext from "./store/cart-context";

import Header from "./components/Header/Header";
import AboutUs from "./components/AboutUs/AboutUs";
import ItemsList from "./components/ItemsList/ItemsList";
import Footer from "./components/Footer/Footer";
import CartModal from "./components/CartModal/CartModal";

const cartReducer = function (prevValue, dispatchedValue) {
  switch (dispatchedValue.type) {
    case "CART_TOGGLE":
      return { cartItems: prevValue.cartItems, isShown: !prevValue.isShown };
    case "ADD_TO_CART":
      return { cartItems: [...prevValue.cartItems, dispatchedValue.item], isShown: prevValue.isShown };
    case "REMOVE_ITEM":
      return {
        cartItems: prevValue.cartItems.filter((value) => value.id !== dispatchedValue.id),
        isShown: prevValue.isShown,
      };
    case "CHANGE_QUANTITY":
      return {
        cartItems: prevValue.cartItems.map((value) => {
          if (value.id === dispatchedValue.id) {
            value.amount = dispatchedValue.amount;
          }

          return value;
        }),
        isShown: prevValue.isShown,
      };
    default:
      return { cartItems: prevValue.cartItems, isShown: prevValue.isShown };
  }
};

function App() {
  /* Logic of this app implies not changing amount of an item in allItems state 
  while changing the amount for cartItems array since items in cart do need to 
  maintain a certain amount. Amount of an item from allItems wouldn't matter if
  the copy of this item is in the cart at the moment */

  const [cartState, cartStateDispatch] = useReducer(cartReducer, { cartItems: [], isShown: false });
  const [allItems, setAllItems] = useState([]);
  const [fetchingError, setFetchingError] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  const fetchData = useCallback(async function () {
    try {
      const request = await fetch("https://foodservice-905ba-default-rtdb.firebaseio.com/meals.json").then((request) => {
        if (!request.ok) throw new Error("There was an error: " + request.status);

        return request.json();
      });
      const data = [];

      for (const element in request) {
        if (element != null) {
          data.push({
            id: element,
            status: "default",
            name: request[element].dishName,
            description: request[element].description,
            price: +request[element].price,
            amount: 1,
          });
        }
      }
      setAllItems(data);
      setLoadingData(false);
    } catch (error) {
      setFetchingError(error.message);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <React.Fragment>
      <CartContext.Provider value={{ cartItems: cartState.cartItems, isShown: cartState.isShown, cartStateDispatch: cartStateDispatch, allItems: allItems, setAllItems: setAllItems }}>
        <Header />
        <AboutUs />
        <ItemsList fetchingError={fetchingError} loadingData={loadingData} />
        <Footer />
        {cartState.isShown && ReactDOM.createPortal(<CartModal />, document.querySelector("body"))}
      </CartContext.Provider>
    </React.Fragment>
  );
}

export default App;
