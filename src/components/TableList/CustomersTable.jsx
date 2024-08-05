import React, { useState } from "react";
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
  const { loading, error, customers, getCustomerById } = useCustomers();

  const handleClickDetail = (customerID) => {
    navigation(`/customers/customer_detail/${customerID}`);
  };

  const handleAdd = () => {
    setIsAdd(true);
  };
  const handleEdit = async (customerID) => {
    const customerById = await getCustomerById(customerID);
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

  //load page

  if (loading)
    return (
      <div>
        <Box sx={{ display: "flex" }}>
          <CircularProgress /> Loading...
        </Box>
      </div>
    );

  if (error)
    return (
      <div>
        <Alert severity="error">Error: {error.message}</Alert>
      </div>
    );

  return (
    <>
      {/* Form */}
      {isAdd === true ? (
        <AddFrom openAdd={isAdd} handleClose={handleCloseAdd} />
      ) : (
        <></>
      )}

      {/* Edit form */}

      {isEdit === true ? (
        <EditForm
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
                      key={`${item.Customer_ID}`}
                    >
                      <td>{index + 1}</td>
                      <td>{`${item.CustomerName}`}</td>
                      <td>{`${item.CustomerPhone}`}</td>
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
                            handleClickDetail(item.Customer_ID)
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
                          handleOnclick={() => handleEdit(item.Customer_ID)}
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
