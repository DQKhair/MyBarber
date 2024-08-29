import React from "react";
import PageHeader from "../../components/PageHeader";
import stylesPage from "../Pages.module.css";
import { AddForm } from "../../components/Forms/ReceiptsForm";

const AddReceiptPage = () => {
    const titleName = "Add new receipt";
    const breadcrumb = "Receipts";
    const itemBreadcrumb = "Form add new receipt";

  return (
    <>
      <PageHeader
        titleName={titleName}
        breadcrumb={breadcrumb}
        itemBreadcrumb={itemBreadcrumb}
      />
      <div className={`${stylesPage.main_body} row`}>
            <AddForm />
      </div>
    </>
  );
};

export default AddReceiptPage;
