import React, { useEffect } from 'react';
import { AppMap } from '../../solutions/components/app-map';

const CreateNewPost = () => {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log('Latitude is :', position.coords.latitude);
      console.log('Longitude is :', position.coords.longitude);
    });
  }, []);

  return (
    <>
      <AppMap />
    </>
  );
};

export default CreateNewPost;
