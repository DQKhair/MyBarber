import React from "react";
import stylesPage from "../Pages.module.css";
import PageHeader from "../../components/PageHeader";
import Profile from "../../components/Profile";
import useUserInfo from "../../hook/useUserInfo";
import DecodeToken from "../../utils/DecodeToken";
import { Alert, Box, CircularProgress } from "@mui/material";

const InformationPage = () => {
  const titleName = "Profile setting";
  const breadcrumb = "Information";
  const itemBreadcrumb = "My profile";

  const { loading, error, user, updateInfoAdminHook, updateInfoEmployeeHook } =
    useUserInfo();
  const dataUser = DecodeToken(localStorage.getItem("accessToken"));

  const role = {
    role_Id: dataUser.Role_ID,
    roleName: dataUser.role,
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
      <PageHeader
        titleName={titleName}
        breadcrumb={breadcrumb}
        itemBreadcrumb={itemBreadcrumb}
      />
      <div className={`${stylesPage.main_body} row`}>
        <Profile updateInfoAdmin={updateInfoAdminHook} updateInfoEmployee={updateInfoEmployeeHook} user={user} role={role} />
      </div>
    </>
  );
};

export default InformationPage;
