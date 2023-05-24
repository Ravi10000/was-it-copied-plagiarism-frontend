import { useEffect, useState } from "react";
import styles from "./usage-history.module.scss";
import { getCredits, getUsageHistory } from "../../api/scan";
import { setFlash } from "../../redux/flash/flash.actions";
import { connect } from "react-redux";

function UsageHistoryPage({ setFlash }) {
  const [credits, setCredits] = useState(null);
  const [errorFetchingHistory, setErrorFetchingHistory] = useState(false);
  const [usageHistory, setUsageHistory] = useState([]);
  // const [usageHistory, setUsageHistory] = useState([
  //   ["Time", "ScanID", "Pages"],
  //   ["23-05-2023", "646c66bbd961ec82aca3d382", "1"],
  //   ["23-05-2023", "646c9c86ce5d74f17100d17d", "1"],
  //   ["23-05-2023", "646ca5bc3e3f71333903f072", "1"],
  //   ["23-05-2023", "646ca6503e3f71333903f083", "3"],
  //   ["23-05-2023", "646ca79d40f5b7f909283cc0", "3"],
  //   ["23-05-2023", "646ca85840f5b7f909283ce7", "1"],
  //   ["23-05-2023", "646cab9e77f7ddc787a5c5f3", "1"],
  // ]);
  console.log({ usageHistory });

  async function handleGetUsageHistory() {
    try {
      const historyResponse = await getUsageHistory({
        startDate: "01-05-2023",
        endDate: "23-05-2023",
      });
      console.log({ historyResponse });
      setUsageHistory(historyResponse?.data?.usageHistory);
    } catch (err) {
      console.error(err.message);
      setCredits(0);
      setErrorFetchingHistory(
        "Error while fetching usage hisotry, too many requests, only 12 calls allowed per 15 minutes"
      );
      // setFlash({
      //   type: "error",
      //   message: "Too many requests, only 12 calls allowed per 15 minutes",
      // });
    }
  }
  async function handleFetchCredits() {
    try {
      const creditsResponse = await getCredits();
      console.log({ creditsResponse });
      if (creditsResponse.data.status === "success")
        setCredits(creditsResponse.data.credits);
    } catch (err) {
      console.error(err.message);
      setFlash({
        type: "error",
        message:
          "Error while fetching credits too many requests, only 12 calls allowed per 15 minutes",
      });
    }
  }

  useEffect(() => {
    handleGetUsageHistory();
    handleFetchCredits();
  }, []);
  return (
    <section className={styles.usageHistoryPage}>
      <div className={styles.head}>
        <h1>Usage History</h1>
        <div className={styles.credits}>
          <div className={styles.container}>
            <img src="/coin.png" alt="" />
            {credits === null ? (
              <div className="__loader"></div>
            ) : (
              <h3>{credits ? credits : 0}</h3>
            )}
            <p>Credits</p>
          </div>
        </div>
      </div>
      {errorFetchingHistory ? (
        <div className={styles.errorMessage}>{errorFetchingHistory}</div>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              {usageHistory[0]?.map((heading, idx) => (
                <th key={idx}>{heading}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {usageHistory?.map((row, idx) => {
              if (idx === 0) return <></>;
              return (
                <tr>
                  {row?.map((cell, idx) => (
                    <td>{cell}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default connect(null, { setFlash })(UsageHistoryPage);
