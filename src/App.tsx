import { useState, useEffect } from "react";
import axios from "axios";
import Map from "./Map";
import "./App.css";

function App() {
  const [error, setError] = useState(false);
  const [location, setLocation] = useState("");
  const [IPAddress, setIPAddress] = useState("");
  const [timezone, setTimezone] = useState("");
  const [ISP, setISP] = useState("");
  const [ipinput, setipinput] = useState("");
  const [latitude, setLatitude] = useState(48.86116);
  const [longitude, setLongitude] = useState(2.34191);
  const [alert, setAlert] = useState(false);
  const IPregex = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/;

  const handleSubmit = () => {
    if (IPregex.test(ipinput)) {
      setIPAddress(ipinput);
      setipinput("");
    } else {
      setAlert(true);
    }
  };

  // The API
  // METHOD 01 (WITHOUT ASYNC FUNCTION)
  // useEffect(() => {
  //   setError(false);
  //   axios
  //     .get(
  //       `https://geo.ipify.org/api/v1?apiKey=at_espTHt3OYnccEUk9jP8vhHPGH6cWY&ipAddress=${IPAddress}`
  //     )
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch(err => setError(true));
  // }, [IPAddress]);

  // METHOD 02 (USING ASYNC FUNCTION)
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `https://geo.ipify.org/api/v1?apiKey=at_espTHt3OYnccEUk9jP8vhHPGH6cWY&ipAddress=${IPAddress}`
        );
        setLocation(response.data.location.country);
        setIPAddress(response.data.ip);
        setTimezone(response.data.location.timezone);
        setISP(response.data.isp);
        setLatitude(response.data.location.lat);
        setLongitude(response.data.location.lng);
        console.log(response);
      } catch (err) {
        setError(true);
      }
    })();
  }, [IPAddress]);

  return (
    <>
      <h1>IP Address Tracker</h1>
      <div className="input-btn-container">
        <input
          placeholder="Search for any IP address"
          className="ip-input"
          onChange={(e) => {
            setipinput(e.target.value);
          }}
          onKeyDown={(e) => e.keyCode == 13 && handleSubmit()}
          value={ipinput}
          type="text"
        />
        <button className="submit-button" onClick={handleSubmit}>
          <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14">
            <path fill="none" stroke="#FFF" stroke-width="3" d="M2 1l6 6-6 6" />
          </svg>
        </button>
      </div>

      {alert && (
        <div className="alert_window">
          <h2>Entered IP is not valid</h2>
          <button
            onClick={() => {
              setAlert(false);
            }}
          >
            Try again
          </button>
        </div>
      )}

      {error ? (
        <h1>Something's wrong. Try again!</h1>
      ) : (
        <div className="ip-info-container">
          <div className="ip-info-subcontainer">
            <h4>IP address</h4>
            <h2>{IPAddress}</h2>
          </div>
          <div className="ip-info-subcontainer">
            <h4>Location</h4>
            <h2>{location}</h2>
          </div>
          <div className="ip-info-subcontainer">
            <h4>Timezone</h4>
            <h2>{timezone}</h2>
          </div>
          <div className="ip-info-subcontainer">
            <h4>ISP</h4>
            <h2>{ISP}</h2>
          </div>
        </div>
      )}
      <Map latitude={latitude} longitude={longitude} />
    </>
  );
}

export default App;
