import React, { useState } from "react";
import {
  Image,
  View,
  Text,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableHighlight,
} from "react-native";
import logoIcon from "../../assets/images/logo.png";
import successBgImage from "../../assets/images/success-background.png";
import backIcon from "../../assets/images/icons/back.png";
import api from "../../services/api";
import styles from "./styles";
import { Link } from "@react-navigation/native";
const offset = Platform.OS === "android" ? -50 : 0;
function PasswordReset({ navigation }) {
  const [email, setEmail] = useState("");

  function sendToSuccessfullEmailSent() {
    try {
      api.post("/forgotPassword", {
        email,
      });

      navigation.navigate("PasswordCompleted");
    } catch (err) {
      alert("Email does not exist");
    }
  }

  return (
    <KeyboardAvoidingView
      enabled={Platform.OS === "ios"}
      behavior="padding"
      keyboardVerticalOffset={offset}
      style={styles.parentContainer}
    >
      <View style={styles.container}>
        <ImageBackground
          resizeMode="contain"
          source={successBgImage}
          style={styles.content}
        >
          <Text style={styles.platform}>Your platform of online studies.</Text>
          <Image source={logoIcon} style={styles.study} />
        </ImageBackground>
      </View>
      <View style={styles.secondContainer}>
        <Link to="/Login" style={styles.link}>
          <Image source={backIcon} resizeMode="contain" style={styles.arrow} />
        </Link>
        <View style={styles.createAccountContainer}>
          <Text style={styles.title}>Forgot Your Password?</Text>
          <Text style={styles.createText}>
            Do not worry,{"\n"}we can handle this for you.
          </Text>
        </View>
        <View>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#c1bccc"
            style={styles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <TouchableHighlight
          underlayColor="#04d361"
          onPress={sendToSuccessfullEmailSent}
          style={{
            backgroundColor: "#e0dde5",
            alignItems: "center",
            justifyContent: "center",
            padding: 15,
            borderRadius: 7.8,
            marginTop: 20,
            width: 300,
            right: 40,
            height: 60,
          }}
        >
          <Text style={{ color: "#c1bccc", fontWeight: "bold", fontSize: 16 }}>
            Enter
          </Text>
        </TouchableHighlight>
      </View>
    </KeyboardAvoidingView>
  );
}

export default PasswordReset;
