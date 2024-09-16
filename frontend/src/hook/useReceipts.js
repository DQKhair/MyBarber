import { useState, useEffect } from "react";
import {
  fetchReceipts,
  getReceiptById,
  addReceipt,
  confirmHairCut,
  confirmHairWash,
  confirmFinished,
  confirmPaymentCompleted,
} from "../services/receiptServices";

const useReceipts = () => {
  const [loading, setLoading] = useState(true);
  const [errorLoad, setErrorLoad] = useState(null);
  const [error, setError] = useState(null);
  const [receipts, setReceipts] = useState([]);

  useEffect(() => {
    const loadReceipt = async () => {
      setLoading(true);
      try {
        const data = await fetchReceipts();
        setReceipts(data);
      } catch (err) {
        setErrorLoad(err);
        console.error("Fail to load receipts: ", err);
      } finally {
        setLoading(false);
      }
    };
    loadReceipt();
  }, []);

  const getReceiptByIdLocal = (receiptID) => {
    setError(null);
    try {
      return receipts.find((r) => r.receipt_ID === receiptID);
    } catch (err) {
      setError(err);
      console.error("Fail to get receipt by ID: ", err);
      return null;
    }
  };

  const getReceiptByIdHook = async (receiptID) => {
    setError(null);
    try {
      const receipt = await getReceiptById(receiptID);
      return receipt;
    } catch (err) {
      setError(err);
      console.error("Fail to get receipt by ID: ", err);
      return null;
    }
  };

  const addReceiptHook = async (employeeId, receipt) => {
    setError(null);
    try {
      const newReceipt = await addReceipt(employeeId, receipt);
      setReceipts(...receipts, newReceipt);
      return newReceipt;
    } catch (err) {
      setError(err);
      console.error("Fail to add receipt from hook: ", err);
      return null;
    }
  };

  const confirmHaircutHook = async (receiptId, employeeId) => {
    setError(null);
    try {
      const updated = await confirmHairCut(receiptId, employeeId);
      setReceipts(
        receipts.map((r) => (r.receipt_ID === receiptId ? updated : r))
      );
      return updated;
    } catch (err) {
      setError(err);
      console.error("Fail to confirm haircut from hook: ", err);
      return null;
    }
  };

  const confirmHairWashHook = async (receiptId, employeeId) => {
    setError(null);
    try {
      const updated = await confirmHairWash(receiptId, employeeId);
      setReceipts(
        receipts.map((r) => (r.receipt_ID === receiptId ? updated : r))
      );
      return updated;
    } catch (err) {
      setError(err);
      console.error("Fail to confirm hair wash from hook: ", err);
      return null;
    }
  };

  const confirmFinishedHook = async (receiptId) => {
    setError(null);
    try {
      const updated = await confirmFinished(receiptId);
      setReceipts(
        receipts.map((r) => (r.receipt_ID === receiptId ? updated : r))
      );
      return updated;
    } catch (err) {
      setError(err);
      console.error("Fail to confirm finished from hook: ", err);
      return null;
    }
  };

  const confirmPaymentCompletedHook = async (receiptId, methodName) => {
    setError(null);
    try {
      const updated = await confirmPaymentCompleted(receiptId, methodName);
      setReceipts(
        receipts.map((r) => (r.receipt_ID === receiptId ? updated : r))
      );
      return updated;
    } catch (err) {
      setError(err);
      console.error("Fail to confirm payment completed from hook: ", err);
      return null;
    }
  };

  return {
    loading,
    errorLoad,
    error,
    receipts,
    setError,
    getReceiptByIdLocal,
    getReceiptByIdHook,
    addReceiptHook,
    confirmHaircutHook,
    confirmHairWashHook,
    confirmFinishedHook,
    confirmPaymentCompletedHook,
  };
};

export default useReceipts;
