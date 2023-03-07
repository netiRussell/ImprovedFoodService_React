import styles from "./SingleItem.module.css";
import { useState, useEffect } from "react";

function SingleItem({ id, name, price, defaultAmount, cartStateDispatch, setAllItems }) {
  const [amountState, setAmountState] = useState(defaultAmount);

  const removeItem = function () {
    setAllItems((prevValue) => {
      return prevValue.map((value) => {
        if (value.id === id) {
          value.status = "default";
        }
        return value;
      });
    });

    cartStateDispatch({ type: "REMOVE_ITEM", id: id });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      cartStateDispatch({ type: "CHANGE_QUANTITY", id: id, amount: amountState });
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [amountState, cartStateDispatch, id]);

  return (
    <div className={styles.container}>
      <div className="item_info">
        <p className="name">{name}</p>
        <p className="price">
          ${price.toFixed(2)} (${(price * amountState).toFixed(2)})
        </p>
      </div>
      <div className={`item_info ${styles.container_buttons}`}>
        <input
          className={styles.input_number}
          type="number"
          min="1"
          max="10"
          value={amountState}
          onChange={(event) => {
            setAmountState(event.target.value);
          }}
        />
        <button type="button" className={`button ${styles.button}`} onClick={removeItem}>
          <i className="fa-solid fa-trash-can"></i>
        </button>
      </div>
    </div>
  );
}

export default SingleItem;
