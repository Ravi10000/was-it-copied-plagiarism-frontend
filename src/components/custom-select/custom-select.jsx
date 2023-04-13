import styles from "./custom-select.module.scss";
import { useState, useEffect } from "react";

export default function CustomSelect({
  categories,
  selectedCategory,
  setSelectedCategory,
  label,
  defaultValue,
}) {
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    console.log({ defaultValue, categories });
    if (defaultValue) {
      const defaultCategory = categories.filter((category) => {
        console.log({ category });
        return category._id === defaultValue;
      });
      console.log({ defaultCategory });
      setSelectedCategory(defaultCategory[0]);
    }
  }, [categories]);
  return (
    <div className={styles["custom-select"]}>
      {!selectedCategory ? (
        <div
          className={styles["selector"]}
          onClick={() => {
            setShowOptions((prevState) => !prevState);
          }}
        >
          <p>{label}</p>
          <img src="/arrow-down.png" alt="select" />
        </div>
      ) : (
        <div
          className={styles["selected-option"]}
          onClick={() => {
            setShowOptions((prevState) => !prevState);
          }}
        >
          <div>
            <img
              src={`${import.meta.env.VITE_REACT_APP_API_URL}/${
                selectedCategory.icon
              }`}
              alt={selectedCategory.name}
            />
            <p>{selectedCategory.name}</p>
          </div>
          <img src="/arrow-down.png" alt="select" />
        </div>
      )}
      {showOptions && (
        <div className={styles["options"]}>
          {categories?.map((category) => {
            return (
              <div
                className={styles["option"]}
                key={category.name}
                onClick={() => {
                  setSelectedCategory(category);
                  setShowOptions(false);
                }}
              >
                <img
                  src={`${import.meta.env.VITE_REACT_APP_API_URL}/${
                    category.icon
                  }`}
                  alt={category.name}
                />
                <p>{category.name}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
