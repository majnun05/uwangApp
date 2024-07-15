import React from "react";
import { Platform, Text } from "react-native";

export default function TextPrintRight({ children }) {
  const fontFamily = Platform.OS === "ios" ? "Courier" : "monospace";

  return (
    <Text
      style={{
        marginTop: 5,
        fontFamily,
        color: "#515151",
        fontWeight: "500",
        fontSize: 9,
        alignSelf: "flex-end"
      }}
    >
      {children}
    </Text>
  );
}
