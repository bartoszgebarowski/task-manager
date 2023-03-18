import { createContext, useContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

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
        const decodedToken = jwt_decode(token.access);
        const user = {
          username: decodedToken.username,
          email: decodedToken.email,
        };
        setCurrentUser(user);
      }
    } catch (err) {}
  };

  useEffect(() => {
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
