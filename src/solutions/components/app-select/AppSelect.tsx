import { CheckBox as CheckBoxIcon, CheckBoxOutlineBlank } from '@mui/icons-material';
import { Autocomplete, Box, Checkbox, TextField } from '@mui/material';
import React from 'react';
import { AppIcon } from '../app-icon';

interface IAppSelect {
  data?: any;
  value?: any;
  optionLabel?: string;
  mappingLabelField?: string;
  isMultipleSelect?: boolean;
  maxItem?: number;
  onChange?: (event: any, newValue: any) => void;
}

const AppSelect = ({
  data,
  value = undefined,
  mappingLabelField,
  optionLabel = 'Label',
  isMultipleSelect = false,
  maxItem = 3,
  onChange,
}: IAppSelect) => {
  return (
    <>
      <Box
        sx={{
          width: '100%',
        }}>
        <Autocomplete
          fullWidth
          disablePortal
          value={value}
          options={data}
          onChange={onChange}
          disableCloseOnSelect
          multiple={isMultipleSelect}
          getOptionLabel={(optionItem) => optionItem[mappingLabelField]}
          renderInput={(params) => <TextField {...params} label={optionLabel} />}
          isOptionEqualToValue={(option, value) => option[mappingLabelField] === value[mappingLabelField]}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={<AppIcon icon={CheckBoxOutlineBlank} />}
                checkedIcon={<AppIcon icon={CheckBoxIcon} />}
                style={{ marginRight: 4 }}
                checked={selected}
              />
              {option[mappingLabelField]}
            </li>
          )}
          limitTags={maxItem}
        />
      </Box>
    </>
  );
};

export default React.memo(AppSelect);
