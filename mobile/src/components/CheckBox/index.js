import React, { useState } from "react";
import { View, Text, TouchableOpacity, AsyncStorage } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";

const CheckBox = ({ label, setRememberMe, rememberMe }) => {
  const [checked, setChecked] = useState(false);

  function rememberInfo() {
    setChecked(!checked);
    if (!rememberMe) {
      setRememberMe(true);
    } else {
      setRememberMe(false);
    }
  }

  return (
    <TouchableOpacity onPress={rememberInfo}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginRight: 60,
          marginLeft: -40,
        }}
      >
        <View
          style={{
            backgroundColor: checked ? "#04d361" : "#fff",
            borderRadius: 7.8,
            width: 20,
            height: 20,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#04d361",
            marginRight: 10,
          }}
        >
          <Icon name="check" color="#fff" />
        </View>

        <Text
          style={{
            color: "#c1bccc",
            fontSize: 14,
            fontFamily: "Archivo_700Bold",
          }}
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CheckBox;
