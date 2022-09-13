import React, {useEffect} from 'react';
import {useAppDispatch} from '../../redux/hooks';
import Geolocation from 'react-native-geolocation-service';
import {updateLocation} from '../../redux/config';
import {PermissionsAndroid, View} from 'react-native';

const GeoLocationHandler = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const setPosition = async () => {
      if (await checkLocalPermission()) {
        Geolocation.getCurrentPosition(
          position => {
            dispatch(
              updateLocation({
                location: {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                },
              }),
            );
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    };

    setPosition();
  }, [dispatch]);

  const checkLocalPermission = async () => {
    const hasLocationPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    );

    if (!hasLocationPermission) {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ).then(permStatus => {
        return permStatus === 'granted';
      });
    }

    return hasLocationPermission;
  };

  return <View />;
};

export default GeoLocationHandler;
