export const isExistLatAndLong = (selectedPost): boolean => {
  return selectedPost && selectedPost.latitude && selectedPost.longitude;
}