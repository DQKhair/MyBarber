import { useState,useEffect } from "react";
import { fetchReceipts } from "../services/receiptServices";

const useReceipts = ()=>{
    const [receipts,setReceipts] = useState([]);
    const [selectedReceipt,setSelectedReceipt] = useState(null);

    useEffect(()=>{

        const loadReceipt = async ()=>{
            const data = await fetchReceipts();
            setReceipts(data);
        }
        loadReceipt();
    },[])

    const selectReceipt = (receiptID) => {
        const receipt = receipts.find((r)=>r.Receipt_ID === receiptID);
        setSelectedReceipt(receipt);
    }

    return {
        receipts,
        selectedReceipt,
        selectReceipt
    }
}

export default useReceipts;