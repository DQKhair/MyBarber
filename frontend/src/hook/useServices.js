import { useState,useEffect } from "react";
import { fetchServices } from "../services/serviceServices";

const useServices = ()=>{
    const [services,setServices] = useState([]);
    const [selectedService,setSelectedService] = useState(null);

    useEffect(()=>{
        const loadServices = async ()=>{
            const data = await fetchServices();
            setServices(data);
        }
        loadServices();
    },[]);

    const selectService = (serviceID) =>{
        const service = services.find((s) => s.Service_ID === serviceID);
        setSelectedService(service);
    };
    return {
        services,
        selectedService,
        selectService
    }
}

export default useServices;