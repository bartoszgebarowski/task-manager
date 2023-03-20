import jwt_decode from "jwt-decode";

let getUserDetailsFrontToken = (token) => {
  const decodedToken = jwt_decode(token.access);

  const user = {
    username: decodedToken.username,
    email: decodedToken.email,
    id: decodedToken.user_id,
  };
  return user;
};

export default getUserDetailsFrontToken;