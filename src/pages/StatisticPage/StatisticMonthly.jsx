import React from "react";
import stylesPage from "../Pages.module.css";
import PageHeader from "../../components/PageHeader";
import Chart from "../../components/Chart";

const StatisticMonthly = () => {
  return (
    <>
      <PageHeader
        titleName={"Statistic"}
        breadcrumb={"Statistic"}
        itemBreadcrumb={"Statistic monthly"}
      />
      <div className={stylesPage.main_body}>
        <Chart />
      </div>
    </>
  );
};

export default StatisticMonthly;
