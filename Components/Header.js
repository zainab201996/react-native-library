import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const Header = ({ navigation }) => {
  const handleBackButton = () => {
    console.log("hello");
    navigation.navigate("Search");
  };
  return (
    <>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleBackButton}>
          <Icon name="arrow-left" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleBackButton}>
          <Icon name="search" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  buttonContainer: { flexDirection: "row", justifyContent: "space-between" },
  button: {
    alignItems: "center",
    padding: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    marginLeft: 10, // Adjust the margin based on your design
  },
});
export default Header;
