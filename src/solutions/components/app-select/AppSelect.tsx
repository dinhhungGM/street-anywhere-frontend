import { Autocomplete, Box, TextField } from '@mui/material';
import React from 'react';

interface IAppSelect {
  data?: any;
  value?: any;
  optionLabel?: string;
  mappingLabelField?: string;
  isMultipleSelect?: boolean;
  onChange?: (event: any, newValue: any) => void;
}

const AppSelect = ({
  data,
  value = undefined,
  mappingLabelField,
  optionLabel = 'Label',
  isMultipleSelect = false,
  onChange,
}: IAppSelect) => {
  return (
    <>
      <Box
        sx={{
          width: '100%',
        }}
      >
        <Autocomplete
          fullWidth
          disablePortal
          value={value}
          options={data}
          onChange={onChange}
          multiple={isMultipleSelect}
          getOptionLabel={(optionItem) => optionItem[mappingLabelField]}
          renderInput={(params) => <TextField {...params} label={optionLabel} />}
        />
      </Box>
    </>
  );
};

export default React.memo(AppSelect);
