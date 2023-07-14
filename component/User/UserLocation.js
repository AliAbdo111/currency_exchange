import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";

import Loader from "./../Loader";
import { useNavigation } from "@react-navigation/native";
import PushNotification from "../../component/User/Notification";
import { AntDesign, Entypo } from "@expo/vector-icons";
import ListHeaderComponent from "./ListHeaderComponent";

export default function UserLocation({
  setLocation,
  location,
  defaultLocation,
}) {
  const [countries, setCountries] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [isloading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetch("https://restcountries.com/v2/all")
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setCountries(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleRegionChange = (region) => {
    setSelectedRegion(region);
  };

  const hundelNavigation = () => {
    navigation.navigate("Chart");
  };

  const handleToggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const filteredCountries = selectedRegion
    ? countries.filter((country) => country.region === selectedRegion)
    : countries;

  return (
    <View style={styles.container}>
      {isloading ? (
        <Loader />
      ) : (
        <FlatList
          ListHeaderComponent={
            <>
              <ListHeaderComponent
                defaultLocation={defaultLocation}
                handleToggleVisibility={handleToggleVisibility}
                location={location}
                selectedRegion={selectedRegion}
                handleRegionChange={handleRegionChange}
              />
            </>
          }
          data={filteredCountries}
          keyExtractor={(item) => item.alpha2Code}
          renderItem={({ item }) => (
            <View style={styles.country}>
              <Pressable
                onPress={() => {
                  setLocation(item.name);
                  handleToggleVisibility();
                }}
              >
                <Text style={styles.countryName}>{item.name}</Text>
              </Pressable>
            </View>
          )}
          ListFooterComponent={
            <>
              <PushNotification />
              <Pressable onPress={hundelNavigation}>
                <View style={styles.route}>
                  <AntDesign name="arrowright" size={24} color="black" />
                  <Text> Curouncy Rates </Text>
                </View>
              </Pressable>
            </>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 30,
  },
  country: {
    borderColor: "#ccc",
    padding: 5,
    marginVertical: 3,
    width: "80%",
  },

  countryName: {
    fontWeight: "500",
    fontSize: 14,
    marginBottom: 5,
    alignSelf: "flex-end",
    textAlign: "right",
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
    marginBottom: 40,
    padding: 5,
    backgroundColor: "#91991C",
  },
});
