import styles from "./ItemsList.module.css";
import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";

import SingleItem from "./SingleItem/Content/SingleItem";

function ItemsList({ fetchingError }) {
  const ctx = useContext(CartContext);
  const [showSection, setShowSection] = useState(false);

  useEffect(() => {
    setShowSection(true);
  }, []);

  return (
    <section className={`container ${styles.w_container} ${showSection ? styles.show_w_container : ""}`}>
      {fetchingError ? (
        <p className={styles.error}>{fetchingError}</p>
      ) : (
        <ul className={styles.container}>
          {ctx.allItems.map((value) => {
            return <SingleItem id={value.id} key={value.id} status={value.status} productName={value.name} description={value.description} price={value.price} amount={value.amount} />;
          })}
        </ul>
      )}
    </section>
  );
}

export default ItemsList;
