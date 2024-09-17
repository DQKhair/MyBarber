import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonCircle from "../ButtonPage/ButtonCircle";
import stylesTableList from "./TableList.module.css";
import useReceipts from "../../hook/useReceipts";
import { IconDetail, IconEdit } from "../Icons";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { TablePagination } from "@mui/material";
import EditForm from "../Forms/ReceiptsForm/EditForm";

const ReceiptsTable = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [receipt, setReceipt] = useState(null);

  const {
    loading,
    errorLoad,
    error,
    receipts,
    setError,
    getReceiptByIdLocal,
    confirmHaircutHook,
    confirmHairWashHook,
    confirmFinishedHook,
    confirmPaymentCompletedHook,
  } = useReceipts();
  const navigate = useNavigate();

  const handleClickDetail = (receiptID) => {
    navigate(`/receipts/receipt_detail/${receiptID}`);
  };
  const handleEdit = (receiptID) => {
    const receiptById = getReceiptByIdLocal(receiptID);

    setReceipt(receiptById);
    setIsEdit(true);
  };

  const handleCloseEdit = (receiptID) => {
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
    if (error !== null) {
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
        <Alert severity="error">Error: {error.message}</Alert>
      </div>
    );

  return (
    <>
      {/* Form */}

      {/* Edit form */}

      {isEdit === true ? (
        <EditForm
          confirmHaircut={confirmHaircutHook}
          confirmHairWash={confirmHairWashHook}
          confirmFinished={confirmFinishedHook}
          confirmPaymentCompleted={confirmPaymentCompletedHook}
          receipt={receipt}
          openEdit={isEdit}
          handleClose={handleCloseEdit}
        />
      ) : (
        <></>
      )}

      {/* End Form */}
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className={`card-body ${stylesTableList.tableResponsive}`}>
            <h4 className="card-title">{"Receipts"}</h4>
            <p className="card-description">{"List of receipts"}</p>

            <table className={`table text-center `}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Customer</th>
                  <th>Total price</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {receipts
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => (
                    <tr
                      className={`${stylesTableList.table_cursor}`}
                      key={`${item.receipt_ID}`}
                    >
                      <td>{index + 1}</td>
                      <td>{`${item.customerName}`}</td>
                      <td style={{ color: "red" }}>
                        {`${new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(item.totalPrice)}`}
                      </td>
                      <td>{`${item.statusName}`}</td>
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
                            handleClickDetail(item.receipt_ID)
                          }
                        />

                        {item.statusName !== "Payment completed" && (
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
                            handleOnclick={() => handleEdit(item.receipt_ID)}
                          />
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
