import styles from "./payment-details.module.scss";

function PaymentDetailsPage() {
  return (
    <section className={styles.detailsPage}>
      <h2 className="__sectionTitle">Payment Details</h2>
      {/* <input
        type="search"
        className={styles.search}
        placeholder="Search For Analysis"
      /> */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Transaction Id</th>
            <th>Username</th>
            <th>Email</th>
            <th>Subscription Package</th>
            <th>Amount (Rs)</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>64391ec47c815dbddb3683c5</td>
            <td>Ravi Sharma</td>
            <td>ravi@gmail.com</td>
            <td>Enterprise Plan</td>
            <td>1299</td>
            <td className={styles.success}>Success</td>
          </tr>
          {Array(10)
            .fill()
            .map((_, index) => (
              <tr key={index}>
                <td>64391ec47c815dbddb3683c5</td>
                <td>Ravi Sharma</td>
                <td>ravi@gmail.com</td>
                <td>Enterprise Plan</td>
                <td>1299</td>
                <td className={styles.success}>Success</td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
}

export default PaymentDetailsPage;
