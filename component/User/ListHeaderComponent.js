import  { React } from 'react';
import { View ,Pressable,Text ,StyleSheet} from 'react-native';
import { Entypo } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
function ListHeaderComponent({defaultLocation,
                                handleToggleVisibility
                                ,location
                                ,selectedRegion
                                ,handleRegionChange}){


    return (
        <View>
        <View style={styles.contanerTx}>
        <Text style={styles.text}>Where are you from?</Text>
      </View>
      <View style={styles.userLocation}>
        <Entypo name="location" size={24} color="black" />
        <Text
          style={styles.text}
        >{`Defoalt location : ${defaultLocation}`}</Text>
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
      </View>
    )
}

const styles=StyleSheet.create({
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
        textAlign: "left",
      },
      text: {
        fontWeight: "500",
        fontSize: 18,
        textAlign: "right",
      },
      text2: {
        fontWeight: "400",
        fontSize: 13,
        color: "red",
      },
})


export default ListHeaderComponent;