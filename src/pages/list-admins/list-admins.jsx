import styles from "./list-admins.module.scss";
import { useEffect, useState } from "react";
import { fetchAllAdmins, createUser } from "../../api/users";
import CreateUser from "../../components/create-user/create-user";
import AdminRecord from "./admin-record/admin-record";

function ListAdminsPage() {
  const [admins, setAdmins] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const [adminsCount, setAdminsCount] = useState(0);

  async function handleFetchAdmins() {
    try {
      const response = await fetchAllAdmins();
      console.log({ response });
      if (response.data.status === "success") {
        setAdmins(response.data.admins);
        setAdminsCount(response.data.adminsCount);
      }
    } catch (error) {
      console.log({ error });
    }
  }
  async function handleFetchPrevAdmins() {
    if (skip === 0) return;
    try {
      const res = await fetchAllAdmins(skip - limit, limit);
      if (res.data.status === "success") {
        setSkip(skip + limit);
        setUsers(res.data.admins);
      }
    } catch (err) {
      console.log({ err });
    }
  }

  async function handleFetchMoreAdmins() {
    if (skip + limit >= adminsCount) return;

    const res = await fetchAllAdmins(skip + limit, limit);
    if (res.data.status === "success") {
      setSkip(skip + limit);
      setUsers(res.data.admins);
    }
  }

  useEffect(() => {
    handleFetchAdmins();
  }, []);
  return (
    <section className={styles.allAdminsPage}>
      <div className={styles.head}>
        <h2 className="__sectionTitle">All Admins</h2>
        <CreateUser
          title="Create New Admin"
          usertype="admin"
          handleFetch={handleFetchAdmins}
        />
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Registration Date</th>
            <th>Manage</th>
          </tr>
        </thead>

        {/* <tbody>
          {users?.map((user) => {
            return <AdminRecord key={user?._id} user={user} />;
          })}
        </tbody> */}
      </table>
      <div className={styles.data}>
        {admins?.map((user) => {
          return (
            <AdminRecord
              key={user?._id}
              user={user}
              handleFetchUsers={handleFetchAdmins}
            />
          );
        })}
      </div>
      <div className="__bottom-bar">
        <div className="__rowsCount">
          <p>rows per page</p>
          <p>10</p>
        </div>
        <div className="__pagination">
          <p>
            {skip + 1}-{skip + admins.length} of {adminsCount}
          </p>
          <div className="__controls">
            <img
              className="__prev"
              src="/left.png"
              alt=""
              onClick={handleFetchPrevAdmins}
            />
            <img
              className="__next"
              src="/left.png"
              alt=""
              onClick={handleFetchMoreAdmins}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ListAdminsPage;
