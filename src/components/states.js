import axios from "axios";
import React, { useEffect, useState } from "react";

function States() {
  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [selectCountry, setSelectCountry] = useState("");
  const [selectState, setSelectState] = useState("");
  const [selectCity, setSelectCity] = useState("");

  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await axios.get(
          "https://crio-location-selector.onrender.com/countries"
        );
        if (response.status === 200) {
          setCountry(response.data);
        }
      } catch (err) {
        console.error("500", err || err.statusCode);
      }
    }
    fetchCountries();
  }, []);

  useEffect(() => {
    async function fetchStates() {
      try {
        const response = await axios.get(
          ` https://crio-location-selector.onrender.com/country=${selectCountry}/states`
        );
        if (response.status === 200) {
          setState(response.data);
        }
      } catch (err) {
        console.error("500", err || err.statusCode);
      }
    }
    fetchStates();
  }, [selectCountry]);
  useEffect(() => {
    async function fetchCities() {
      try {
        const response = await axios.get(
          `https://crio-location-selector.onrender.com/country=${selectCountry}/state=${selectState}/cities`
        );
        if (response.status === 200) {
          setCity(response.data);
        }
      } catch (err) {
        console.error("500", err || err.statusCode);
      }
    }
    fetchCities();
  }, [selectCountry, selectState]);

  const handleCountryChange = (e) => {
    setSelectCountry(e.target.value);
  };
  const handleStateChange = (e) => {
    setSelectState(e.target.value);
  };
  const handleCityChange = (e) => {
    setSelectCity(e.target.value);
  };

  console.log(selectCountry);

  return (
    <div sstyle={{ padding: "20px", maxWidth: "400px" }}>
      <h1>Select Location</h1>
      <select
        value={selectCountry}
        onChange={handleCountryChange}
        style={{
          padding: "10px",
          fontSize: "16px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          marginRight:'10px'
        }}
      >
        <option>select Country</option>
        {country.map((idx) => (
          <option key={idx}>{idx}</option>
        ))}
      </select>
      <select
        value={selectState}
        onChange={handleStateChange}
        style={{
          padding: "10px",
          fontSize: "16px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          marginRight:'10px'
        }}
      >
        <option>select State</option>
        {state.map((idx) => (
          <option key={idx}>{idx}</option>
        ))}
      </select>
      <select
        value={selectCity}
        onChange={handleCityChange}
        style={{
          padding: "10px",
          fontSize: "16px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          marginRight:'10px'
        }}
      >
        <option>select City</option>
        {city.map((idx) => (
          <option key={idx}>{idx}</option>
        ))}
      </select>
      <div style={{marginTop: '10px'}}>
        {selectCity && selectState && selectCountry && (
          <p>
            <b>You selected </b><b style={{fontSize:'25px'}}>{selectCity}</b>, <b><span style={{color:'GrayText', fontSize:'20px'}}>{selectState}, {selectCountry}</span></b>
          </p>
        )}
      </div>
    </div>
  );
}

export default States;
