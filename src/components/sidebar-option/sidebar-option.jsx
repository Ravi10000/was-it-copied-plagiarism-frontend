import styles from "./sidebar-option.module.scss";

function SidebarOption({ selected, icon, ...props }) {
  return (
    <div
      className={`${styles.optionItem} ${selected && styles.selected}`}
      {...props}
    >
      <img src={icon} />
    </div>
  );
}

export default SidebarOption;
