import React from "react";
import { useNavigate } from "react-router-dom";
import ButtonCircle from "../ButtonPage/ButtonCircle";
import stylesTableList from "./TableList.module.css";
import useCategories from "../../hook/useCategories";

const CategoriesTable = () => {
  const { categories, selectedCategory, selectCategory } = useCategories();
  const navigate = useNavigate();

  const handleClickDetail = (categoryID) =>{
    navigate(`/categories/category_detail/${categoryID}`)
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
          <h4 className="card-title">{"Categories"}</h4>
          <p className="card-description">{"List of categories"}</p>

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
                <th>Category</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((item, index) => (
                <tr
                  className={`${stylesTableList.table_cursor}`}
                  key={`${item.Category_ID}`}
                  onClick={()=>handleClickDetail(item.Category_ID)}
                >
                  <td>{index + 1}</td>
                  <td>{`${item.CategoryName}`}</td>
                  <td>{`${item.CategoryDescription}`}</td>
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

export default CategoriesTable;
