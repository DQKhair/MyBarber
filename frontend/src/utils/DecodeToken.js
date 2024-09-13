import { jwtDecode } from "jwt-decode";

const DecodeToken = () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const decoded = jwtDecode(accessToken);
    return decoded;
  } catch (err) {
    console.error("Error decode access token", err);
    return null;
  }
};

export default DecodeToken;
