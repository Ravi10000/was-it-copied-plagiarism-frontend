import { useEffect, useState } from "react";
import styles from "./usage-history.module.scss";
import { getUsageHistory } from "../../api/scan";

function UsageHistoryPage() {
  const [usageHistory, setUsageHistory] = useState([
    ["Time", "ScanID", "Pages"],
    ["23-05-2023", "646c66bbd961ec82aca3d382", "1"],
    ["23-05-2023", "646c9c86ce5d74f17100d17d", "1"],
    ["23-05-2023", "646ca5bc3e3f71333903f072", "1"],
    ["23-05-2023", "646ca6503e3f71333903f083", "3"],
    ["23-05-2023", "646ca79d40f5b7f909283cc0", "3"],
    ["23-05-2023", "646ca85840f5b7f909283ce7", "1"],
    ["23-05-2023", "646cab9e77f7ddc787a5c5f3", "1"],
  ]);
  console.log({ usageHistory });

  //   async function handleGetUsageHistory() {
  //     try {
  //       const res = await getUsageHistory({
  //         startDate: "01-05-2023",
  //         endDate: "23-05-2023",
  //       });
  //       console.log({ res });
  //       setUsageHistory(res?.data?.usageHistory);
  //     } catch (err) {
  //       console.log({ err });
  //     }
  //   }
  //   useEffect(() => {
  //     handleGetUsageHistory();
  //   }, []);
  return (
    <section className={styles.usageHistoryPage}>
      <h1>Usage History</h1>
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
    </section>
  );
}

export default UsageHistoryPage;
