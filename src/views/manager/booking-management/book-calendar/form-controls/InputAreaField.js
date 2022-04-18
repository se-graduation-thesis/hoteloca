import React from "react";
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";

function InputAreaField(props) {
  const { form, name, label } = props;
  const {
    formState: { errors },
  } = form;

  return (
      <Controller
        name={name}
        control={form.control}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            label={label}
            helperText={errors[name]?.message}
            error={!!errors[name]}
            multiline
            rows={3}
            style={{marginBottom: '30px'}}
          />
        )}
      />
  );
}

export default InputAreaField;
