import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [country, setCountry] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectCountry, setSelectCountry] = useState("");
  const [selectState, setSelectState] = useState("");
  const [selectCities, setSelectCities] = useState("");

  useEffect(() => {
    //for country
    axios
      .get("https://crio-location-selector.onrender.com/countries")
      .then((res) => setCountry(res.data))
      .catch((err) => console.error("Error fetching contries", err));
  }, []);

  useEffect(() => {
    //for state
    if (selectCountry) {
      axios
        .get(
          `https://crio-location-selector.onrender.com/country=${selectCountry}/states`
        )
        .then((res) => {
          setStates(res.data);
          setCities([]);
          setSelectCities("");
          setSelectState("");
        })
        .catch((err) => console.error("Error fetching state", err));
    }
  }, [selectCountry]);

  useEffect(() => {
    //for cities
    if (selectCountry && selectState) {
      axios
        .get(
          `https://crio-location-selector.onrender.com/country=${selectCountry}/state=${selectState}/cities`
        )
        .then((res) => {setCities(res.data)  
          setSelectCities("")
        })
        .catch((err) => console.error("Error fetching cities", err));
    }
  }, [selectCountry, selectState]);

  return (
    <div className="App">
      <h1>Select Location</h1>
      <div className="dropdown">
        <select
          value={selectCountry}
          onChange={(e) => setSelectCountry(e.target.value)}
          className="drop_item"
        >
          <option value="" disabled>
            Select Country
          </option>

          {country.map((items) => {
            return (
              <option key={items} value={items}>
                {items}
              </option>
            );
          })}
        </select>
        <select
          value={selectState}
          onChange={(e) => setSelectState(e.target.value)}
          className="drop_item"
        >
          <option value="" disabled>
            Select State
          </option>

          {states.map((state) => {
            return (
              <option key={state} value={state}>
                {state}
              </option>
            );
          })}
        </select>
        <select
          value={selectCities}
          onChange={(e) => setSelectCities(e.target.value)}
          className="drop_item"
        >
          <option value="" disabled>
            Select City
          </option>

          {cities.map((city) => {
            return (
              <option key={city} value={city}>
                {city}
              </option>
            );
          })}
        </select>
      </div>

      {selectCities && (
        <h2>
          You selected <span>{selectCities}</span>,<span className="grey"> {selectState}, {selectCountry}</span>
        </h2>
      )}
    </div>
  );
}

export default App;