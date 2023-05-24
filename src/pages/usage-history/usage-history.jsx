import { useEffect, useState } from "react";
import styles from "./usage-history.module.scss";
import { getCredits, getUsageHistory } from "../../api/scan";
import { setFlash } from "../../redux/flash/flash.actions";
import { connect } from "react-redux";
import DatePicker from "../../components/date-picker/date-picker";
import Button from "../../components/button/button";
import { useForm } from "react-hook-form";

function UsageHistoryPage({ setFlash }) {
  const [credits, setCredits] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

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
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  console.log({ usageHistory });

  async function handleGetUsageHistory({ startDate, endDate }) {
    setIsFetching(true);
    try {
      // const historyResponse = await getUsageHistory({
      //   startDate: "01-05-2023",
      //   endDate: "23-05-2023",
      // });
      console.log("fetch history", { startDate, endDate });
      const historyResponse = await getUsageHistory({
        startDate,
        endDate,
      });
      console.log({ historyResponse });
      setUsageHistory(historyResponse?.data?.usageHistory);
    } catch (err) {
      console.error(err.message);
      setCredits(0);
      setErrorFetchingHistory(
        "Error while fetching usage hisotry, too many requests, only 10 calls allowed per 15 minutes"
      );
    } finally {
      setIsFetching(false);
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

  async function handleSetHistoryDateRange(data) {
    let { startDate, endDate } = data;
    startDate = startDate.split("-");
    let temp = startDate[0];
    startDate[0] = startDate[2];
    startDate[2] = temp;
    startDate = startDate.join("-");
    console.log({ startDate });

    endDate = endDate.split("-");
    temp = endDate[0];
    endDate[0] = endDate[2];
    endDate[2] = temp;
    endDate = endDate.join("-");
    console.log({ endDate });

    let startDateValue = new Date(data.startDate).valueOf();
    let endDateValue = new Date(data.endDate).valueOf();

    console.log({ startDateValue, endDateValue });
    if (startDateValue > endDateValue) {
      return setFlash({
        type: "error",
        message: `Invalid date range from: ${data.startDate}, to: ${data.endDate}`,
      });
    }

    await handleGetUsageHistory({ startDate, endDate });
  }

  useEffect(() => {
    let startDate = new Date();
    let endDate = new Date(startDate);
    endDate = endDate.toLocaleDateString().split("/");
    let temp = endDate[0];
    endDate[0] = endDate[1];
    endDate[1] = temp;
    endDate = endDate.join("-");

    startDate.setDate(startDate.getDate() - 30);
    startDate = startDate.toLocaleDateString().split("/");
    temp = startDate[0];
    startDate[0] = startDate[1];
    startDate[1] = temp;
    startDate = startDate.join("-");

    console.log({ startDate: endDate, endDate: startDate });
    handleGetUsageHistory({ startDate, endDate });
    handleFetchCredits();
  }, []);
  console.log({ errors });
  return (
    <section className={styles.usageHistoryPage}>
      <div className={styles.head}>
        <div className={styles.titleDate}>
          <h1>Usage History</h1>
          <h4 className={styles.formTitle}>Select Date Range: </h4>
          <form
            className={styles.dateForm}
            onSubmit={handleSubmit(handleSetHistoryDateRange)}
          >
            <div className={styles.inputs}>
              <DatePicker
                label="From"
                // name="startDate"
                error={errors?.startDate?.message}
                register={{
                  ...register("startDate", { required: "required" }),
                }}
              />
              <div className={styles.line}></div>
              <DatePicker
                label="To"
                name="endDate"
                error={errors?.endDate?.message}
                register={{ ...register("endDate", { required: "required" }) }}
              />
            </div>
            <button className={styles.getButton}>
              <img src="/page-icons/history.png" alt="" />
              <p>Get Usage History</p>
            </button>
          </form>
        </div>
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
      {isFetching ? (
        <div className={styles.loaderContainer}>
          <div className={styles.loader}></div>
        </div>
      ) : errorFetchingHistory ? (
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
