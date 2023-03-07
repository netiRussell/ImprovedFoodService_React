import styles from "./AboutUs.module.css";

function AboutUs() {
  return (
    <section className="container">
      <h1 className={styles.title}>Great food for a great price!</h1>
      <hr className={`line ${styles.line}`} />
      <h3 className={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed imperdiet, odio in gravida auctor, leo justo commodo dui, ultrices tincidunt quam leo a nulla. Praesent quis posuere risus. Nam a mi imperdiet diam dignissim vehicula at non nunc.
        Etiam sollicitudin efficitur massa ut lacinia. Vivamus ante nisl, varius vel hendrerit nec, auctor ac metus. Sed eu iaculis turpis. Aliquam arcu enim, eleifend sed gravida sed, lacinia quis libero.{" "}
      </h3>
    </section>
  );
}

export default AboutUs;
