import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../actions/userAction";

const initialUser = {
  userInfo: null,
  loading: false,
  error: null,
};

// const userReducer = (state = initialUser, action) => {
//   switch (action.type) {
//     case "USER_LOGIN_REQUEST":
//       return { ...state, loading: true };
//     case "USER_LOGIN_SUCCESS":
//       return { ...state, loading: false, userInfo: action.payload };
//     case "USER_LOGIN_FAILURE":
//       return { ...state, loading: false, error: action.payload };

//     case "USER_LOGOUT":
//       return { ...state, userInfo: null };
//     default:
//       return state;
//   }
// };

const userSlice = createSlice({
  name: "user",
  initialState: initialUser,
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
