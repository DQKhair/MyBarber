import React from "react";
import { useNavigate } from "react-router-dom";
import ButtonCircle from "../ButtonPage/ButtonCircle";
import stylesTableList from "./TableList.module.css";
import useEmployees from "../../hook/useEmployees";
import { IconAdd,IconDetail,IconEdit,IconDelete } from "../Icons";


const EmployeesTable = () => {
  const { employees} = useEmployees();
  const navigate = useNavigate();

  const handleClickDetail = (employeeID) => {
    navigate(`/employees/employee_detail/${employeeID}`);
  };
  const handleEdit = () => {
    alert("edit");
  };
  const handleDelete = () => {
    alert("delete");
  };
  const handleAdd = () => {
    alert("Add");
  };
  return (
    <div className="col-lg-12 grid-margin stretch-card">
      <div className="card">
        <div className={`card-body ${stylesTableList.tableResponsive}`}>
          <h4 className="card-title">{"Employees"}</h4>
          <p className="card-description">{"List of employees"}</p>

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
                <th>#</th>
                <th>Employee</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((item, index) => (
                <tr
                  className={`${stylesTableList.table_cursor}`}
                  key={`${item.Employee_ID}`}
                >
                  <td>{index + 1}</td>
                  <td>{`${item.EmployeeName}`}</td>
                  <td>{`${item.EmployeePhone}`}</td>
                  <td>
                    <ButtonCircle
                      className={stylesTableList.marginButton}
                      nameButton={<><IconDetail /></>}
                      colorButton={""}
                      sizeButton={"sm"}
                      handleOnclick={() => handleClickDetail(item.Employee_ID)}
                    />
                    <ButtonCircle
                      className={stylesTableList.marginButton}
                      nameButton={<><IconEdit /></>}
                      colorButton={"yellow"}
                      sizeButton={"sm"}
                      handleOnclick={handleEdit}
                    />
                    <ButtonCircle
                      className={stylesTableList.marginButton}
                      nameButton={<><IconDelete /></>}
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

export default EmployeesTable;
