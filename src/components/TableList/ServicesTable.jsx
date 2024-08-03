import React from "react";
import { useNavigate } from "react-router-dom";
import ButtonCircle from "../ButtonPage/ButtonCircle";
import stylesTableList from "./TableList.module.css";
import useServices from "../../hook/useServices";

const ServicesTable = () => {
  const { services, selectedServices, selectServices } = useServices();
  const navigate = useNavigate();

  const handleClickDetail = (serviceID) =>{
    navigate(`/services/service_detail/${serviceID}`)
  }
  const handleEdit = () => {
    alert("edit");
  };
  const handleDelete = () => {
    alert("delete");
  };
  const handlAdd = () => {
    alert("add");
  };
  return (
    <div className="col-lg-12 grid-margin stretch-card">
      <div className="card">
        <div className={`card-body ${stylesTableList.tableResponsive}`}>
          <h4 className="card-title">{"Services"}</h4>
          <p className="card-description">{"List of services"}</p>

          <ButtonCircle
            className={stylesTableList.marginButton}
            nameButton="Add new"
            colorButton={"blue"}
            sizeButton={"sm"}
            handleOnclick={handlAdd}
          />

          <table className={`table table-hover text-center `}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Service</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {services.map((item, index) => (
                <tr
                  className={`${stylesTableList.table_cursor}`}
                  key={`${item.Service_ID}`}
                  onClick={() => handleClickDetail(item.Service_ID)}
                >
                  <td>{index + 1}</td>
                  <td>{`${item.ServiceName}`}</td>
                  <td>{`${item.ServicePrice} `}<u>đ</u></td>
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

export default ServicesTable;
