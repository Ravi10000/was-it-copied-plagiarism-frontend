import styles from "./all-users.module.scss";
import { useEffect, useState } from "react";
import { fetchAllUsers } from "../../api/users";
import CreateUser from "../../components/create-user/create-user";

function AllUsersPage() {
  const [users, setUsers] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const [usersCount, setUsersCount] = useState(0);

  async function handleFetchUsers() {
    try {
      const response = await fetchAllUsers();
      console.log({ response });
      if (response.data.status === "success") {
        setUsers(response.data.users);
        setUsersCount(response.data.usersCount);
      }
    } catch (error) {
      console.log({ error });
    }
  }

  async function handleFetchPrevUsers() {
    if (skip === 0) return;
    try {
      const res = await fetchAllUsers(skip - limit, limit);
      if (res.data.status === "success") {
        setSkip(skip + limit);
        setUsers(res.data.users);
      }
    } catch (err) {
      console.log({ err });
    }
  }
  async function handleFetchMoreUsers() {
    if (skip + limit >= usersCount) return;

    const res = await fetchAllUsers(skip + limit, limit);
    if (res.data.status === "success") {
      setSkip(skip + limit);
      setUsers(res.data.users);
    }
  }

  useEffect(() => {
    handleFetchUsers();
  }, []);
  return (
    <section className={styles.allUsersPage}>
      <div className={styles.head}>
        <h2 className="__sectionTitle">All Users</h2>
        {/* <Button secondary onClick={() => setAddPopup(true)}>
          <img src="/add-user-blue.png" alt="" />
          Create New Admin
        </Button> */}
        <CreateUser
          title="Create New User"
          usertype="user"
          handleFetch={handleFetchUsers}
        />
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Registration Date</th>
            <th>Verification State</th>
            <th>School Name</th>
            <th>Subscription</th>
          </tr>
        </thead>

        <tbody>
          {users?.map((user) => {
            const joinedOn = new Date(user?.createdAt).toDateString();
            return (
              <tr key={user?._id}>
                <td>{user?.fname + " " + user?.lname}</td>
                <td>{user?.email}</td>
                <td>{joinedOn}</td>
                <td>{user?.isVerified ? "verified" : "not verified"}</td>
                <td>{user?.schoolName ? user?.schoolName : "unavailable"}</td>
                <td>
                  {user?.currentSubscriptionPlan
                    ? user?.currentSubscriptionPlan?.name
                    : "no plan selected"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="__bottom-bar">
        <div className="__rowsCount">
          <p>rows per page</p>
          <p>10</p>
        </div>
        <div className="__pagination">
          <p>
            {skip + 1}-{skip + users.length} of {usersCount}
          </p>
          <div className="__controls">
            <img
              className="__prev"
              src="/left.png"
              alt=""
              onClick={handleFetchPrevUsers}
            />
            <img
              className="__next"
              src="/left.png"
              alt=""
              onClick={handleFetchMoreUsers}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AllUsersPage;
