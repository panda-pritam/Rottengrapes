import "./App.css";
import "leaflet/dist/leaflet.css";
import MapComponent from "./components/map/MapContainer";
import {useState, useEffect} from "react";
import InputForm from "./components/Form/locationForm";

function App() {
  let [location, setLocation] = useState(null);
  // localStorage.setItem("place", position);

  // console.log("Location-> ", location);
  // let setData = (data) => {
  //   console.log(data);
  // };
  useEffect(() => {
    console.log("Local storage-> ", localStorage.getItem("place"));
    if (localStorage.getItem("place")) {
      console.log(JSON.parse(localStorage.getItem("place")));
      // setLocation(localStorage.getItem("place"));
      setLocation(JSON.parse(localStorage.getItem("place")));
    }
  }, []);
  return (
    <div className="App">
      <div className="headerDiv">
        <h1>Wather App</h1>
      </div>
      <div className="wraper">
        <InputForm setLocation={setLocation} />
        <MapComponent location={location} setLocation={setLocation} />
      </div>
    </div>
  );
}

export default App;
