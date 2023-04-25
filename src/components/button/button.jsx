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
  danger,
  isLoading,
  noFit,
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
      ${danger && styles.danger}
      `}
      disabled={isLoading}
      style={{
        backgroundColor: color ? color : "",
        width: !noFit ? "fit-content" : "100%",
      }}
      {...props}
    >
      {children}
      {isLoading && <div className={styles.loader}></div>}
    </button>
  );
}

export default Button;
