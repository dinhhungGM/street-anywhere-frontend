export const isValidFileType = (fileType: string): boolean => {
  const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
  return acceptedImageTypes.includes(fileType);
};

export const findKeyChange = (original, upcoming): string[] => {
  const keyChanges = [];
  for (const key of Object.keys(upcoming)) {
    if (upcoming[key] !== original[key]) {
      keyChanges.push(key);
    }
  }
  return keyChanges;
};
