import React from "react";
import stylesPage from "../Pages.module.css";
import Chart from "../../components/Chart";
import PageHeader from "../../components/PageHeader";

const StatisticYearly = () => {
  return (
    <>
      <PageHeader
        titleName={"Statistic"}
        breadcrumb={"Statistic"}
        itemBreadcrumb={"statistic dayly"}
      />
      <div className={stylesPage.main_body}>
        <Chart />
      </div>
    </>
  );
};

export default StatisticYearly;
