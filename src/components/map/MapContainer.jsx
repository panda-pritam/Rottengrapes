import React, {useEffect, useState, useRef} from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  CircleMarker,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./map.module.css";
import "leaflet/dist/leaflet.css";
import {Icon, marker} from "leaflet";
import markImg from "./img/marker.png";
import {useSnackbar} from "notistack";
import axios from "axios";
import {
  getArray,
  getDateArray,
  getIssRainArray,
} from "../../utils/array_functions";

const markerIcon = new Icon({
  iconUrl: markImg,
  iconSize: [35, 35], // size of the icon
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

const ClickableMap = ({onClick}) => {
  useMapEvents({
    click(e) {
      onClick(e.latlng);
    },
  });

  return null;
};

const MapComponent = ({location, setLocation}) => {
  const markerRef = useRef(null);
  let [jsonData, setJsonData] = useState(null);
  let [temp, setTemp] = useState(null);
  let [rain, setRain] = useState(null);
  let [date, setDate] = useState(null);
  let [wind, setWind] = useState(null);

  const {enqueueSnackbar, closeSnackbar} = useSnackbar();
  console.log("Location in map-> ", location);
  const [position, setPosition] = useState({
    lat: 22.3511148,
    lng: 78.6677428,
  });
  useEffect(() => {
    console.log("postion at first run -> ", position);
  }, []);

  useEffect(() => {
    if (location) {
      setPosition(location);
    }
    (async () => {
      try {
        let api_res = await axios(
          `https://api.open-meteo.com/v1/forecast?latitude=${position.lat}&longitude=${position.lng}&hourly=temperature_2m,rain,wind_speed_10m,soil_temperature_0cm`
        );
        console.log(api_res.data.hourly);
        setJsonData(api_res.data.hourly);
      } catch (error) {}
    })();
  }, [location, position]);

  useEffect(() => {
    if (jsonData) {
      setDate(getDateArray(jsonData.time));
      setRain(getIssRainArray(jsonData.rain));
      setTemp(getArray(jsonData.soil_temperature_0cm));
      setWind(getArray(jsonData.wind_speed_10m));

      console.log("data-> ");
      console.log(temp);
      console.log(rain);
      console.log(date);
      console.log(wind);
    }
  }, [jsonData]);

  const handleClick = latlng => {
    setLocation(null);
    console.log("longitide and latitude ", latlng);
    setPosition(latlng);
  };
  const onButtonClickHandler = e => {
    localStorage.setItem("place", JSON.stringify(position));
  };

  return (
    <MapContainer
      center={[position.lat, position.lng]}
      zoom={3}
      // style={{ height: "100vh", width: "75%" }}
      className={styles.MapContainer}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <ClickableMap onClick={handleClick} />
      {position && (
        <>
          <Marker position={position} icon={markerIcon}>
            <Popup className={styles.mainPopBox} ref={markerRef}>
              {date ? (
                date.map((ele, idx) => {
                  return (
                    <Box className={styles.contentBox}>
                      <Box className={styles.subBox}>
                        <span className={styles.lable}>Date:</span>
                        <span>{ele}</span>
                      </Box>
                      <Box className={styles.subBox}>
                        <span className={styles.lable}>Temp:</span>
                        <span>
                          {temp[idx]}
                          <span>&#176;</span>C
                        </span>
                      </Box>
                      <Box className={styles.subBox}>
                        <span className={styles.lable}>Wind Speed:</span>
                        <span>{wind[idx]} km/hr.</span>
                      </Box>
                      <Box className={styles.subBox}>
                        <span className={styles.lable}>Rain:</span>
                        <span>{rain[idx] ? "Rain expexted" : "No rain"}</span>
                      </Box>
                    </Box>
                  );
                })
              ) : (
                <Box>data is loading....</Box>
              )}
              <Button
                variant="contained"
                className={styles.btn}
                onClick={onButtonClickHandler}
              >
                Set as favorite city.
              </Button>
            </Popup>
          </Marker>
          <CircleMarker
            center={position}
            radius={60} // Adjust radius as needed
            color="blue"
          >
            <Popup className={styles.mainPopBox}>
              {date ? (
                date.map((ele, idx) => {
                  return (
                    <Box className={styles.contentBox}>
                      <Box className={styles.subBox}>
                        <span className={styles.lable}>Date:</span>
                        <span>{ele}</span>
                      </Box>
                      <Box className={styles.subBox}>
                        <span className={styles.lable}>Temp:</span>
                        <span>
                          {temp[idx]}
                          <span>&#176;</span>C
                        </span>
                      </Box>
                      <Box className={styles.subBox}>
                        <span className={styles.lable}>Wind Speed:</span>
                        <span>{wind[idx]} km/hr.</span>
                      </Box>
                      <Box className={styles.subBox}>
                        <span className={styles.lable}>Rain:</span>
                        <span>{rain[idx] ? "Rain expexted" : "No rain"}</span>
                      </Box>
                    </Box>
                  );
                })
              ) : (
                <Box>data is loading....</Box>
              )}
              <Button
                variant="contained"
                className={styles.btn}
                onClick={onButtonClickHandler}
              >
                Set as favorite city.
              </Button>
            </Popup>
          </CircleMarker>
        </>
      )}
    </MapContainer>
  );
};

export default MapComponent;
