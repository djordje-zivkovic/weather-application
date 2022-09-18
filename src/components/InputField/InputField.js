import React, { useState } from "react";
import "./InputField.scss";
import ReactFlagsSelect from "react-flags-select";
import customLabels from "../../assets/custom-labels";
import search_icon from "../../assets/search_icon.svg";
import loading_icon from "../../assets/loading_icon.svg";

const InputField = (props) => {
  //mora biti dvokarakterni
  const [country, setCountry] = useState();
  const value = true;

  return (
    <div className="input-field">
      <img
        className="icon"
        src={`https://openweathermap.org/img/w/${
          props.icon && country == props.countryTwoCharacter
            ? props.icon
            : "01d"
        }.png`}
      />

      <ReactFlagsSelect
        selected={country}
        onSelect={(country) => {
          setCountry(country);
          props.setCountryTyped(country);
        }}
        className="input-flag"
        customLabels={customLabels}
        searchable
      />
      <div className="input-city-wrapper">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => props.setQuery(e.target.value)}
          value={props.query}
          onKeyPress={props.handleKeyPress}
          className="input-city-field"
        />

        <button type="submit" onClick={props.submit} className="search-button">
          {props.loading ? (
            <img
              className="loading-icon"
              src={loading_icon}
              alt="loading"
            ></img>
          ) : (
            <img className="search-icon" src={search_icon} alt="search"></img>
          )}
        </button>
      </div>
    </div>
  );
};

export default InputField;
