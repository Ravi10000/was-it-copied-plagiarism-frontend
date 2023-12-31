import styles from "./account-sidebar.module.scss";
import { useNavigate } from "react-router-dom";

const options = [
  {
    name: "account",
    icon: "/profile-icons/user.png",
    iconDark: "/profile-icons/user-dark.png",
  },
  {
    name: "subscription",
    icon: "/profile-icons/subscription.png",
    iconDark: "/profile-icons/subscription-dark.png",
  },
  {
    name: "sign out",
    icon: "/profile-icons/sign-out.png",
    iconDark: "/profile-icons/sign-out-dark.png",
  },
];

function AccountSidebar({ selectedOption, setSelectedOption }) {
  const navigate = useNavigate();
  return (
    <section className={styles.accountSidebar}>
      <div className={styles.accountOptionsContainer}>
        {options?.map((option) => (
          <div
            key={option.name}
            className={`${styles.item} ${
              selectedOption === option.name && styles.selected
            }`}
            onClick={() => {
              if (option.name === "subscription") navigate("/pricing");
              setSelectedOption(option.name);
            }}
          >
            <img
              src={
                selectedOption === option.name ? option.iconDark : option.icon
              }
              alt={option.name}
            />
            <p>{option.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AccountSidebar;
