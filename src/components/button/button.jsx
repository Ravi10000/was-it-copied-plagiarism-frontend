import styles from "./button.module.scss";

function Button({
  children,
  primary,
  outlined,
  secondary,
  lg,
  color,
  bg,
  ...props
}) {
  return (
    <button
      className={`${styles.customButton} ${primary && styles.primary} ${
        outlined && styles.outlined
      } ${secondary && styles.secondary} ${lg && styles.lg}`}
      style={{ backgroundColor: color ? color : "" }}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
