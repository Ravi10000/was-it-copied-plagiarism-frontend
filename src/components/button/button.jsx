import styles from "./button.module.scss";

function Button({
  children,
  primary,
  outlined,
  secondary,
  gradient,
  lg,
  color,
  bg,
  isLoading,
  ...props
}) {
  return (
    <button
      className={`${styles.customButton} 
      ${primary && styles.primary} 
      ${outlined && styles.outlined} 
      ${secondary && styles.secondary} 
      ${lg && styles.lg} 
      ${gradient && styles.gradient}
      ${isLoading && styles.isLoading}
      `}
      disabled={isLoading}
      style={{ backgroundColor: color ? color : "" }}
      {...props}
    >
      {children}
      {isLoading && <div className={styles.loader}></div>}
    </button>
  );
}

export default Button;
