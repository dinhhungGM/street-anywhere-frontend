export const constructPostPayload = (formValues: any): FormData => {
  const fd = new FormData();
  fd.append('title', formValues.title);
  fd.append('shortTitle', formValues.shortTitle);
  fd.append('description', formValues.description);
  fd.append('location', formValues.location);
  fd.append('latitude', formValues.latitude);
  fd.append('longitude', formValues.longitude);
  fd.append('userId', '1');
  fd.append('type', formValues.file.type);
  fd.append('size', formValues.file.size);
  fd.append('media', formValues.file);
  fd.append('tags', JSON.stringify([1, 2, 3, 4]));
  fd.append('categories', JSON.stringify([1, 2, 3, 4]));
  return fd;
};
