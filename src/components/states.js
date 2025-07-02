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
      if (!selectCountry) {
        setState([]);
        setCity([]);
        setSelectState("");
        setSelectCity("");
        return;
      }
      try {
        const response = await axios.get(
          `https://crio-location-selector.onrender.com/country=${selectCountry}/states`
        );
        if (response.status === 200) {
          setState(response.data);
          setSelectState("");
          setCity([]);
          setSelectCity("");
        }
      } catch (err) {
        console.error("500", err || err.statusCode);
        setState([]);
        setSelectState("");
      }
    }
    fetchStates();
  }, [selectCountry]);
  useEffect(() => {
    if (!selectState) {
      setCity([]);
      setSelectCity("");
      return;
    }
    async function fetchCities() {
      try {
        const response = await axios.get(
          `https://crio-location-selector.onrender.com/country=${selectCountry}/state=${selectState}/cities`
        );
        if (response.status === 200) {
          setCity(response.data);
          setSelectCity("");
        }
      } catch (err) {
        console.error("500", err || err.statusCode);
        setCity([]);
        setSelectCity("");
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
          marginRight: "10px",
        }}
      >
        <option value=''>select Country</option>
        {country.map((idx) => (
          <option key={idx} value={idx}>{idx}</option>
        ))}
      </select>
      <select
        value={selectState}
        onChange={handleStateChange}
        disabled={!selectCountry}
        style={{
          padding: "10px",
          fontSize: "16px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          marginRight: "10px",
        }}
      >
        <option value=''>select State</option>
        {state.map((idx) => (
          <option key={idx} value={idx}>{idx}</option>
        ))}
      </select>
      <select
        value={selectCity}
        onChange={handleCityChange}
        disabled={!selectState}
        style={{
          padding: "10px",
          fontSize: "16px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          marginRight: "10px",
        }}
      >
        <option value=''>select City</option>
        {city.map((idx) => (
          <option key={idx} value={idx}>{idx}</option>
        ))}
      </select>
      <div style={{ marginTop: "10px" }}>
        {selectCity ? (
          <span>You selected {selectCity}, {selectState}, {selectCountry}</span>
        ) : selectState ? (
          <span>You selected {selectState}, {selectCountry}</span>
        ) : selectCountry ? (
          <span>You selected {selectCountry}</span>
        ) : null}
      </div>
    </div>
  );
}

export default States;
