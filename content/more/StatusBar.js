//import libraries
import React from "react";
import { StatusBar, Platform, View } from "react-native";

// make a component
const StatusBars = (props) => {
  if (Platform.OS === "android") {
    return (
      <StatusBar
        animated
        showHideTransition="fade"
        backgroundColor={"#6982FF"}
        translucent={false}
        networkActivityIndicatorVisible={true}
        hidden={false}
        barStyle="light-content"
      />
    );
  } else {
    return (
      <View style={{ backgroundColor: "#6982FF", height: 18 }}>
        <StatusBar
          animated
          showHideTransition="fade"
          backgroundColor={"#6982FF"}
          translucent={false}
          networkActivityIndicatorVisible={true}
          hidden={false}
          barStyle="light-content"
        />
      </View>
    );
  }
};

// make the component available to other parts of the app backgroundColor="# c45f07"
export default StatusBars;
