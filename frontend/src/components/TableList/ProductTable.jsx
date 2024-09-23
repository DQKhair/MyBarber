import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ButtonCircle from "../ButtonPage/ButtonCircle";
import stylesTableList from "./TableList.module.css";
import useItemCategories from "../../hook/useItemCategories";
import { IconDetail, IconEdit, IconAdd, IconDelete } from "../Icons";
import { AddForm, EditForm, DeleteForm } from "../Forms/ItemCategoryForm";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { TablePagination } from "@mui/material";
import { API_URL } from "../../constants/constants";

const ProductsTable = ({ userInfo }) => {
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [product, setProduct] = useState(null);

  const navigate = useNavigate();
  const {
    loading,
    errorLoad,
    error,
    itemCategories,
    getItemCategoryByIdLocal,
    addItemCategoryHook,
    deleteItemCategoryHook,
    updateItemCategoryInformationHook,
    updateItemCategoryImageHook,
  } = useItemCategories();

  const products = useMemo(() => {
     return itemCategories.filter((p) => p.category_ID !== 1);
  }, [itemCategories]);

  const handleClickDetail = (productID) => {
    navigate(`/products/product_detail/${productID}`);
  };

  const handleAdd = () => {
    setIsAdd(true);
  };
  const handleEdit = (productID) => {
    const productById = getItemCategoryByIdLocal(productID);

    setProduct(productById);
    setIsEdit(true);
  };
  const handleDelete = async (productID) => {
    const productById = await getItemCategoryByIdLocal(productID);

    setProduct(productById);
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

  // alert
  useEffect(() => {
    if (error != null) {
      toast.error(`${error.response.data.message}!`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
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
        <Alert severity="error">Error: {error.message}</Alert>
      </div>
    );

  return (
    <>
      {/* Form */}
      {isAdd === true ? (
        <AddForm
          addItemCategory={addItemCategoryHook}
          openAdd={isAdd}
          handleClose={handleCloseAdd}
        />
      ) : (
        <></>
      )}

      {/* Edit form */}

      {isEdit === true ? (
        <EditForm
          updateItemCategoryInformation={updateItemCategoryInformationHook}
          updateItemCategoryImage={updateItemCategoryImageHook}
          itemCategory={product}
          openEdit={isEdit}
          handleClose={handleCloseEdit}
        />
      ) : (
        <></>
      )}

      {/* Delete form */}

      {isDelete === true ? (
        <DeleteForm
          deleteItemCategory={deleteItemCategoryHook}
          itemCategory={product}
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
            <h4 className="card-title">{"Products"}</h4>
            <p className="card-description">{"List of products"}</p>

            {userInfo.role === "Administrator" ? (
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
            ) : (
              <></>
            )}

            <table className={`table text-center `}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => (
                    <tr
                      className={`${stylesTableList.table_cursor}`}
                      key={`${item.itemCategory_ID}`}
                    >
                      <td>{index + 1}</td>
                      <td>{`${item.itemCategoryName}`}</td>
                      <td>
                        <img
                          style={{ borderRadius: "10%" }}
                          src={`${API_URL}${item.itemCategoryImage}`}
                          alt="img"
                        />
                      </td>
                      <td style={{ color: "red" }}>
                        {`${new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(item.itemCategoryPrice)} `}
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
                            handleClickDetail(item.itemCategory_ID)
                          }
                        />
                        {userInfo.role === "Administrator" ? (
                          <>
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
                              handleOnclick={() =>
                                handleEdit(item.itemCategory_ID)
                              }
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
                                handleDelete(item.itemCategory_ID)
                              }
                            />
                          </>
                        ) : (
                          <></>
                        )}
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
              count={products.length}
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

export default ProductsTable;
