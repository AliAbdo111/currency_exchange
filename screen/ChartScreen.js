import { Picker } from "@react-native-picker/picker";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet,Alert } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { LineChart } from "react-native-chart-kit";


import currencyCodes from "../currency.json";

const ChartScreen = () => {
  const [currencyOne, setCurrencyOne] = useState("USD");
  const [currencyTwo, setCurrencyTwo] = useState("EUR");
  const [chartData, setChartData] = useState(null);
  const [chartDuration, setChartDuration] = useState("1d");

  useEffect(() => {
    const API_KEY = "your_api_key_here";
    const url = `https://api.currency-exchange-rates.com/v1/history?base_currency=${currencyOne}&target_currency=${currencyTwo}&apikey=${API_KEY}&interval=${chartDuration}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const labels = Object.keys(data["history"]);
        const datasets = [
          {
            data: Object.values(data["history"]),
          },
        ];
        setChartData({ labels, datasets });
      })
      .catch((error) => {
        Alert.alert(error.message)
      });
  }, [currencyOne, currencyTwo, chartDuration]);

  return (
    <View>
      <View style={styles.sectiPicker}>
        <View style={styles.Picker}>
          <Picker
            selectedValue={currencyOne}
            onValueChange={(value) => setCurrencyOne(value)}
          >
            {Object.keys(currencyCodes).map((currencyCode) => (
              <Picker.Item
                key={currencyCode}
                label={currencyCode}
                value={currencyCode}
              />
            ))}
          </Picker>
        </View>
        <AntDesign name="retweet" size={27} color="black" />
        <View style={styles.Picker}>
          <Picker
            selectedValue={currencyTwo}
            onValueChange={(value) => setCurrencyTwo(value)}
          >
            {Object.keys(currencyCodes).map((currencyCode) => (
              <Picker.Item
                key={currencyCode}
                label={currencyCode}
                value={currencyCode}
              />
            ))}
          </Picker>
        </View>
      </View>
    
      <View style={styles.duration}>
        <Text>Select the chart duration:</Text>
        <Picker
          selectedValue={chartDuration}
          onValueChange={(value) => setChartDuration(value)}
        >
          <Picker.Item label="1D" value="1d" />
          <Picker.Item label="1M" value="1m" />
          <Picker.Item label="3M" value="3m" />
          <Picker.Item label="1Y" value="1y" />
          <Picker.Item label="5Y" value="5y" />
        </Picker>
      </View>
      {chartData && (
        <LineChart
          data={chartData}
          width={400}
          height={200}
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            decimalPlaces: 4,
            color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  sectiPicker: {
    marginTop: 20,
    flexDirection:'row',
    width: '100%',
    justifyContent:'space-evenly',
    alignItems:'center'
  },
  Picker:{
    width:'35%',
    marginVertical:30,
    borderRadius:15,
    borderWidth:1
  },
  duration:{
marginHorizontal:17

   
  }
});
export default ChartScreen;
