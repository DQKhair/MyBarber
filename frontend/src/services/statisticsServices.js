import axiosRoot from "../config/axiosConfig";

const getStatisticsReceiptMoney = async (dateTime) => {
  const response = await axiosRoot.get(
    `/api/Statistics/receipt_money/datetime=${dateTime}`
  );
  return response.data;
};

const getStatisticsQuantityProductsAndServices = async (dateTime) => {
  const response = await axiosRoot.get(
    `/api/Statistics/quantity_products_and_services/datetime=${dateTime}`
  );
  return response.data;
};

const getStatisticsQuantityReceiptAndTotalMoney = async (dateTime) => {
  const response = await axiosRoot.get(
    `/api/Statistics/quantity_receipts_and_total_money/datetime=${dateTime}`
  );
  return response.data;
};

export {
  getStatisticsReceiptMoney,
  getStatisticsQuantityProductsAndServices,
  getStatisticsQuantityReceiptAndTotalMoney,
};
