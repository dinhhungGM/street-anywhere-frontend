import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import React from 'react';

interface IAppRadioGroupProps {
  control?: any;
  label?: string;
  value?: string | null;
  isFullWidth?: boolean;
  isHorizontal?: boolean;
  options?: { id: number; value: string; label: string }[];
  onChange?: (e) => any;
}
const AppRadioGroup = ({
  value,
  options = [],
  label = 'Label',
  isFullWidth = true,
  control = <Radio />,
  isHorizontal = true,
  onChange,
}: IAppRadioGroupProps) => {
  return (
    <>
      <FormControl fullWidth={isFullWidth}>
        <FormLabel
          id='demo-radio-buttons-group-label'
          sx={{
            fontWeight: 700,
          }}
        >
          {label}
        </FormLabel>
        <RadioGroup
          row={isHorizontal}
          name='radio-buttons-group'
          onChange={onChange}
          value={value}
          aria-labelledby='demo-radio-buttons-group-label'
        >
          {options.map((item) => (
            <FormControlLabel control={control} key={item.id} value={item.value} label={item.label} />
          ))}
        </RadioGroup>
      </FormControl>
    </>
  );
};

export default React.memo(AppRadioGroup);
