import axios from "axios";
import { API_URL } from "../constants/constants";

const fetchReceipts = async () => {
  try {
    const response = await axios.get(`${API_URL}/receipts.json`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch receipts: ", error);
    return [];
  }
};

const acceptReceipt = async (receiptID) => {
  try {
    const response = await axios.put(
      `${API_URL}/receipts/accept_receipt/${receiptID}`
    );
    return response.data;
  } catch (err) {
    console.error("Fail to accept receipt: ", err);
    return [];
  }
};

const addReceipt = async (receipt) => {
  try {
    const response = await axios.post(`${API_URL}/receipts`,receipt);
    return response.data;
  } catch (err) 
  {
    console.error("Fail to add receipt: ",err);
    return [];
  }
};

export {fetchReceipts,acceptReceipt,addReceipt}