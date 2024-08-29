import { useState,useEffect } from "react";
import { fetchProducts } from "../services/productServices";

const useProducts = ()=>{
    const [products,setProducts] = useState([]);
    const [selectedProduct,setSelectedProduct] = useState(null);

    useEffect(()=>{
        const loadProducts = async ()=>{
            const data = await fetchProducts();
            setProducts(data);
        }
        loadProducts();
    });

    const selectProduct = (productID) =>{
        const product = products.find((p) => p.Product_ID === productID);
        setSelectedProduct(product);
    };

    return {
        products,
        selectedProduct,
        selectProduct
    }
}

export default useProducts;