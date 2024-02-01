import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Toast from "react-native-toast-message";

import BookInfo from "./Components/BookInfo";
import Search from "./Components/Search";

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Book">
          <Stack.Screen name="Book" component={BookInfo} />
          <Stack.Screen name="Search" component={Search} />
        </Stack.Navigator>
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </NavigationContainer>
    </>
  );
}
