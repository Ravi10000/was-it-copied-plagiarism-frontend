import { createContext, useState, useContext } from "react";

export const SelectedPageContext = createContext();

export default function SelectedPageProvider({ children }) {
  const [selectedPage, setSelectedPage] = useState("search");
  return (
    <SelectedPageContext.Provider
      value={{
        selectedPage,
        setSelectedPage,
      }}
    >
      {children}
    </SelectedPageContext.Provider>
  );
}

export const useSelectedPage = () => useContext(SelectedPageContext);
