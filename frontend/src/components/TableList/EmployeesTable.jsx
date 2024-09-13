import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonCircle from "../ButtonPage/ButtonCircle";
import stylesTableList from "./TableList.module.css";
import useEmployees from "../../hook/useEmployees";
import { IconAdd, IconDetail, IconEdit, IconDelete } from "../Icons";
import { AddFrom, EditForm, DeleteForm } from "../Forms/EmployeeForm";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { TablePagination } from "@mui/material";

const EmployeesTable = () => {
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [employee, setEmployee] = useState(null);

  const navigate = useNavigate();
  const {
    loading,
    errorLoad,
    error,
    employees,
    setError,
    getEmployeeByIdLocal,
    addEmployeeHook,
    deleteEmployeeHook,
    updateEmployeeHook,
  } = useEmployees();

  const handleClickDetail = (employeeID) => {
    navigate(`/employees/employee_detail/${employeeID}`);
  };

  const handleAdd = () => {
    setIsAdd(true);
  };
  const handleEdit = (employeeID) => {
    const employeeById = getEmployeeByIdLocal(employeeID);
    setEmployee(employeeById);
    setIsEdit(true);
  };
  const handleDelete = (employeeID) => {
    const employeeById = getEmployeeByIdLocal(employeeID);
    setEmployee(employeeById);
    setIsDelete(true);
  };

  const handleCloseAdd = () => {
    setIsAdd(false);
  };
  const handleCloseEdit = () => {
    setIsEdit(false);
  };
  const handleCloseDelete = () => {
    setIsDelete(false);
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

  //alert
  useEffect(() => {
    if (error != null) {
      alert(error.response.data.message);
      setError(null);
    }
  }, [error]);

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
          addEmployee={addEmployeeHook}
          openAdd={isAdd}
          handleClose={handleCloseAdd}
        />
      ) : (
        <></>
      )}

      {/* Edit form */}

      {isEdit === true ? (
        <EditForm
          updateEmployee={updateEmployeeHook}
          employee={employee}
          openEdit={isEdit}
          handleClose={handleCloseEdit}
        />
      ) : (
        <></>
      )}

      {/* Delete form */}

      {isDelete === true ? (
        <DeleteForm
          deleteEmployee={deleteEmployeeHook}
          employee={employee}
          openDelete={isDelete}
          handleClose={handleCloseDelete}
        />
      ) : (
        <></>
      )}

      {/* End Form */}
      {/* Table */}
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className={`card-body ${stylesTableList.tableResponsive}`}>
            <h4 className="card-title">{"Employees"}</h4>
            <p className="card-description">{"List of employees"}</p>

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

            <table className={`table text-center `}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Employee</th>
                  <th>Phone</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {employees
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => (
                    <tr
                      className={`${stylesTableList.table_cursor}`}
                      key={`${item.employee_ID}`}
                    >
                      <td>{index + 1}</td>
                      <td>{`${item.employeeName}`}</td>
                      <td>{`${item.employeePhone}`}</td>
                      <td>
                        <ButtonCircle
                          className={stylesTableList.marginButton}
                          nameButton={
                            <>
                              <IconDetail />
                            </>
                          }
                          colorButton={""}
                          sizeButton={"sm"}
                          titleButton="Info"
                          handleOnclick={() =>
                            handleClickDetail(item.employee_ID)
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
                          handleOnclick={() => handleEdit(item.employee_ID)}
                        />
                        <ButtonCircle
                          className={stylesTableList.marginButton}
                          nameButton={
                            <>
                              <IconDelete />
                            </>
                          }
                          colorButton={"red"}
                          sizeButton={"sm"}
                          titleButton="Delete"
                          handleOnclick={() => {
                            handleDelete(item.employee_ID);
                          }}
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
              count={employees.length}
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
    </>
  );
};

export default EmployeesTable;
