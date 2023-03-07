import AddForm from "../AddForm/AddForm";
import styles from "./SingleItem.module.css";

function SingleItem({ id, status, productName, description, price, amount }) {
  return (
    <li className={styles.container}>
      <div className="item_info">
        <p className="name">{productName}</p>
        <em>{description}</em>
        <p className="price">${price.toFixed(2)}</p>
      </div>
      {status === "default" ? (
        <AddForm id={id} defaultAmount={amount} />
      ) : (
        <p>
          Added <span className="fa-solid fa-square-check"></span>
        </p>
      )}
    </li>
  );
}

export default SingleItem;
