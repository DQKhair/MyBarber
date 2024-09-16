import axiosRoot from "../config/axiosConfig";

const fetchReceipts = async () => {
  const response = await axiosRoot.get(`/api/receipts`);
  return response.data;
};

const getReceiptById = async (receiptId) => {
  const response = await axiosRoot.get(`/api/receipts/${receiptId}`);
  return response.data;
};

const addReceipt = async (employeeId, receipt) => {
  const response = await axiosRoot.post(`/api/receipts/${employeeId}`, receipt);
  return response.data;
};

const confirmHairCut = async (receiptId, employeeId) => {
  const response = await axiosRoot.put(
    `/api/receipts/confirm_haircut/receiptId=${receiptId}&&employeeId=${employeeId}`
  );
  return response.data;
};

const confirmHairWash = async (receiptId, employeeId) => {
  const response = await axiosRoot.put(
    `/api/receipts/confirm_hair_wash/receiptId=${receiptId}&&employeeId=${employeeId}`
  );
  return response.data;
};

const confirmFinished = async (receiptId) => {
  const response = await axiosRoot.put(
    `/api/receipts/confirm_finished/receiptId=${receiptId}`
  );
  return response.data;
};

const confirmPaymentCompleted = async (receiptId, methodName) => {
  const response = await axiosRoot.put(
    `/api/confirm_payment_completed/receiptId=${receiptId}&&method=${methodName}`
  );
  return response.data;
};

export {
  fetchReceipts,
  getReceiptById,
  addReceipt,
  confirmHairCut,
  confirmHairWash,
  confirmFinished,
  confirmPaymentCompleted,
};
