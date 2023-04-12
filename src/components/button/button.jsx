import styles from "./button.module.scss";

function Button({ children, primary, lg, color, ...props }) {
  return (
    <button
      className={`${styles.customButton} ${primary && styles.primary} ${
        lg && styles.lg
      }`}
      style={{ backgroundColor: color ? color : "" }}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
