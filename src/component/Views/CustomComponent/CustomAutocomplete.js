import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from '@mui/material';

export default function CustomAutocomplete({ options, setOptionsSelected, error, label, id,defaultValue }) {
  const [autocompleteValues, setAutocompleteValues] = useState([]);

  const handleChange = (event, value) => {
    setAutocompleteValues(value);
    setOptionsSelected(value);
  };
  console.log(autocompleteValues);
  return (
    <div >
      <Autocomplete
        multiple
        id={id}
        name={id}
        // defaultValue={defaultValue}
        options={options}
        getOptionLabel={(option) => option?.name}
        value={autocompleteValues}
        onChange={handleChange}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            placeholder="Favorites"
            error={error}
          />
        )}
      />
    </div>
  );
}

