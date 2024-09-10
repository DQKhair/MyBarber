import axios from "axios";
import { API_URL } from "../../constants/constants";
import { createAsyncThunk } from "@reduxjs/toolkit";

// const loginUser = (email, password) => async (dispatch) => {
//   dispatch({ type: "USER_LOGIN_REQUEST" });
//   try {
//     const res = await axios.post(`${API_URL}/api/authentication/login`, {
//       email: email,
//       password: password,
//     });
//     const data = await res.data;
//     dispatch({ type: "USER_LOGIN_SUCCESS", payload: data });
//   } catch (error) {
//     dispatch({ type: "USER_LOGIN_FAILURE", payload: error });
//   }
// };

// const logoutUser = () => {
//     return {type: 'USER_LOGOUT'};
// }

// export { loginUser,logoutUser };
const URL = "https://localhost:7012";
const loginUser = createAsyncThunk(
  "user/login",
  async ({ emailUser, passwordUser }, { rejectWithValue }) => {
    try {
      console.log("res")
      const response = await axios.post(`${URL}/api/Authentication/Login?email=${emailUser}&password=${passwordUser}`, { email: emailUser, password: passwordUser });
      return response.data;
    } catch (err) {
      console.error('Login error:', err.response); 
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export { loginUser };
