import axios from "axios";

export const fetchServices = async ()=>{
    try
    {
        const response = await axios.get("/data/services.json");
        return response.data;
    }catch(error)
    {
        console.error("Failed to fetch services:", error);
        return [];
    }
}