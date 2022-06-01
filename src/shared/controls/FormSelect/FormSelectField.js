import React from "react";
import { useFormContext, Controller } from "react-hook-form";


import styled from "styled-components";
import { FormControl, InputLabel, MenuItem, Select, FormHelperText} from "@mui/material";

const StyledInputLabel = styled(InputLabel)`
  && {
    .req-label {
      color: #f44336;
    }
  }
`;


const MuiSelect = (props) => {
  const { name, options, errorobj, label } = props;
  let error = false;
  let errorMessage = "";
  if (errorobj && errorobj.hasOwnProperty(name)) {
    error = true;
    errorMessage = errorobj[name].message;
  }

  return (
    <FormControl fullWidth={true} error={error}>
      <StyledInputLabel style={{marginLeft: props?.style?.marginLeft, marginRight: props?.style?.marginRight, marginTop: props?.style?.marginTop}} id="select-label">{label}</StyledInputLabel>
      <Select id={name} labelId="select-label" label={label} {...props}>
        {options.map((item) => (
          <MenuItem key={item.id} value={item.id} onClick={() => {
              if(props.changevalue !== undefined){
                props.changevalue(item);
              }
            }}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{errorMessage}</FormHelperText>
    </FormControl>
  );
};

function FormSelect(props) {
  const { control } = useFormContext();
  const { name, label, style} = props;
  return (
    <React.Fragment>
      <Controller
      render={({field}) => (
            <MuiSelect 
            label={label}
            name={name}
            defaultValue=""
            style={{
              ...style
            }}
            {...field}
            {...props}
            ref={null}
            />
         )}
        control={control}
        name={name}
      />
    </React.Fragment>
  );
}

export default FormSelect;