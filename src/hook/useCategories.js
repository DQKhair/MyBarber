import { useState,useEffect } from "react";
import { fetchCategories } from "../services/categoryServices";

const useCategories = () =>{
    const [categories,setCategories] = useState([]);
    const [selectedCategory,setSelectedCategory] = useState(null);

    useEffect( () => {
        const loadCategories = async ()=>{
            const data = await fetchCategories();
            setCategories(data);
        }
        loadCategories();
    },[]);

    const selectCategory = (caterogyID) => {
        const category = categories.find((c) => c.Category_ID === caterogyID);
        setSelectedCategory(category);
    };

    return {
        categories,
        selectedCategory,
        selectCategory
    }
}

export default useCategories;