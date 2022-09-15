import { TextField } from '@mui/material';
import React from 'react';

type AppFormInputProps = {
  type: string;
  fullWidth: boolean;
  label: string;
  form: any;
  formControlName: string;
};

const AppFormInput = ({ form, formControlName, type, fullWidth, label, ...rest }: AppFormInputProps | any) => {
  const checkControl = () => {
    if (form.touched[formControlName] && !!form.errors[formControlName]) {
      return {
        error: true,
        helperText: form.errors[formControlName],
      };
    }
    return null;
  };
  console.log('re-render');

  return (
    <>
      <TextField
        type={type || 'text'}
        fullWidth={fullWidth || true}
        label={label || 'Label'}
        {...form.getFieldProps(formControlName)}
        {...checkControl()}
        {...rest}
      />
    </>
  );
};

export default React.memo(AppFormInput);
