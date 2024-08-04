import React from "react";
import stylesPage from "../Pages.module.css";
import PageHeader from "../../components/PageHeader";
import { CustomerById } from "../../components/ItemDetail";
import useCustomers from "../../hook/useCustomers";
import { useParams } from "react-router-dom";

const CustomerDetail = ({ mainPage }) => {
  const { loading, error, getCustomerById } = useCustomers();
  const { id } = useParams();

  const customer = getCustomerById(id);

  const titleName = "Information about customer";
  const breadcrumb = mainPage;
  const itemBreadcrumb = `Customer details`;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <PageHeader
        titleName={titleName}
        breadcrumb={breadcrumb}
        itemBreadcrumb={itemBreadcrumb}
      />
      <div className={`${stylesPage.main_body} row`}>
        <CustomerById customer={customer} />
      </div>
    </>
  );
};

export default CustomerDetail;
