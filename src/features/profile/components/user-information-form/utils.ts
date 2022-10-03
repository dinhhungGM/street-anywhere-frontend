export const isValidFileType = (fileType: string): boolean => {
  const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
  return acceptedImageTypes.includes(fileType);
};
