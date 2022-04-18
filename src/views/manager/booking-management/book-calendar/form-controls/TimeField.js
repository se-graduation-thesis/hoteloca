import React from "react";
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";

function TimeField(props) {
  const { form, name, label } = props;
  const {
    formState: { errors },
  } = form;

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => (
        <>
          <TextField
            {...field}
            fullWidth
            label={label}
            type="datetime-local"
            // defaultValue="2017-05-24T10:30"
            // sx={{ width: 250 }}
            InputLabelProps={{
              shrink: true,
            }}
            style={{marginBottom: '30px'}}
          />
        </>
      )}
    />
  );
}

export default TimeField;
