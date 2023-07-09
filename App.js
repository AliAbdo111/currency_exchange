import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LocationScreen from './screen/LocationScreen';
import ChartScreen from './screen/ChartScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack=createNativeStackNavigator();
export default function App() {

  return (
     <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={LocationScreen} />
        <Stack.Screen name="Chart"
         component={ChartScreen} />
      </Stack.Navigator>
    </NavigationContainer> 



  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,                                                        
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
