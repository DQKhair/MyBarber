import React from "react";
import { useNavigate } from "react-router-dom";
import ButtonCircle from "../ButtonPage/ButtonCircle";
import stylesTableList from "./TableList.module.css";
import useProducts from "../../hook/useProducts";

const ProductsTable = () => {
  const { products, selectedProduct, selectProduct } = useProducts();
  const navigate = useNavigate();

  const handleClickDetail = (productID) =>{
    navigate(`/products/product_detail/${productID}`)
  }
  const handleEdit = () => {
    alert("edit");
  };
  const handleDelete = () => {
    alert("delete");
  };
  const handleAdd = () => {
    alert("add");
  };
  return (
    <div className="col-lg-12 grid-margin stretch-card">
      <div className="card">
        <div className={`card-body ${stylesTableList.tableResponsive}`}>
          <h4 className="card-title">{"Customers"}</h4>
          <p className="card-description">{"List of customers"}</p>

          <ButtonCircle
            className={stylesTableList.marginButton}
            nameButton="Add new"
            colorButton={"blue"}
            sizeButton={"sm"}
            handleOnclick={handleAdd}
          />

          <table className={`table table-hover text-center `}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Product</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item, index) => (
                <tr
                  className={`${stylesTableList.table_cursor}`}
                  key={`${item.Product_ID}`}
                  onClick={() => handleClickDetail(item.Product_ID)}
                >
                  <td>{index + 1}</td>
                  <td>{`${item.ProductName}`}</td>
                  <td>{`${item.ProductPrice} `}<u>đ</u></td>
                  <td>
                    <ButtonCircle
                      className={stylesTableList.marginButton}
                      nameButton="Edit"
                      colorButton={"yellow"}
                      sizeButton={"sm"}
                      handleOnclick={handleEdit}
                    />
                    <ButtonCircle
                      className={stylesTableList.marginButton}
                      nameButton="Delete"
                      colorButton={"red"}
                      sizeButton={"sm"}
                      handleOnclick={handleDelete}
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

export default ProductsTable;
