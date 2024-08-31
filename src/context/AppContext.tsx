import { createContext, useContext } from "react";

export const AppContext = createContext({});

export const AppWrapper = ({ children }: { children: JSX.Element }) => {
  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};

export function useAppContext() {
  return useContext(AppContext);
}

export default AppContext;
