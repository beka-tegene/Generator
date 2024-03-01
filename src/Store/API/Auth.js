import axios from "axios";
import { toast } from "react-toastify";
import { setLogin, setLoginData } from "../Hook/AuthHook";
// import Cookies from "js-cookie";
export const SignUp = async (data) => {
  console.log(data);
  axios.defaults.withCredentials = true;
  const useData = await axios.post("http://localhost:4500/api/v1/auth/register", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(useData);
  if (useData.status === 201) {
    window.location.reload(true);
  }
};

// try {
//   // Set default axios configuration to send cookies with requests
//   axios.defaults.withCredentials = true;

//   // Fetch users data
//   const response = await axios.get('http://localhost:5000/users');

//   setUsers(response.data);
// } catch (error) {
//   setError(error.message || 'Error fetching users');
// }
export const Login = async (data) => {
  try {
    console.log(data);
    //email, password
    axios.defaults.withCredentials = true;
    setLogin();
    const response = await axios.post("http://localhost:4500/api/v1/auth/login", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 400) {
      toast.error(response.data.message);
    }
    if (response.status === 200) {
      const role = response.data.user.role;
      if (role === undefined) {
        window.location.href = "/";
      } else {
        window.location.href = "/dashboard";
      }
    }
    setLoginData();
  } catch (error) {
    toast.error(error.response.data.msg);
    toast.error(error.response.data.error);
    setLoginData();
  }
};

export const ForgotPassword = async (data) => {
  console.log(data);
  axios.defaults.withCredentials = true;
  const useData = await axios.post("http://localhost:4500/api/v1/auth/forgot-password", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (useData.status === 200) {
    window.location.href = "/verify";
  } else {
    return useData;
  }
};

export const RestPassword = async (data) => {
  axios.defaults.withCredentials = true;
  const useData = await axios.post("http://localhost:4500/api/v1/auth/register", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(useData);
  if (useData.status === 201) {
    window.location.href = "/login";
  } else {
    return useData;
  }
};
