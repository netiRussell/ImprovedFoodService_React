import styles from "./AddForm.module.css";

import { useContext, useState, useEffect } from "react";
import CartContext from "../../../../store/cart-context";

function AddForm({ id, defaultAmount }) {
  const ctx = useContext(CartContext);
  const [amountState, setAmountState] = useState(defaultAmount);
  const [isValid, setIsValid] = useState(true);

  const checkValidity = function (value) {
    return !isNaN(parseFloat(value));
  };

  const addToCart = function (event) {
    event.preventDefault();
    const amount = amountState;

    // Two problems:
    // 1 - debouncing is not working
    if (checkValidity(amount)) {
      ctx.setAllItems((prevValue) =>
        prevValue.map((value) => {
          if (value.id === id) {
            value.status = "cart";
            const newValue = value;
            newValue.amount = amount;
            ctx.cartStateDispatch({ type: "ADD_TO_CART", item: newValue });
          }

          return value;
        })
      );
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      checkValidity(amountState) ? setIsValid(true) : setIsValid(false);
    }, 250);

    return () => {
      clearTimeout(timeout);
    };
  }, [amountState]);

  return (
    <form className={styles.container}>
      <div className={styles.amount}>
        <label htmlFor={id}>Amount: </label>
        <input
          className={`${styles.input_text} ${isValid ? "" : "invalid_input"}`}
          id={id}
          type="number"
          min="1"
          max="10"
          value={amountState}
          onChange={(event) => {
            setAmountState(event.target.value);
          }}
        />
      </div>

      <button className={`button ${styles.submit}`} type="submit" onClick={addToCart}>
        <i className={`fa-solid fa-cart-plus ${styles.icon}`}></i> Add
      </button>
    </form>
  );
}

export default AddForm;
