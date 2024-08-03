import React from "react";
import stylesPage from "../Pages.module.css";
import PageHeader from "../../components/PageHeader";
import { ReceiptsTable } from "../../components/TableList";

const ReceiptsPage = () => {
  const titleName = "Receipts management";
  const breadcrumb = "Receipts management";
  const itemBreadcrumb = "list Receipts";
  return (
    <>
      <PageHeader
        titleName={titleName}
        breadcrumb={breadcrumb}
        itemBreadcrumb={itemBreadcrumb}
      />
      <div className={`${stylesPage.main_body} row`}>
        <ReceiptsTable />
      </div>
    </>
  );
};

export default ReceiptsPage;
