import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonCircle from "../ButtonPage/ButtonCircle";
import stylesTableList from "./TableList.module.css";
import useCustomers from "../../hook/useCustomers";
import { IconAdd, IconDetail, IconEdit } from "../Icons";
import { AddFrom, EditForm } from "../Forms/CustomerForm";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { TablePagination } from "@mui/material";

const CustomersTable = () => {
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [customer, setCustomer] = useState(null);

  const navigation = useNavigate();
  const {
    loading,
    errorLoad,
    error,
    customers,
    setError,
    getCustomerByIdLocal,
    addCustomerHook,
    updateCustomerHook,
  } = useCustomers();

  const handleClickDetail = (customerID) => {
    navigation(`/customers/customer_detail/${customerID}`);
  };

  const handleAdd = () => {
    setIsAdd(true);
  };
  const handleEdit = (customerID) => {
    const customerById = getCustomerByIdLocal(customerID);
    setCustomer(customerById);
    setIsEdit(true);
  };

  const handleCloseAdd = () => {
    setIsAdd(false);
  };
  const handleCloseEdit = () => {
    setIsEdit(false);
  };

  // pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // alert
  useEffect(() => {
    if (error != null) {
      alert(error.response.data.message);
      setError(null);
    }
  },[error]);
  

  //load page

  if (loading)
    return (
      <div>
        <Box sx={{ display: "flex" }}>
          <CircularProgress /> Loading...
        </Box>
      </div>
    );

  if (errorLoad)
    return (
      <div>
        <Alert severity="error">Error: {errorLoad.message}</Alert>
      </div>
    );

  return (
    <>
      {/* Form */}
      {isAdd === true ? (
        <AddFrom
          addCustomer={addCustomerHook}
          openAdd={isAdd}
          handleClose={handleCloseAdd}
        />
      ) : (
        <></>
      )}

      {/* Edit form */}

      {isEdit === true ? (
        <EditForm
          updateCustomer={updateCustomerHook}
          customer={customer}
          openEdit={isEdit}
          handleClose={handleCloseEdit}
        />
      ) : (
        <></>
      )}

      {/* End Form */}
      {/* Table */}
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className={`card-body ${stylesTableList.tableResponsive}`}>
            <h4 className="card-title">{"Customers"}</h4>
            <p className="card-description">{"List of customers"}</p>

            <ButtonCircle
              className={stylesTableList.marginButton}
              nameButton={
                <>
                  <IconAdd /> Add new
                </>
              }
              colorButton={"blue"}
              sizeButton={"sm"}
              handleOnclick={handleAdd}
            />

            <table className={`table table-hover text-center `}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Customer</th>
                  <th>Phone</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {customers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => (
                    <tr
                      className={`${stylesTableList.table_cursor}`}
                      key={`${item.customer_ID}`}
                    >
                      <td>{index + 1}</td>
                      <td>{`${item.customerName}`}</td>
                      <td>{`${item.customerPhone}`}</td>
                      <td>
                        <ButtonCircle
                          className={stylesTableList.marginButton}
                          nameButton={
                            <>
                              <IconDetail />
                            </>
                          }
                          sizeButton={"sm"}
                          titleButton="Info"
                          handleOnclick={() =>
                            handleClickDetail(item.customer_ID)
                          }
                        />
                        <ButtonCircle
                          className={stylesTableList.marginButton}
                          nameButton={
                            <>
                              <IconEdit />
                            </>
                          }
                          colorButton={"yellow"}
                          sizeButton={"sm"}
                          titleButton="Modify"
                          handleOnclick={() => handleEdit(item.customer_ID)}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {/* pagination */}
            <TablePagination
              className="paginationTable"
              rowsPerPageOptions={[10, 25, 50]}
              component="div"
              count={customers.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{ "& p": { margin: "0px" } }}
            />
            {/* end pagination */}
          </div>
        </div>
      </div>
      {/*End Table */}
    </>
  );
};

export default CustomersTable;
