import React, { useState } from "react";
import "./InputField.scss";
import ReactFlagsSelect from "react-flags-select";
import customLabels from "../../assets/custom-labels";

const InputField = (props) => {
  //mora biti dvokarakterni
  const [country, setCountry] = useState();

  return (
    <div className="container">
      <img
        src={`https://openweathermap.org/img/w/${
          props.icon && country == props.countryTwoCharacter
            ? props.icon
            : "10d"
        }.png`}
      />

      <ReactFlagsSelect
        selected={country}
        onSelect={(country) => {
          setCountry(country);
          props.setCountryTyped(country);
        }}
        className="flagInput"
        customLabels={customLabels}
        searchable
      />

      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => props.setQuery(e.target.value)}
        value={props.query}
        onKeyPress={props.handleKeyPress}
      />

      <button type="submit" onClick={props.submit}>
        {" "}
      </button>
    </div>
  );
};

export default InputField;
