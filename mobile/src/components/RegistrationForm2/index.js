import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableHighlight,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import api from "../../services/api";
import Dot from "../../components/Dot";
import backIcon from "../../assets/images/icons/back.png";
import styles from "./styles";
import AsyncStorage from "@react-native-community/async-storage";
import { useNavigation } from "@react-navigation/native";

const offset = Platform.OS === "android" ? -70 : 0;
const RegistrationForm2 = ({ navigation }) => {
  const { navigate } = useNavigation();
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    AsyncStorage.multiGet(["name", "lastName", "image"]).then((response) => {
      setName(response[0]);
      setLastName(response[1]);
      setImage(response[2]);
    });
  }, []);

  async function handleRegistration() {
    const data = new FormData();
    data.append("name", name[1]);
    data.append("password", password);
    data.append("email", email);
    data.append("lastName", lastName[1]);
    data.append("avatar", {
      uri: image[1],
      type: "image/jpeg",
      name: image[1].substr(image[1].lastIndexOf("/") + 1),
    });

    try {
      const response = await api.post("register", data);

      navigate("RegistrationCompleted");
    } catch (err) {
      Alert(
        "An error has ocurred, please check your information and try again."
      );
    }
  }
  return (
    <KeyboardAvoidingView
      enabled={Platform.OS === "android"}
      behavior="padding"
      keyboardVerticalOffset={offset}
      style={{
        width: Dimensions.get("screen").width,
        justifyContent: "center",
        paddingTop: 50,
        flex: 1,
        backgroundColor: "#F8F8FC",
      }}
    >
      <View style={styles.topHeader}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image source={backIcon} style={{ tintColor: "#c1bccc" }} />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            width: 20,
          }}
        >
          <Dot color="#c1bccc" />
          <Dot color="#9871F5" />
        </View>
      </View>
      <View style={styles.secondContainer}>
        <Text style={styles.title}>Create an Account</Text>
        <Text style={styles.description}>Find professors to teach you. </Text>

        <View>
          <Text style={styles.secondTitle}>02. Email and Password</Text>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#c1bccc"
            style={styles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
          ></TextInput>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#c1bccc"
            secureTextEntry={true}
            style={styles.input}
            value={password}
            onChangeText={(text) => setPassword(text)}
          ></TextInput>
        </View>

        <TouchableHighlight
          underlayColor="#04d361"
          onPress={handleRegistration}
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
          <Text style={styles.button}>Next</Text>
        </TouchableHighlight>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegistrationForm2;
