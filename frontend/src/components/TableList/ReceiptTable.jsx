import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonCircle from "../ButtonPage/ButtonCircle";
import stylesTableList from "./TableList.module.css";
import useReceipts from "../../hook/useReceipts";
import { IconDetail, IconEdit } from "../Icons";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { TablePagination } from "@mui/material";

const ReceiptsTable = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [receipt, setReceipt] = useState(null);

  const { loading, error, receipts, getReceiptById } = useReceipts();
  const navigate = useNavigate();

  const handleClickDetail = (receiptID) => {
    navigate(`/receipts/receipt_detail/${receiptID}`);
  };
  const handleEdit = async (receiptID) => {
    const receiptById = await getReceiptById(receiptID);
    
    console.log(receiptById);

    setReceipt(receiptById);
    setIsEdit(true);
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

      {/* End Form */}
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className={`card-body ${stylesTableList.tableResponsive}`}>
            <h4 className="card-title">{"Receipts"}</h4>
            <p className="card-description">{"List of receipts"}</p>

            <table className={`table text-center `}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Total price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {receipts
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => (
                    <tr
                      className={`${stylesTableList.table_cursor}`}
                      key={`${item.Receipt_ID}`}
                    >
                      <td>{index + 1}</td>
                      <td>{`${item.Customer_ID}`}</td>
                      <td>
                        {`${item.TotalPrice} `}
                        <u>đ</u>
                      </td>
                      <td>
                        <ButtonCircle
                          className={stylesTableList.marginButton}
                          nameButton={<><IconDetail /></>}
                          colorButton={""}
                          sizeButton={"sm"}
                          titleButton="Info"
                          handleOnclick={() => handleClickDetail(item.Receipt_ID)}
                        />

                        <ButtonCircle
                          className={stylesTableList.marginButton}
                          nameButton={<><IconEdit /></>}
                          colorButton={"yellow"}
                          sizeButton={"sm"}
                          titleButton="Modify"
                          handleOnclick={() => handleEdit(item.Receipt_ID)}
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
              count={receipts.length}
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

export default ReceiptsTable;
