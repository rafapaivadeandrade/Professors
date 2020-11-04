import React, { useState, useEffect, useContext } from "react";
import {
  Image,
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableHighlight,
} from "react-native";
import logoIcon from "../../assets/images/logo.png";
import successBgImage from "../../assets/images/success-background.png";
import { Ionicons } from "@expo/vector-icons";
import api from "../../services/api";
import CheckBox from "../../components/CheckBox";
import { Link } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";

import styles from "./styles";
function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const boolean = AsyncStorage.getItem("remember");

  useEffect(() => {
    if (boolean) {
      setEmail(AsyncStorage.getItem("email"));
      setPassword(AsyncStorage.getItem("password"));
    }
    if (!boolean) {
      setEmail("");
      setPassword("");
    }
  }, []);

  async function signIn() {
    try {
      const response = await api.post("/login", {
        email,
        password,
      });
      if (rememberMe && email !== "" && password !== "") {
        AsyncStorage.setItem("remember", rememberMe);
        AsyncStorage.setItem("email", email);
        AsyncStorage.setItem("password", password);
      }
      if (!rememberMe) {
        AsyncStorage.setItem("remember", false);
      }
      const { user, image_url, token } = response.data;
      console.log(user);
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
      navigation.navigate("Landing", {
        userData: user,
        imageData: image_url,
        tokenData: token,
      });
    } catch (err) {
      alert("Fail to login, try again");
      navigation.navigate("Login");
    }
  }

  const [isPasswordShown, setPasswordShown] = useState(false);

  return (
    <KeyboardAvoidingView
      enabled={Platform.OS === "ios"}
      behavior="padding"
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
        <View style={styles.createAccountContainer}>
          <Text style={styles.title}>Login</Text>
          <Link style={styles.create} to="/RegistrationForm1">
            <Text style={styles.createText}>Create an account</Text>
          </Link>
        </View>
        <View style={styles.loginForm}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#c1bccc"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={[styles.input]}
          />

          {isPasswordShown ? (
            <TextInput
              placeholder="Password"
              placeholderTextColor="#c1bccc"
              value={password}
              onChangeText={(text) => setPassword(text)}
              style={styles.input}
            ></TextInput>
          ) : (
            <TextInput
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor="#c1bccc"
              value={password}
              onChangeText={(text) => setPassword(text)}
              style={styles.input}
            ></TextInput>
          )}

          <TouchableOpacity
            onPress={() => setPasswordShown((v) => !v)}
            style={{ position: "absolute", left: 230, top: 75 }}
          >
            {isPasswordShown ? (
              <Ionicons name="ios-eye" size={24} color="#c1bccc" />
            ) : (
              <Ionicons name="ios-eye-off" size={24} color="#c1bccc" />
            )}
          </TouchableOpacity>

          <View style={styles.rememberForgotPassword}>
            <CheckBox
              label="Remember me"
              setRememberMe={setRememberMe}
              rememberMe={rememberMe}
            />
            <Link style={styles.forgotButton} to="/PasswordReset">
              <Text style={styles.forgotButtonText}>Forgot Password</Text>
            </Link>
          </View>
        </View>
        <TouchableHighlight
          underlayColor="#04d361"
          onPress={signIn}
          style={{
            backgroundColor: "#c1bccc",
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
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
            Enter
          </Text>
        </TouchableHighlight>
      </View>
    </KeyboardAvoidingView>
  );
}

export default Login;
