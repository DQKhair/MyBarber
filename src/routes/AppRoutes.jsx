import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import NotFound from "../pages/NotFound";
import Dashboard from "../pages/Dashboard";
import CustomersPage from "../pages/CustomersPage";
import EmployeesPage from "../pages/EmployeesPage";
import CategoriesPage from "../pages/CategoriesPage";
import ProductsPage from "../pages/ProductsPage";
import ServicesPage from "../pages/ServicesPage";
import ReceiptsPage from "../pages/ReceiptsPage";
import { CustomerDetail } from "../pages/DetailPage";
import {
  StatisticDayly,
  StatisticMonthly,
  StatisticYearly,
} from "../pages/StatisticPage";
import LoginLayout from "../layouts/LoginLayout";
import Login from "../pages/Login";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="customers/customer_detail/:id" element={<CustomerDetail mainPage={"Customers"} />} />
          <Route path="/employees" element={<EmployeesPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/receipts" element={<ReceiptsPage />} />
          <Route path="/statisticDayly" element={<StatisticDayly />} />
          <Route path="/statisticMonthly" element={<StatisticMonthly />} />
          <Route path="/statisticYearly" element={<StatisticYearly />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/login" element={<LoginLayout />}>
          <Route index element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
