import { useState } from "react";
import {
  getStatisticsReceiptMoney,
  getStatisticsQuantityReceiptAndTotalMoney,
  getStatisticsQuantityProductsAndServices,
} from "../services/statisticsServices";

const useStatistics = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [receiptMoney, setReceiptMoney] = useState([]);
  const [quantityProAndSer, setQuantityProAndSer] = useState([]);
  const [quantityReceiptAndTotalMoney, setQuantityReceiptAndTotalMoney] =
    useState(null);

  const getStatisticsReceiptMoneyHook = async (dateTime) => {
    setLoading(true);
    setError(null);
    try {
      const _receiptMoney = await getStatisticsReceiptMoney(dateTime);
      setReceiptMoney(_receiptMoney);
      return _receiptMoney;
    } catch (error) {
      setError(error);
      console.error("Error get statistics", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getStatisticsQuantityProductsAndServicesHook = async (dateTime) => {
    setLoading(true);
    setError(null);
    try {
      const _quantityProAndSer = await getStatisticsQuantityProductsAndServices(
        dateTime
      );
      setQuantityProAndSer(_quantityProAndSer);
      return _quantityProAndSer;
    } catch (error) {
      setError(error);
      console.error("Error get statistics", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getStatisticsQuantityReceiptAndTotalMoneyHook = async (dateTime) => {
    setLoading(true);
    setError(null);
    try {
      const _quantityReceiptAndTotalMoney =
        await getStatisticsQuantityReceiptAndTotalMoney(dateTime);
      setQuantityReceiptAndTotalMoney(_quantityReceiptAndTotalMoney);
      return _quantityReceiptAndTotalMoney;
    } catch (error) {
      setError(error);
      console.error("Error get statistics", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    receiptMoney,
    quantityProAndSer,
    quantityReceiptAndTotalMoney,
    getStatisticsReceiptMoneyHook,
    getStatisticsQuantityProductsAndServicesHook,
    getStatisticsQuantityReceiptAndTotalMoneyHook,
  };
};

export default useStatistics;
