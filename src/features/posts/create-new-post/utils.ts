import _ from 'lodash';

export const constructPostPayload = (formValues: any, userId: any, typeUpload: string): FormData => {
  const fd = new FormData();
  fd.append('title', formValues.title);
  fd.append('shortTitle', formValues.shortTitle);
  fd.append('description', formValues.description);
  fd.append('location', formValues.location);
  fd.append('latitude', formValues.latitude);
  fd.append('longitude', formValues.longitude);
  fd.append('userId', userId);
  if (typeUpload === 'image') {
    fd.append('type', formValues.file.type);
    fd.append('size', formValues.file.size);
    fd.append('media', formValues.file);
  } else {
    fd.append('type', 'video');
    fd.append('videoYtbUrl', formValues.ytbVideoUrl);
  }
  fd.append(
    'tags',
    JSON.stringify(
      _.map(formValues.tags, (strValue) => {
        const value = JSON.parse(strValue);
        return value.id;
      }),
    ),
  );
  fd.append(
    'categories',
    JSON.stringify(
      _.map(formValues.categories, (strValue) => {
        const value = JSON.parse(strValue);
        return value.id;
      }),
    ),
  );
  return fd;
};

export const mapJson2Obj = (arr: string[]) => {
  return _.map(arr, (item) => JSON.parse(item));
};

export const setValueForControl = (form, fieldName, value): void => {
  if (form.field) {
    form.setFieldValue(fieldName, value);
  }
};

export const isValidFileType = (fileType: string): boolean => {
  const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
  return acceptedImageTypes.includes(fileType);
};
