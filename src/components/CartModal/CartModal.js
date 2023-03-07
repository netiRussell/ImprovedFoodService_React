import React, { useContext, useState } from "react";
import styles from "./CartModal.module.css";
import CartContext from "../../store/cart-context";

import SingleItem from "./SingleItem/SingleItem";
import Backdrop from "./Backdrop/Backdrop";
import ConfirmWindow from "./ConfirmWindow/CofirmWindow";

function CartModal() {
  const ctx = useContext(CartContext);
  const [confirmIsOpen, setConfirmIsOpen] = useState(false);

  let totalAmount = 0;

  const shiftModal = function (event) {
    event.preventDefault();
    console.log(totalAmount > 0);
    setConfirmIsOpen(true);
  };

  return (
    <React.Fragment>
      <form className={`${styles.modal} ${confirmIsOpen ? styles.modal_shifted : ""}`} onSubmit={shiftModal}>
        {ctx.cartItems.length > 0 ? (
          ctx.cartItems.map((value) => {
            totalAmount += value.price * value.amount;
            return <SingleItem key={value.id} id={value.id} name={value.name} price={value.price} defaultAmount={value.amount} cartStateDispatch={ctx.cartStateDispatch} setAllItems={ctx.setAllItems} />;
          })
        ) : (
          <p>Nothing is added to the cart yet</p>
        )}

        <div className={styles.container_order}>
          <hr className={`line ${styles.line}`} />
          <div className={styles.container_amount}>
            <p>Total amount: </p> <span>${totalAmount.toFixed(2)}</span>
          </div>
          <button className={`button ${styles.button} ${styles.submit}`} type="submit" disabled={!(totalAmount > 0)}>
            Order
          </button>
          <button
            className={`button ${styles.button} ${styles.close}`}
            type="button"
            onClick={() => {
              ctx.cartStateDispatch({ type: "CART_TOGGLE" });
            }}
          >
            Close
          </button>
        </div>
      </form>

      {confirmIsOpen && <ConfirmWindow setConfirmIsOpen={setConfirmIsOpen} cartItems={ctx.cartItems} totalAmount={totalAmount} />}
      <Backdrop cartStateDispatch={ctx.cartStateDispatch}></Backdrop>
    </React.Fragment>
  );
}

export default CartModal;
