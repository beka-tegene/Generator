import axios from "axios";
import { toast } from "react-toastify";

export const RegisterGenerator = async (data) => {
  axios.defaults.withCredentials = true;
  try {
    const useData = await axios.post(`http://localhost:4500/api/v1/gen/register_generator`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (useData.status === 201) {
      window.location.reload(true);
    }
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

export const getallgenerator = async (data) => {
  axios.defaults.withCredentials = true;
  const response = await axios.get(`http://localhost:4500/api/v1/gen/get_all_genrators_info`);

  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error("Failed to fetch recipes");
  }
};

export const getgeneratorById = async (data) => {
  const id = data.id;
  console.log(id);
  axios.defaults.withCredentials = true;
  const response = await axios.get(
    `http://localhost:4500/api/v1/gen/get_single_genrators_info/${id}`
  );

  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error("Failed to fetch recipes by id");
  }
};

export const updategeneratorById = async (data) => {
  axios.defaults.withCredentials = true;
  try {
    const response = await axios.patch(
      `http://localhost:4500/api/v1/gen/update_genrators_info/${data}`
    );

    if (response.status === 200) {
      window.location.reload(true);
    } else {
      throw new Error("Failed to fetch recipes by id");
    }
  } catch (error) {
    toast.error(error.response.data.error);
  }
};




export const deletegeneratorById = async (data) => {
  const id = data.id;
  axios.defaults.withCredentials = true;
  try {
    const response = await axios.delete(
      `http://localhost:4500/api/v1/gen/delete_genrators_info/${id}`
    );
    console.log(response);
    if (response.status === 200) {
      window.location.reload(true);
    } else {
      throw new Error("Failed to fetch recipes by id");
    }
  } catch (error) {
    toast.error(error.response.data.error);
  }
};


export const addGeneratorHistoryById = async (data) => {
  const id = data.id;
  console.log(data);
  axios.defaults.withCredentials = true;
  try {
    const response = await axios.post(
      `http://localhost:4500/api/v1/gen/${id}/service-history `, data, {
      headers: {
        "Content-Type": "application/json",
      },
    }
    );

    if (response.status === 200) {
      window.location.reload(true);
    } else {
      throw new Error("Failed to fetch recipes by id");
    }
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

export const updateGeneratorHistoryById = async (data) => {
  const id = data.id;
  const serviceHistoryId = data.serviceHistoryId;
  console.log(data);
  axios.defaults.withCredentials = true;
  try {
    const response = await axios.put(
      `http://localhost:4500/api/v1/gen/${id}/service-history/${serviceHistoryId}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    }
    );

    if (response.status === 200) {
      window.location.reload(true);
    } else {
      throw new Error("Failed to fetch recipes by id");
    }
  } catch (error) {
    toast.error(error.response.data.error);
  }
};


export const deleteGeneratorHistoryById = async (data) => {
  const id = data.id;
  const serviceHistoryId = data.serviceHistoryId;
  console.log(data);
  axios.defaults.withCredentials = true;
  try {
    const response = await axios.delete(
      `http://localhost:4500/api/v1/gen/delete_service_history/${id}/${serviceHistoryId}`
    );
    console.log(response);
    if (response.status === 200) {
      window.location.reload(true);
    } else {
      throw new Error("Failed to fetch recipes by id");
    }
  } catch (error) {
    toast.error(error.response.data.error);
  }
};
