import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  OutputRegisterGen: [],
  InputRegisterGen: [],
  OutputByIdRegisterGen: [],
  InputDeleteIdGen: [],
  InputUpdateGen: [],
  InputAddIdGenHistory: [],
  InputUpdateIdGenHistory: [],
  InputDeleteIdGenHistory: [],
};

const GenHook = createSlice({
  name: "gen",
  initialState: initialState,
  reducers: {
    setRegisterGenData(state) { },
    setRegisterGen(state, action) {
      const newData = action.payload;
      state.InputRegisterGen.push({
        location: newData.location,
        modelManufactural: newData.modelManufactural,
        modelNumber: newData.modelNumber,
        serialNumber: newData.serialNumber,
        capacity: newData.capacity,
        engineOilCapacity: newData.engineOilCapacity,
        kukantCapacity: newData.kukantCapacity,
        batteryVoltage: newData.batteryVoltage,
        installationDate: newData.installationDate,
        region: newData.region,
        district: newData.district,
        customRegion: newData.customRegion,
        customDistrict: newData.customDistrict,
      });
    },
    getRegisterGenData(state) { },
    getRegisterGen(state, action) {
      state.OutputRegisterGen = action.payload;
    },
    getByIdRegisterGenData(state) { },
    getByIdRegisterGen(state, action) {
      state.OutputByIdRegisterGen = action.payload;
    },
    setDeleteIdGenData(state) { },
    setDeleteIdGen(state, action) {
      const newData = action.payload;
      state.InputDeleteIdGen.push({
        id: newData.id,
      });
    },
    setUpdateIdGenData(state) { },
    setUpdateIdGen(state, action) {
      const newData = action.payload;
      state.InputUpdateGen.push({
        location: newData.location,
        modelManufactural: newData.modelManufactural,
        modelNumber: newData.modelNumber,
        serialNumber: newData.serialNumber,
        capacity: newData.capacity,
        engineOilCapacity: newData.engineOilCapacity,
        kukantCapacity: newData.kukantCapacity,
        batteryVoltage: newData.batteryVoltage,
        installationDate: newData.installationDate,
        region: newData.region,
        district: newData.district,
        customRegion: newData.customRegion,
        customDistrict: newData.customDistrict,
      });
    },
    setAddIdGenHistoryData(state) { },
    setAddIdGenHistory(state, action) {
      const newData = action.payload;
      state.InputAddIdGenHistory.push({
        id: newData.id,
        details: newData.details,
        workhour: newData.workhour,
        service_date: newData.service_date,
      });
    },
    setUpdateIdGenHistoryData(state) { },
    setUpdateIdGenHistory(state, action) {
      const newData = action.payload;
      state.InputUpdateIdGenHistory.push({
        id: newData.id,
        serviceHistoryId: newData.serviceHistoryId,
        details: newData.details,
        workhour: newData.workhour,
        service_date: newData.service_date,
      });
    },
    setDeleteIdGenHistoryData(state) { },
    setDeleteIdGenHistory(state, action) {
      const newData = action.payload;
      state.InputDeleteIdGenHistory.push({
        id: newData.id,
        serviceHistoryId: newData.serviceHistoryId,
      });
    },
  },
});

export const {
  setRegisterGenData,
  setRegisterGen,
  getRegisterGenData,
  getRegisterGen,
  getByIdRegisterGenData,
  getByIdRegisterGen,
  setDeleteIdGenData,
  setDeleteIdGen,
  setUpdateIdGenData,
  setUpdateIdGen, setAddIdGenHistoryData, setAddIdGenHistory, setUpdateIdGenHistoryData, setUpdateIdGenHistory, setDeleteIdGenHistoryData, setDeleteIdGenHistory
} = GenHook.actions;

export default GenHook.reducer;
