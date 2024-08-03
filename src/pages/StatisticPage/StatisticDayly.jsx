import React from "react";
import stylesPage from "../Pages.module.css";
import PageHeader from "../../components/PageHeader";
import Chart from "../../components/Chart";

const StatisticDayly = () => {
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

export default StatisticDayly;
