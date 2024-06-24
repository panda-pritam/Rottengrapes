import {useState, useEffect} from "react";
import axios from "axios";
import styles from "./form.module.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useSnackbar} from "notistack";
let api_key = "df4e157d38044b1b8cf62d85353dc819";
export default function InputForm({setLocation}) {
  //   console.log(setLocation);
  const {enqueueSnackbar, closeSnackbar} = useSnackbar();
  let [city, setCity] = useState("");
  let [longitude, setLongitude] = useState(null);
  let [latitude, setLatitude] = useState(null);
  let onCitySubmitHandler = async e => {
    e.preventDefault();
    console.log(city);
    if (city) {
      setCity(city);
      try {
        let api_res = await axios(
          `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${api_key}`
        );
        console.log(api_res.data);
        console.log(api_res.data.results[0].geometry);
        // setData(api_res.data.results[0].geometry);
        setLocation(api_res.data.results[0].geometry);
      } catch (error) {
        console.log(error);
        enqueueSnackbar("City Not Exist.", {
          variant: "warning",
        });
      }
    } else {
      enqueueSnackbar("please Enter valid city name.", {variant: "warning"});
    }
    //let obj = { lat: latitude, lng: longitude };
  };
  let onLngLatSubmitHandler = e => {
    e.preventDefault();
    console.log(latitude, longitude);
    let obj = {lat: latitude, lng: longitude};
    // setData(obj);
    setLocation(obj);
  };
  return (
    <div className={styles.form}>
      <Box className={styles.header}>
        <h2>Enter your location</h2>
      </Box>
      <Box>
        <h3>Enter Your City</h3>
        <form onSubmit={onCitySubmitHandler}>
          <TextField
            id="standard-basic"
            label="Enter City"
            variant="outlined"
            value={city}
            onChange={e => {
              setCity(e.target.value);
            }}
            sx={{m: 2}}
          />

          <Button
            variant="contained"
            type="submit"
            sx={{m: 1}}
            className={styles.btn}
          >
            Search
          </Button>
        </form>

        <form
          onSubmit={onLngLatSubmitHandler}
          className={styles.hideMobileView}
        >
          <h3>------ OR -------</h3>
          <h3>Enter longitude and latitude</h3>
          <TextField
            id="standard-basic"
            label="Enter longitude"
            variant="outlined"
            onChange={e => setLongitude(e.target.value)}
            sx={{m: 2}}
            required
            type="number"
          />
          <TextField
            id="standard-basic"
            label="Enter latitude"
            variant="outlined"
            onChange={e => setLatitude(e.target.value)}
            sx={{m: 2}}
            type="number"
            required
          />
          <Button
            variant="contained"
            type="submit"
            sx={{m: 2}}
            className={styles.btn}
          >
            <p className={styles.btnText}>Search</p>
          </Button>
        </form>
      </Box>
    </div>
  );
}
