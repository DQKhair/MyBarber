import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import ButtonCircle from "../ButtonPage/ButtonCircle";
import stylesTableList from "./TableList.module.css";
import useItemCategories from "../../hook/useItemCategories";
import { IconDetail, IconEdit,IconAdd,IconDelete } from "../Icons";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { TablePagination } from "@mui/material";

const ProductsTable = () => {
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [product, setProduct] = useState(null);

  const navigate = useNavigate();
  const { loading, error, itemCategories, getItemCategoryById } = useItemCategories();

  const handleClickDetail = (productID) => {
    navigate(`/products/product_detail/${productID}`);
  };

  const handleAdd = () => {
    setIsAdd(true);
  };
  const handleEdit = async (productID) => {
    const productById = await getItemCategoryById(productID);

    console.log(productById)

    setProduct(productById);
    setIsEdit(true);
  };
  const handleDelete = async (productID) => {
    const productById = await getItemCategoryById(productID);

    console.log(productById)

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
      {/* {isAdd === true ? (
        <AddFrom openAdd={isAdd} handleClose={handleCloseAdd} />
      ) : (
        <></>
      )} */}

      {/* Edit form */}

      {/* {isEdit === true ? (
        <EditForm
          employee={employee}
          openEdit={isEdit}
          handleClose={handleCloseEdit}
        />
      ) : (
        <></>
      )} */}

      {/* Delete form */}

      {/* {isDelete === true ? (
        <DeleteForm
          employee={employee}
          openDelete={isDelete}
          handleClose={handleCloseDelete}
        />
      ) : (
        <></>
      )} */}

      {/* End Form */}
      {/* Table */}
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className={`card-body ${stylesTableList.tableResponsive}`}>
            <h4 className="card-title">{"Customers"}</h4>
            <p className="card-description">{"List of customers"}</p>

            <ButtonCircle
              className={stylesTableList.marginButton}
              nameButton={<><IconAdd /> Add new</>}
              colorButton={"blue"}
              sizeButton={"sm"}
              handleOnclick={handleAdd}
            />

            <table className={`table text-center `}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {itemCategories
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, index) => (
                  <tr
                    className={`${stylesTableList.table_cursor}`}
                    key={`${item.ItemCategory_ID}`}
                  >
                    <td>{index + 1}</td>
                    <td>{`${item.ItemCategoryName}`}</td>
                    <td>
                      {`${item.ItemCategoryPrice} `}
                      <u>đ</u>
                    </td>
                    <td>
                    <ButtonCircle
                        className={stylesTableList.marginButton}
                        nameButton={<><IconDetail /></>}
                        colorButton={""}
                        sizeButton={"sm"}
                        titleButton="Info"
                        handleOnclick={() => handleClickDetail(item.ItemCategory_ID)}
                      />
                      <ButtonCircle
                        className={stylesTableList.marginButton}
                        nameButton={<><IconEdit /></>}
                        colorButton={"yellow"}
                        sizeButton={"sm"}
                        titleButton="Modify"
                        handleOnclick={() => handleEdit(item.ItemCategory_ID)}
                      />
                      <ButtonCircle
                        className={stylesTableList.marginButton}
                        nameButton={<><IconDelete /></>}
                        colorButton={"red"}
                        sizeButton={"sm"}
                        titleButton="Delete"
                        handleOnclick={() => handleDelete(item.ItemCategory_ID)}
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
              count={itemCategories.length}
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
