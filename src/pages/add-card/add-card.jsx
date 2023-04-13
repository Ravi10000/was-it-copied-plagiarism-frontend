import styles from "./add-card.module.scss";

function AddCardPage() {
  return (
    <section className={styles.addCardPage}>
      <h2 className={styles.heading}>Payment Methods</h2>
      <div className={styles.cardsContainer}>
        <div className={styles.addCard}>
          <img src="/account/card-dark.png" alt="card" />
          <p>Add New Card</p>
        </div>
      </div>
    </section>
  );
}

export default AddCardPage;
