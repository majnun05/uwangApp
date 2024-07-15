import React from "react";
import { Platform, Text } from "react-native";

export default function TextBoldCenterBig({ children }) {
  const fontFamily = Platform.OS === "ios" ? "Courier" : "monospace";

  return (
    <Text
      style={{
        marginBottom: 5,
        fontFamily,
        color: "#515151",
        fontSize: 15,
        fontWeight: "bold",
        textAlign: "center"
      }}
    >
      {children}
    </Text>
  );
}
