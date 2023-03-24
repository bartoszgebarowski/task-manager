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

export const truncateChars = (str, isDate) => {
  if (str && isDate) {
    return str.substring(0, 10);
  } else if (str) {
    return str.length > 7 ? str.substring(0, 7) + "..." : str;
  } else {
    return "-";
  }
};
