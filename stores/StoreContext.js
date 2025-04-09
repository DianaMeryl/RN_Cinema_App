import React from "react";
import { favoritesStore } from "./favoritesStore";

export const StoreContext = React.createContext({
  favoritesStore,
});

export const StoreProvider = ({ children }) => {
  return (
    <StoreContext.Provider value={{ favoritesStore }}>
      {children}
    </StoreContext.Provider>
  );
};
