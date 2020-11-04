import React from "react";
import { View } from "react-native";

const Dot = ({ color }) => {
  return (
    <View
      style={{
        backgroundColor: color,
        width: 4,
        height: 4,
        borderRadius: 4,
      }}
    />
  );
};
// 2CB9B0
export default Dot;
