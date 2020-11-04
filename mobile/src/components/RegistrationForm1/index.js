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
import Dot from "../../components/Dot";
import backIcon from "../../assets/images/icons/back.png";
import camera from "../../assets/images/camera.png";
import styles from "./styles";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-community/async-storage";
const offset = Platform.OS === "android" ? -70 : 0;
const RegistrationForm1 = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    if (AsyncStorage) {
      AsyncStorage.clear();
    }
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  async function handleNextPage() {
    AsyncStorage.setItem("name", name);
    AsyncStorage.setItem("lastName", lastName);
    AsyncStorage.setItem("image", image);
    navigation.navigate("RegistrationForm2");
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
          <Dot color="#9871F5" />
          <Dot color="#c1bccc" />
        </View>
      </View>
      <View style={styles.secondContainer}>
        <Text style={styles.title}>Create an Account</Text>
        <Text style={styles.description}>Find professors to teach you. </Text>

        <TouchableOpacity
          onPress={pickImage}
          style={
            ({
              backgroundImage: `url(${image})`,
            },
            styles.imageContainer)
          }
        >
          {image && (
            <Image source={{ uri: image }} style={styles.imageSelected} />
          )}
          {!image && <Image source={camera} style={{ left: 90, top: 40 }} />}
        </TouchableOpacity>

        <View>
          <Text style={styles.secondTitle}>01. Who are you?</Text>
          <TextInput
            placeholder="Name"
            placeholderTextColor="#c1bccc"
            style={styles.input}
            value={name}
            onChangeText={(text) => setName(text)}
          ></TextInput>
          <TextInput
            placeholder="LastName"
            placeholderTextColor="#c1bccc"
            style={styles.input}
            value={lastName}
            onChangeText={(text) => setLastName(text)}
          ></TextInput>
        </View>

        <TouchableHighlight
          underlayColor="#04d361"
          onPress={handleNextPage}
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

export default RegistrationForm1;
