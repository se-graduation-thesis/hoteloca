import React from "react";
import { Controller } from "react-hook-form";
import { FormControl, MenuItem, InputLabel, Select } from "@mui/material";

function SelectField(props) {
  const { form, name, label, options } = props;
  const {
    formState: { errors },
  } = form;

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => (
        <>
          <FormControl fullWidth style={{marginBottom: '30px'}}>
            <InputLabel>{label}</InputLabel>
            <Select
            //   labelId="demo-simple-select-label"
            //   id="demo-simple-select"
              value={name}
              label={label}
              {...field}
            >
              {options.map(({ value, label }) => (
                <MenuItem value={value} key={value}>{label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </>
      )}
    />
  );
}

export default SelectField;
