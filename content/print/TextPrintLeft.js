import React from "react";
import { Platform, Text } from "react-native";

export default function TextPrintRight({ children }) {
  const fontFamily = Platform.OS === "ios" ? "Courier" : "monospace";

  return (
    <Text
      style={{
        marginTop: 5,
        fontFamily,
        fontWeight: "500",
        color: "#515151",
        fontSize: 10,
        alignSelf: "flex-start"
      }}
    >
      {children}
    </Text>
  );
}
