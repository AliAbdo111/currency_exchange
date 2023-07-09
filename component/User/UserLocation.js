import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Loader from './../Loader';


export default function UserLocation({ setLocation, handleToggleVisibility }) {
  const [countries, setCountries] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [isloading, setLoading] = useState(true)
  useEffect(() => {
    fetch("https://restcountries.com/v2/all")
      .then((response) => response.json())
      .then((data) => {
        setLoading(false)
        setCountries(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleRegionChange = (region) => {
    setSelectedRegion(region);
  };

  const filteredCountries = selectedRegion
    ? countries.filter((country) => country.region === selectedRegion)
    : countries;

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedRegion}
        onValueChange={handleRegionChange}
        style={{ width: "80%" }}
      >
        <Picker.Item label="Select Region" value="All regions" />
        <Picker.Item label="Africa" value="Africa" />
        <Picker.Item label="Americas" value="Americas" />
        <Picker.Item label="Asia" value="Asia" />
        <Picker.Item label="Europe" value="Europe" />
        <Picker.Item label="Oceania" value="Oceania" />
      </Picker>
     {isloading? <Loader />
      : <FlatList
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
      />}
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
});
