import styles from "./list-admins.module.scss";
import { useEffect, useState } from "react";
import { fetchAllAdmins, createUser } from "../../api/users";
import CreateUser from "../../components/create-user/create-user";
import AdminRecord from "./admin-record/admin-record";

function ListAdminsPage() {
  const [users, setUsers] = useState([]);

  async function handleFetchUsers() {
    try {
      const response = await fetchAllAdmins();
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
    <section className={styles.allAdminsPage}>
      <div className={styles.head}>
        <h2 className="__sectionTitle">All Admins</h2>
        <CreateUser
          title="Create New Admin"
          usertype="admin"
          handleFetch={handleFetchUsers}
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
        {users?.map((user) => {
          return (
            <AdminRecord
              key={user?._id}
              user={user}
              handleFetchUsers={handleFetchUsers}
            />
          );
        })}
      </div>
    </section>
  );
}

export default ListAdminsPage;
