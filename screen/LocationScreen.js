import React, { useState, useEffect } from "react";

import { View, StyleSheet } from "react-native";
import * as Location from "expo-location";

import UserLocation from "./../component/User/UserLocation";

const LocationScreen = () => {
  const [location, setLocation] = useState(null);
  const [defaultLocation, setDefaultLocation] = useState("");
  const [error, setError] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = Location.requestForegroundPermissionsAsync();
      if (status == "granted") {
        setError(false);
      } else {
        let location = await Location.getCurrentPositionAsync({});
        let address = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        let name = `${address[0].country}`;
        setDefaultLocation(name);
      }
    })();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <UserLocation
          setLocation={setLocation}
          location={location}
          defaultLocation={defaultLocation}
        />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 30,
    backgroundColor: "white",
  },
});
export default LocationScreen;
