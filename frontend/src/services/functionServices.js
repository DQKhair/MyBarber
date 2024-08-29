import axios from "axios";
import { API_URL } from "../constants/constants"

export const fetchFunctions = async () =>{
    try
    {
        const response = await axios.get(`${API_URL}/functions.json`);
        return response.data;
    }catch(error)
    {
        console.error("Failed to fetch functions:", error);
        return [];
    }
}