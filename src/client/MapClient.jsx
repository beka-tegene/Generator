import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet"; // Import Leaflet library
import logo from "../assets/623768.png";
import { Button, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getRegisterGenData } from "../Store/Hook/GenHook";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const ChangeView = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom]);

  return null;
};
const MapClient = ({zoom , position}) => {

  const allGen = useSelector((state) => state.GenHook.OutputRegisterGen);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRegisterGenData());
  }, []);
  const navigate = useNavigate();

  const customIcon = new L.Icon({
    iconUrl: logo,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  return (
    <div className='h-[89vh] w-full px-4 pt-2'>
       <ToastContainer />
      <div>
        <h1 className='text-[24px] font-medium'>Generator list on Map</h1>
      </div>
      <div className="m-auto flex flex-col items-end justify-start rounded overflow-hidden">
        <MapContainer
          center={position}
          zoom={zoom}
          style={{ height: "80vh", width: "100%", padding: "10px" }}
        >
          <ChangeView center={position} zoom={zoom} />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {allGen?.map((location, index) => (
            <Marker
              key={index}
              position={location?.coordinates}
              icon={customIcon}
            >
              <Popup>
                <Stack alignItems={"center"} justifyContent={"center"}>
                  <img
                    src={location.pictures[0]}
                    alt="gc-logo"
                    style={{ width: "50%", height: "60px" }}
                  />
                </Stack>
                <Typography fontSize={14}>{location.name}</Typography>
                <Typography fontSize={12}>
                  Serial Number : {location.serial_number}
                </Typography>
                <Typography fontSize={12}>
                  Model Number : {location.model_number}
                </Typography>
                <Stack alignItems={"flex-end"}>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => navigate(`/table/${location._id}/detail`)}
                  >
                    Detail
                  </Button>
                </Stack>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapClient;
