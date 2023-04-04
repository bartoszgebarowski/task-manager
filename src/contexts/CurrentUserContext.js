import { createContext, useContext, useEffect, useState } from "react";
import { getUserDetailsFrontToken } from "../utils/utils";
export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();
export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const handleMount = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      if (token) {
        setCurrentUser(getUserDetailsFrontToken(token));
      }
    } catch (err) {}
  };

  /* Add event to local storage and set current to
  null if there is no key in local storage */
  const handleLocalStorage = async () => {
    try {
      window.addEventListener("storage", () => {
        const userToken = localStorage.getItem("token");
        if (!userToken) {
          setCurrentUser(null);
        }
      });
    } catch (err) {}
  };

  useEffect(() => {
    handleLocalStorage();
    handleMount();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
