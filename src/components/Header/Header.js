import Cart from "./Cart/Cart";
import styles from "./Header.module.css";

function Header() {
  return (
    <div className={styles.header}>
      <p className={styles.title}>SomeFoodPlace</p>
      <Cart />
    </div>
  );
}

export default Header;
