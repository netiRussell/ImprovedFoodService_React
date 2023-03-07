import { useContext, useEffect, useState } from "react";
import CartContext from "../../../store/cart-context";
import styles from "./Cart.module.css";

function Cart() {
  const ctx = useContext(CartContext);
  const [buttonAddBump, setButtonAddBump] = useState(false);

  useEffect(() => {
    if (ctx?.cartItems.length > 0) {
      setButtonAddBump(true);

      setTimeout(() => {
        setButtonAddBump(false);
      }, 300);
    }
  }, [ctx?.cartItems.length]);

  return (
    <button
      className={`button ${styles.button} ${buttonAddBump ? styles.bump : ""}`}
      onClick={() => {
        ctx.cartStateDispatch({ type: "CART_TOGGLE" });
      }}
    >
      <i className="fas fa-store"></i> Your cart ({ctx.cartItems.length})
    </button>
  );
}

export default Cart;
