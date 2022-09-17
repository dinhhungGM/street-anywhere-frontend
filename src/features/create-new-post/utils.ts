import _ from 'lodash';
export const constructPostPayload = (formValues: any, userId: any): FormData => {
  const fd = new FormData();
  fd.append('title', formValues.title);
  fd.append('shortTitle', formValues.shortTitle);
  fd.append('description', formValues.description);
  fd.append('location', formValues.location);
  fd.append('latitude', formValues.latitude);
  fd.append('longitude', formValues.longitude);
  fd.append('userId', userId);
  fd.append('type', formValues.file.type);
  fd.append('size', formValues.file.size);
  fd.append('media', formValues.file);
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
