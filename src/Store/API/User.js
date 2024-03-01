import axios from "axios";
import { toast } from "react-toastify";

export const getallusers = async (data) => {
  axios.defaults.withCredentials = true;
  const response = await axios.get(`http://localhost:4500/api/v1/users/getallusers`);

  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error("Failed users recipes");
  }
};

export const getuserById = async (data) => {
  const id = data.userId;
  axios.defaults.withCredentials = true;
  const response = await axios.get(`http://localhost:4500/api/v1/users/getuserById/${id}`);

  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error("Failed users by id");
  }
};

export const updatebyusersId = async (data) => {
  // const id = data.id;
  axios.defaults.withCredentials = true;
  const response = await axios.patch(`http://localhost:4500/api/v1/users/update`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status === 200) {
    window.location.reload(true);
  } else {
    throw new Error("Failed users by id");
  }
};

export const updatuserpasswordById = async (data) => {
  axios.defaults.withCredentials = true;
  const response = await axios.patch(`http://localhost:4500/api/v1/users//updateUserPassword`, data);
  console.log(response);
  if (response.status === 200) {
    toast.error(response.data.message);
    if (response.data.msg) {
      toast.success(response.data.msg);
      window.location.reload(true);
    }
  } else {
    throw new Error("Failed users by id");
  }
};

export const deleteusersById = async (data) => {
  const id = data.id;
  axios.defaults.withCredentials = true;
  const response = await axios.post(`http://localhost:4500/api/v1/users/delete/${id}`);
  console.log(response);
  if (response.status === 200) {
    window.location.reload(true);
  } else {
    throw new Error("Failed users by id");
  }
};
