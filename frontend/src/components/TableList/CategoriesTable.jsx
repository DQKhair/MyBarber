import React, { useState } from "react";
import ButtonCircle from "../ButtonPage/ButtonCircle";
import stylesTableList from "./TableList.module.css";
import useCategories from "../../hook/useCategories";
import { IconAdd, IconEdit, IconDelete } from "../Icons";
import { AddFrom, EditForm, DeleteForm } from "../Forms/CategoryForm";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { TablePagination } from "@mui/material";

const CategoriesTable = () => {
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [category, setCategory] = useState(null);

  console.log("a");
  const { loading, error, categories, getCategoryById } = useCategories();

  const handleAdd = () => {
    setIsAdd(true);
  };
  const handleEdit = async (categoryID) => {
    const categoryById = await getCategoryById(categoryID);
    setCategory(categoryById);
    setIsEdit(true);
  };
  const handleDelete = async (categoryID) => {
    const categoryById = await getCategoryById(categoryID);
    setCategory(categoryById);
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
        <AddFrom openAdd={isAdd} handleClose={handleCloseAdd} />
      ) : (
        <></>
      )}

      {/* Edit form */}

      {isEdit === true ? (
        <EditForm
          category={category}
          openEdit={isEdit}
          handleClose={handleCloseEdit}
        />
      ) : (
        <></>
      )}

      {/* Delete form */}

      {isDelete === true ? (
        <DeleteForm
          category={category}
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
            <h4 className="card-title">{"Categories"}</h4>
            <p className="card-description">{"List of categories"}</p>

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
                  <th>Category</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {categories
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => (
                    <tr
                      className={`${stylesTableList.table_cursor}`}
                      key={`${item.Category_ID}`}
                    >
                      <td>{index + 1}</td>
                      <td>{`${item.CategoryName}`}</td>
                      <td>
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
                          handleOnclick={() => handleEdit(item.Category_ID)}
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
                          handleOnclick={() => handleDelete(item.Category_ID)}
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
                count={categories.length}
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

export default CategoriesTable;