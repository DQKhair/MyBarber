import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonCircle from "../ButtonPage/ButtonCircle";
import stylesTableList from "./TableList.module.css";
import useItemCategories from "../../hook/useItemCategories";
import { IconDetail, IconEdit, IconAdd, IconDelete } from "../Icons";
import { AddForm,EditForm,DeleteForm } from "../Forms/ItemCategoryForm";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { TablePagination } from "@mui/material";

const ServicesTable = () => {
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [service, setService] = useState(false);

  const navigate = useNavigate();
  const { loading, error, itemCategories,getItemCategoryById } =
    useItemCategories();

  const Services = itemCategories.filter(item => item.Category_ID === "1");

  const handleClickDetail = (serviceID) => {
    navigate(`/services/service_detail/${serviceID}`);
  };

  const handleAdd = () => {
    setIsAdd(true);
  };
  const handleEdit = async (serviceID) => {
    const serviceById = await getItemCategoryById(serviceID);

    console.log(serviceById);

    setService(serviceById);
    setIsEdit(true);
  };
  const handleDelete = async (serviceID) => {
    const serviceById = await getItemCategoryById(serviceID);

    console.log(serviceById);

    setService(serviceById);
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
        <AddForm openAdd={isAdd} handleClose={handleCloseAdd} />
      ) : (
        <></>
      )}

      {/* Edit form */}

      {isEdit === true ? (
        <EditForm
          itemCategory={service}
          openEdit={isEdit}
          handleClose={handleCloseEdit}
        />
      ) : (
        <></>
      )}

      {/* Delete form */}

      {isDelete === true ? (
        <DeleteForm
          itemCategory={service}
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
            <h4 className="card-title">{"Services"}</h4>
            <p className="card-description">{"List of services"}</p>

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
                  <th>ID</th>
                  <th>Service</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {Services
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => (
                    <tr
                      className={`${stylesTableList.table_cursor}`}
                      key={`${item.ItemCategory_ID}`}
                    >
                      <td>{index + 1}</td>
                      <td>{`${item.ItemCategoryName} `} </td>
                      <td><img style={{borderRadius:"10%"}} src={item.ItemCategoryImage} alt="img" /></td>
                      <td>
                        {`${item.ItemCategoryPrice} `}
                        <u>đ</u>
                      </td>
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
                            handleClickDetail(item.ItemCategory_ID)
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
                          handleOnclick={() => handleEdit(item.ItemCategory_ID)}
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
                          handleOnclick={() =>
                            handleDelete(item.ItemCategory_ID)
                          }
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
              count={Services.length}
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

export default ServicesTable;
