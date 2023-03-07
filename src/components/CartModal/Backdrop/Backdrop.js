import styles from "./Backdrop.module.css";

function Backdrop({ cartStateDispatch }) {
  return (
    <div
      className={styles.backdrop}
      onClick={() => {
        cartStateDispatch({ type: "CART_TOGGLE" });
      }}
    ></div>
  );
}

export default Backdrop;
