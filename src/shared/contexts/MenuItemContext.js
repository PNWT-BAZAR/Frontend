import React, { createContext, useState, useContext } from "react";

const MenuItemContext = createContext();

export const MenuItemContextProvider = ({ children }) => {
  const [data, setData] = useState({});
  const setValues = (values) => {
    setData((previousData) => ({
      ...previousData,
      ...values,
    }));
  };

  return (
    <MenuItemContext.Provider value={{ data, setValues }}>
      {children}
    </MenuItemContext.Provider>
  );
};

export const useData = () => useContext(MenuItemContext);
