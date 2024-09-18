import axiosRoot from "../config/axiosConfig";

const getUserInfo = async (userId) => {
  const response = await axiosRoot(`/api/UserInfos/user/${userId}`);
  return response.data;
};

const updateInfoAdmin = async (userId, admin) => {
  const response = await axiosRoot.put(
    `/api/UserInfos/updateAdmin/${userId}`,
    admin
  );
  return response.data;
};

const updateInfoEmployee = async (userId, employee) => {
  const response = await axiosRoot.put(
    `/api/UserInfos/updateEmployee/${userId}`,
    employee
  );
  return response.data;
};

export { getUserInfo, updateInfoAdmin, updateInfoEmployee };
