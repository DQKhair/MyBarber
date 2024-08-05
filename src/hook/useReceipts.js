import { useState, useEffect } from "react";
import { fetchReceipts, acceptReceipt } from "../services/receiptServices";

const useReceipts = () => {
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadReceipt = async () => {
      try {
        const data = await fetchReceipts();
        setReceipts(data);
      } catch (err) {
        setError(err);
        console.error("Fail to load receipts: ", err);
      } finally {
        setLoading(false);
      }
    };
    loadReceipt();
  }, []);

  const getReceiptById = (receiptID) => {
    try {
      return receipts.find((r) => r.Receipt_ID === receiptID);
    } catch (err) {
      setError(err);
      console.error("Fail to get receipt by ID: ", err);
    }
  };

  const AcceptReceiptHook = async (receiptID) => {
    try {
      const updated = await acceptReceipt(receiptID);
      setReceipts(
        receipts.map((r) => (r.Receipt_ID === receiptID ? updated : r))
      );
    } catch (err) {
      setError(err);
      console.error("Fail to accept receipt from hook: ", err);
    }
  };

  return {
    loading,
    error,
    receipts,
    getReceiptById,
    AcceptReceiptHook,
  };
};

export default useReceipts;
