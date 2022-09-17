import React, { useState } from "react";
import "./InputField.scss";
import ReactFlagsSelect from "react-flags-select";
import customLabels from "../../assets/custom-labels";

const InputField = (props) => {
  //mora biti dvokarakterni
  const [country, setCountry] = useState();

  return (
    <>
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
        onKeyPress={props.keyPressHandler}
      />
    </>
  );
};

export default InputField;
