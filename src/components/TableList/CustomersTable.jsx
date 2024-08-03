import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonCircle from "../ButtonPage/ButtonCircle";
import stylesTableList from "./TableList.module.css";
import useCustomers from "../../hook/useCustomers";
import { IconDetail } from "../Icons";
import EditForm from "../Forms/CustomerForm/EditForm";

const CustomersTable = () => {
  const [isEdit,setIsEdit] = useState(false);

  const { loading, error, customers } = useCustomers();
  
  const navigate = useNavigate();

  const handleClickDetail = (customerID) => {
    navigate(`/customers/customer_detail/${customerID}`);
  };

  const handleEdit = (customerID) => {
    console.log("edit " + customerID);
    setIsEdit(true)
  };
  const handleCloseEdit = () =>{
    setIsEdit(false)
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (

    <>
    <EditForm openEdit={isEdit} handleClose={handleCloseEdit} />

    <div className="col-lg-12 grid-margin stretch-card">
      <div className="card">
        <div className={`card-body ${stylesTableList.tableResponsive}`}>
          <h4 className="card-title">{"Customers"}</h4>
          <p className="card-description">{"List of customers"}</p>

          <table className={`table table-hover text-center `}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((item, index) => (
                <tr
                  className={`${stylesTableList.table_cursor}`}
                  key={`${item.Customer_ID}`}
                >
                  <td>{index + 1}</td>
                  <td>{`${item.CustomerName}`}</td>
                  <td>{`${item.CustomerPhone}`}</td>
                  <td>
                    <IconDetail onClick={() => handleClickDetail(item.Customer_ID)} />
                    <ButtonCircle
                      className={stylesTableList.marginButton}
                      nameButton="Edit"
                      colorButton={"yellow"}
                      sizeButton={"sm"}
                      handleOnclick={() => handleEdit(item.Customer_ID)}
                    />

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>

  );
};

export default CustomersTable;
