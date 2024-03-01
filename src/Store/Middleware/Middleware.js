import { call, put, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";
import { Login, SignUp } from "../API/Auth";
import { setLogin, setLoginData, setRegisterData } from "../Hook/AuthHook";
import {
  RegisterGenerator,
  addGeneratorHistoryById,
  deleteGeneratorHistoryById,
  deletegeneratorById,
  getallgenerator,
  getgeneratorById,
  updateGeneratorHistoryById,
  updategeneratorById,
} from "../API/Gen";
import {
  getByIdRegisterGen,
  getRegisterGen,
  setAddIdGenHistoryData,
  setDeleteIdGenData,
  setDeleteIdGenHistoryData,
  setRegisterGenData,
  setUpdateIdGenData,
  setUpdateIdGenHistoryData,
} from "../Hook/GenHook";
import {
  getByIdUser,
  getUser,
  setDeleteIdUserData,
  setUpdateUserData,
  setUpdatepasswordUserData,
} from "../Hook/UserHook";
import {
  deleteusersById,
  getallusers,
  getuserById,
  updatebyusersId,
  updatuserpasswordById,
} from "../API/User";

export function* watchRecipe() {
  yield takeLatest("auth/setRegister", fetchSetRegister);
  yield takeLatest("auth/setLogin", fetchSetLogin);

  yield takeLatest("gen/setRegisterGen", fetchSetRegisterGen);
  yield takeLatest("gen/getRegisterGenData", fetchGetRegisterGen);
  yield takeLatest("gen/getByIdRegisterGenData", fetchGetByIdRegisterGen);
  yield takeLatest("gen/setDeleteIdGen", fetchSetDeleteId);
  yield takeLatest("gen/setUpdateIdGen", fetchSetUpdateId);

  yield takeLatest("user/getUserData", fetchGetUserGen);
  yield takeLatest("user/getByIdUserData", fetchGetByIdUserGen);
  yield takeLatest("user/setDeleteIdUser", fetchSetDeleteIdUser);
  yield takeLatest("user/setUpdateUser", fetchSetUpdateIdUser);
  yield takeLatest("user/setUpdatepasswordUser", fetchSetUpdatePasswordIdUser);

  yield takeLatest("gen/setAddIdGenHistory", fetchSetAddGenHistoryId);
  yield takeLatest("gen/setUpdateIdGenHistory", fetchSetUpdateGenHistoryId);
  yield takeLatest("gen/setDeleteIdGenHistory", fetchSetDeleteGenHistoryId);
}

// Authentication and Authorization data

function* fetchSetRegister(action) {
  try {
    yield call(SignUp, action.payload.data);
    yield setRegisterData();
  } catch (error) {
    toast.error(error.response.data.msg);
  }
}

function* fetchSetLogin(action) {
  try {
    yield setLogin();
    yield call(Login, action.payload.data);
    yield setLoginData();
  } catch (error) {
    toast.error(error.response.data.msg);
    setLoginData();
  }
}

function* fetchSetRegisterGen(action) {
  try {
    yield call(RegisterGenerator, action.payload);
    yield setRegisterGenData();
  } catch (error) {
    toast.error(error.response.data.msg);
  }
}

function* fetchGetRegisterGen(action) {
  try {
    const data = yield call(getallgenerator);
    yield put(getRegisterGen(data));
  } catch (error) {
    toast.error(error.response.data.msg);
  }
}

function* fetchGetByIdRegisterGen(action) {
  try {
    const data = yield call(getgeneratorById, action.payload.data);
    yield put(getByIdRegisterGen(data));
  } catch (error) {
    toast.error(error.response.data.msg);
  }
}

function* fetchSetDeleteId(action) {
  try {
    yield call(deletegeneratorById, action.payload.data);
    yield setDeleteIdGenData();
  } catch (error) {
    toast.error(error.response.data.msg);
  }
}

function* fetchSetUpdateId(action) {
  try {
    yield call(updategeneratorById, action.payload.data);
    yield setUpdateIdGenData();
  } catch (error) {
    toast.error(error.response.data.msg);
  }
}

function* fetchGetUserGen(action) {
  try {
    const data = yield call(getallusers);
    yield put(getUser(data));
  } catch (error) {
    toast.error(error.response.data.msg);
  }
}

function* fetchGetByIdUserGen(action) {
  try {
    const data = yield call(getuserById, action.payload.data);
    yield put(getByIdUser(data));
  } catch (error) {
    toast.error(error.response.data.msg);
  }
}

function* fetchSetDeleteIdUser(action) {
  try {
    yield call(deleteusersById, action.payload.data);
    yield setDeleteIdUserData();
  } catch (error) {
    toast.error(error.response.data.msg);
  }
}

function* fetchSetUpdateIdUser(action) {
  try {
    yield call(updatebyusersId, action.payload.data);
    yield setUpdateUserData();
  } catch (error) {
    toast.error(error.response.data.msg);
  }
}

function* fetchSetUpdatePasswordIdUser(action) {
  try {
    yield call(updatuserpasswordById, action.payload.data);
    yield setUpdatepasswordUserData();
  } catch (error) {
    toast.error(error.response.data.msg);
  }
}

function* fetchSetAddGenHistoryId(action) {
  try {
    yield call(addGeneratorHistoryById, action.payload.data);
    yield setAddIdGenHistoryData();
  } catch (error) {
    toast.error(error.response.data.msg);
  }
}

function* fetchSetUpdateGenHistoryId(action) {
  try {
    yield call(updateGeneratorHistoryById, action.payload.data);
    yield setUpdateIdGenHistoryData();
  } catch (error) {
    toast.error(error.response.data.msg);
  }
}

function* fetchSetDeleteGenHistoryId(action) {
  try {
    yield call(deleteGeneratorHistoryById, action.payload.data);
    yield setDeleteIdGenHistoryData();
  } catch (error) {
    toast.error(error.response.data.msg);
  }
}