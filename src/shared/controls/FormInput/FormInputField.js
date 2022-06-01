import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { TextField} from "@mui/material";

function FormInputField(props) {
  const { control } = useFormContext();
  const { name, label, errorobj, style, type } = props;
  let error = false;
  let errorMessage = "";
  if (errorobj && errorobj.hasOwnProperty(name)) {
    error = true;
    errorMessage = errorobj[name].message;
  }

  return (
    <Controller
      render={({ field }) => (
            <TextField
            variant="outlined"
            {...field}
            {...props}
            name={name}
            label={label}
            fullWidth={true}
            error={error}
            helperText={errorMessage}
            style={style}
            type={type}
            />
        )}
      name={name}
      control={control}
    />
  );
}

export default FormInputField;
