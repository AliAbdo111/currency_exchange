import React, { useState, useEffect } from "react";
import { AntDesign, Entypo } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import UserLocation from './../component/User/UserLocation';
import PushNotification from "../component/User/Notification";

const LocationScreen = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);
  const [userLocation, setUserLocation] = useState("");
  const [error, setError] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  const hundelNavigation = () => {
    navigation.navigate("Chart");
  };

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
        setUserLocation(name);
      }
    })();
  }, []);

  const handleToggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.contanerTx}>
            <Text style={styles.text}>Where are you from?</Text>
          </View>
          <View style={styles.userLocation}>
            <Entypo name="location" size={24} color="black" />
            <Text
              style={styles.text}
            >{`Defoalt location : ${userLocation}`}</Text>
          </View>
          <View style={styles.userLocation}>
            <Entypo name="location-pin" size={24} color="black" />
            <Pressable onPress={handleToggleVisibility}>
              <Text style={location ? styles.text : styles.text2}>
                {location
                  ? `Selected location : ${location}`
                  : "location not selected"}
              </Text>
            </Pressable>
          </View>
          {isVisible && (
            <UserLocation
              setLocation={setLocation}
              handleToggleVisibility={handleToggleVisibility}
            />
          )}
  <PushNotification />
          <View style={styles.route}>
            <AntDesign name="arrowright" size={24} color="black" />
            <Pressable onPress={hundelNavigation}>
              <Text> Curouncy Rates </Text>
            </Pressable>
          </View>
        </ScrollView>
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
  route: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    alignSelf: "center",
    marginTop: 40,
    width: 200,
    borderRadius: 16,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#44691C",
  },
  text: {
    fontWeight: "500",
    fontSize: 18,
    textAlign:'right'
  },
  text2: {
    fontWeight: "400",
    fontSize: 13,
    color: "red",
  },
  contanerTx: {
    backgroundColor: "#A8D8B4",
    width: "90%",
    padding: 10,
    borderRadius: 12,
    alignSelf: "center",
  },
  userLocation: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 10,
    backgroundColor: "#A8D8B4",
    width: "90%",
    padding: 10,
    borderRadius: 12,
    alignSelf: "center",
    textAlign:'left',
  },
});
export default LocationScreen;
