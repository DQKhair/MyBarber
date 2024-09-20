import axiosRoot from "../config/axiosConfig";

export const resetPassword = async (user) => {
    const response = await axiosRoot.post(`/api/Authentication/Forgot_Password`,user);
}

