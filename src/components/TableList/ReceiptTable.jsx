import React from "react";
import { useNavigate } from "react-router-dom";
import ButtonCircle from "../ButtonPage/ButtonCircle";
import stylesTableList from "./TableList.module.css";
import useReceipts from "../../hook/useReceipts";

const ReceiptsTable = () => {
  const { receipts, selectedReceipt, selectReceipt } = useReceipts();
  const navigate = useNavigate();

  const handleClickDetail = (receiptID) =>{
    navigate(`/receipts/receipt_detail/${receiptID}`)
  }
  const handleUpdate = () => {
    alert("update");
  };

  return (
    <div className="col-lg-12 grid-margin stretch-card">
      <div className="card">
        <div className={`card-body ${stylesTableList.tableResponsive}`}>
          <h4 className="card-title">{"Receipts"}</h4>
          <p className="card-description">{"List of receipts"}</p>

          <table className={`table table-hover text-center `}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Total price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {receipts.map((item, index) => (
                <tr
                  className={`${stylesTableList.table_cursor}`}
                  key={`${item.Receipt_ID}`}
                  onClick={() => handleClickDetail(item.Receipt_ID)}
                >
                  <td>{index + 1}</td>
                  <td>{`${item.Customer_ID}`}</td>
                  <td>{`${item.TotalPrice} `}<u>đ</u></td>
                  <td>
                    <ButtonCircle
                      className={stylesTableList.marginButton}
                      nameButton="Edit"
                      colorButton={"yellow"}
                      sizeButton={"sm"}
                      handleOnclick={handleUpdate}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReceiptsTable;
