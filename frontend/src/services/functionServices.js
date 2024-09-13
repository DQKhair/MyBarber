import DecodeToken from "../utils/DecodeToken";
import axiosRoot from "../config/axiosConfig";

export const fetchFunctions = async () =>{
    try
    {
        const accessToken = localStorage.getItem("accessToken");
        const decoded = DecodeToken(accessToken);
        const response = await axiosRoot.get(`/api/FunctionsUser/${decoded.Role_ID}`);
        return response.data;
    }catch(error)
    {
        console.error("Failed to fetch functions:", error);
        return [];
    }
}