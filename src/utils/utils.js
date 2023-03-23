import jwt_decode from "jwt-decode";

export const getUserDetailsFrontToken = (token) => {
  const decodedToken = jwt_decode(token.access);

  const user = {
    username: decodedToken.username,
    email: decodedToken.email,
    id: decodedToken.user_id,
  };
  return user;
};

export const changeCursor = () => {
  document.querySelectorAll(".pointer").forEach((element) => {
    element.style.cursor = "pointer";
  });
};
