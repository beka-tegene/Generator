import React, { useEffect, useState } from "react";
import {
  Stack,
  Typography,
  Button,
  Grid,
  Paper,
  TextField,
  Box,
  Divider,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { getByIdUserData, setUpdateUser, setUpdatepasswordUser } from "../Store/Hook/UserHook";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
const ProfileClient = () => {
  const dispatch = useDispatch();
  const token = Cookies.get("token");
  const userId = jwt_decode(token)?.userId;
  const singleUser = useSelector((state) => state.UserHook.OutputByIdUser);
  useEffect(() => {
    dispatch(getByIdUserData({ data: { userId } }));
  }, []);
  const [userData, setUserData] = useState({
    fullname: singleUser?.fullname,
    position: singleUser?.position,
    role: singleUser?.role,
    email: singleUser?.email,
  });
  const [passwordData, setPasswordData] = useState({
    oldPassword: null,
    newPassword: null,
    confirm_password: null,
  });
  useEffect(() => {
    setUserData({
      fullname: singleUser?.fullname,
      position: singleUser?.position,
      role: singleUser?.role,
      email: singleUser?.email,
    });
    setPasswordData({
      oldPassword: null,
      newPassword: null,
      confirm_password: null,
    });
  }, [singleUser]);
  const [editMode, setEditMode] = useState(false);
  const [passwordEditMode, setPasswordEditMode] = useState(false);

  const handleEdit = () => {
    setEditMode(true);
    setAnchorEl(null);
  };

  const handlePasswordEdit = () => {
    setPasswordEditMode(true);
    setAnchorEl(null);
  };

  const handleSave = () => {
    setEditMode(false);
    setPasswordEditMode(false);
    dispatch(setUpdateUser({ data: { ...userData, userId } }));
  };
  const [passwordError, setPasswordError] = useState(null);
  const handleSavePassword = () => {
    if (
      passwordData.newPassword !== passwordData.confirm_password ||
      !isValidPassword(passwordData.newPassword)
    ) {
      setPasswordError(
        "Passwords do not match or do not meet the criteria 8 length."
      );
      return;
    }

    // setEditMode(false);
    // setPasswordEditMode(false);
    dispatch(setUpdatepasswordUser({ data: { ...passwordData } }));
    // setPasswordError(null);
  };
  const isValidPassword = (password) => {
    return password.length >= 8;
  };
  const handleCancel = () => {
    setUserData({
      fullname: singleUser?.fullname,
      position: singleUser?.position,
      role: singleUser?.role,
      email: singleUser?.email,
    });
    setPasswordData({
      oldPassword: null,
      newPassword: null,
      confirm_password: null,
    });
    setEditMode(false);
    setPasswordEditMode(false);
  };

  return (
    <Stack sx={{ width: "100%", p: 2, height: "80dvh", overflowY: "scroll" }}>
       <ToastContainer />
      <Stack sx={{ width: "100%", alignItems: "center" }}>
        <Paper elevation={0} sx={{ width: "100%", p: 2, my: 2 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              variant="h5"
              sx={{ mb: 2, fontWeight: "bold", color: "#142261" }}
            >
              Login and Security
            </Typography>
            {!passwordEditMode && (
              <Box>
                <Button
                  variant="outlined"
                  color="info"
                  onClick={handlePasswordEdit}
                >
                  Update Security
                </Button>
              </Box>
            )}
            {passwordEditMode ? (
              <Box>
                <Button
                  variant="outlined"
                  color="success"
                  onClick={handleSavePassword}
                  sx={{ mr: 2 }}
                >
                  Save
                </Button>
                <Button variant="outlined" color="error" onClick={handleCancel}>
                  Cancel
                </Button>
              </Box>
            ) : null}
          </Stack>
          {passwordEditMode ? (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">Old Password</Typography>
                <TextField
                  type="password"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={passwordData.oldPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      oldPassword: e.target.value,
                    })
                  }
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">New Password</Typography>
                <TextField
                  type="password"
                  variant="outlined"
                  fullWidth
                  size="small"
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">Confirm New Password</Typography>
                <TextField
                  type="password"
                  variant="outlined"
                  fullWidth
                  size="small"
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirm_password: e.target.value,
                    })
                  }
                  sx={{ mb: 2 }}
                />
                {passwordError && (
                  <Grid item xs={12}>
                    <Typography variant="body2" color="error" fontSize={12}>
                      {passwordError}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" fontWeight={"bold"}>
                  Password
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {"********"}
                </Typography>
              </Grid>
            </Grid>
          )}
        </Paper>
        <Paper elevation={0} sx={{ width: "100%", p: 2, my: 2 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              variant="h5"
              sx={{ mb: 2, fontWeight: "bold", color: "#142261" }}
            >
              Personal Information
            </Typography>
            {!editMode && (
              <Button variant="outlined" color="info" onClick={handleEdit}>
                Edit
              </Button>
            )}
            {editMode ? (
              <Box>
                <Button
                  variant="outlined"
                  color="success"
                  onClick={handleSave}
                  sx={{ mr: 2 }}
                >
                  Save
                </Button>
                <Button variant="outlined" color="error" onClick={handleCancel}>
                  Cancel
                </Button>
              </Box>
            ) : null}
          </Stack>

          {editMode ? (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">Full Name</Typography>
                <TextField
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={userData?.fullname}
                  onChange={(e) =>
                    setUserData({ ...userData, fullname: e.target.value })
                  }
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">Position</Typography>
                <TextField
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={userData?.position}
                  onChange={(e) =>
                    setUserData({ ...userData, position: e.target.value })
                  }
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">Email</Typography>
                <TextField
                  type="email"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={userData?.email}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      email: e.target.value,
                    })
                  }
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">User Type</Typography>
                <TextField
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={userData?.role}
                  onChange={(e) =>
                    setUserData({ ...userData, role: e.target.value })
                  }
                  sx={{ mb: 2 }}
                />
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" fontWeight={"bold"}>
                  Full Name
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {singleUser?.fullname}
                </Typography>
                <Divider sx={{ mt: 1 }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" fontWeight={"bold"}>
                  Position
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {singleUser?.position}
                </Typography>
                <Divider sx={{ mt: 1 }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" fontWeight={"bold"}>
                  Email
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {singleUser?.email}
                </Typography>
                <Divider sx={{ mt: 1 }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" fontWeight={"bold"}>
                  User Type
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {singleUser?.role}
                </Typography>
                <Divider sx={{ mt: 1 }} />
              </Grid>
            </Grid>
          )}
        </Paper>
      </Stack>
    </Stack>
  );
};

export default ProfileClient;
