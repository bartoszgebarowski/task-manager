import jwt_decode from "jwt-decode";

// Enrich user context with additional data
export const getUserDetailsFrontToken = (token) => {
  const decodedToken = jwt_decode(token.access);

  const user = {
    username: decodedToken.username,
    email: decodedToken.email,
    id: decodedToken.user_id,
  };
  return user;
};

// Emulate truncatechars. Returns shorter string depending on arguments passed
export const truncateChars = (str, isDate) => {
  if (str && isDate) {
    return str.substring(0, 10);
  } else if (str) {
    return str.length > 7 ? str.substring(0, 7) + "..." : str;
  } else {
    return "-";
  }
};

// Get checkbox by Id, and depending on its status, set it to checked or not
export const handleCheckbox = async (isStatus) => {
  const checkbox = document.getElementById("completed");
  if (isStatus) {
    checkbox.checked = true;
  } else {
    checkbox.checked = false;
  }
};

// Get checkbox by Id, and reset it to default, not checked state
export const resetCheckbox = async () => {
  const checkbox = document.getElementById("completed");
  checkbox.checked = false;
};
