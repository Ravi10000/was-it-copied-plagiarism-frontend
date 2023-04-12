import styles from "./nav-item.module.scss";

function NavItem({ name, info, imgUrl, link }) {
  return (
    <div className={styles.navItem}>
      <img className={styles.navIcon} src={imgUrl} alt="" />
      <div className={styles.navItemDetails}>
        <p className={styles.name}>{name}</p>
        <p className={styles.info}>{info}</p>
      </div>
    </div>
  );
}

export default NavItem;
