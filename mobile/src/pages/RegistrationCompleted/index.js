import React from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableHighlight,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import successBgImage from "../../assets/images/success-background.png";
import successCheckIcon from "../../assets/images/icons/success-check-icon.png";
import styles from "./styles";

function RegistrationCompleted() {
  const { navigate } = useNavigation();

  return (
    <View style={styles.containerImage}>
      <ImageBackground
        source={successBgImage}
        style={styles.bgImage}
        resizeMode="stretch"
      >
        <View style={styles.textContainer}>
          <Text style={styles.title}>Registration Completed!</Text>
          <Text style={styles.subTitle}>
            Now you are part of the Proffy platform.
          </Text>
        </View>
      </ImageBackground>
      <Image
        resizeMode="stretch"
        source={successCheckIcon}
        style={styles.checkImage}
      />
      <TouchableHighlight
        underlayColor="#04d361"
        onPress={() => {
          navigate("Login");
        }}
        style={{
          backgroundColor: "#c1bccc",
          alignItems: "center",
          justifyContent: "center",
          padding: 15,
          borderRadius: 7.8,
          marginTop: 90,
          width: 300,
          right: 40,
          height: 60,
          marginLeft: 100,
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
          Go to Login
        </Text>
      </TouchableHighlight>
    </View>
  );
}

export default RegistrationCompleted;
