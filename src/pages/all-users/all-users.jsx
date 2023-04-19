import styles from "./all-users.module.scss";
import { useEffect, useState } from "react";
import { fetchAllUsers } from "../../api/users";

function AllUsersPage() {
  const [users, setUsers] = useState([]);
  async function handleFetchUsers() {
    try {
      const response = await fetchAllUsers();
      console.log({ response });
      if (response.data.status === "success") {
        setUsers(response.data.users);
      }
    } catch (error) {
      console.log({ error });
    }
  }

  useEffect(() => {
    handleFetchUsers();
  }, []);
  return (
    <section className={styles.allUsersPage}>
      <h2 className="__sectionTitle">All Users</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Date</th>
            <th>verification state</th>
            <th>subscription</th>
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
    </section>
  );
}

export default AllUsersPage;
