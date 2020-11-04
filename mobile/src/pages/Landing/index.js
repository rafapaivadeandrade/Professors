import React, { useState, useEffect } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import AsyncStorage from "@react-native-community/async-storage";
import studyIcon from "../../assets/images/icons/study.png";
import landingImg from "../../assets/images/landing.png";
import giveClassesIcon from "../../assets/images/icons/give-classes.png";
import heartIcon from "../../assets/images/icons/heart.png";
import { RectButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";

import api from "../../services/api";

function Landing({ route, navigation }) {
  const [totalConnections, setTotalConnections] = useState(0);
  const [user, setUser] = useState([]);
  const [image, setImage] = useState("");
  const { userData } = route.params;
  const { imageData } = route.params;
  const { tokenData } = route.params;

  useEffect(() => {
    loadUser();
    setUser(userData);
    setImage(imageData);
  }, [user]);

  async function loadUser() {
    try {
      const response = await api.get("connections");
      const { total } = response.data;
      setTotalConnections(total);
    } catch (error) {
      alert("Login session expired! Or no user logged. \n Please Login again.");
      AsyncStorage.clear();
      navigation.navigate("Login");
    }
  }

  function handleLogout() {
    AsyncStorage.clear();
    navigation.navigate("Login");
  }

  function handleProfile() {
    navigation.navigate("User", { userid: user.id, tokenData: tokenData });
  }

  return (
    <View style={styles.container}>
      <View style={styles.topHeader}>
        <TouchableOpacity style={styles.leftHeader} onPress={handleProfile}>
          <Image
            style={styles.imageContainer}
            source={{ uri: `http://192.168.15.10:3333/uploads/${user.avatar}` }}
          />
          <Text style={styles.userName}>
            {user.name} {user.lastName}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleLogout}
          style={{ backgroundColor: "#916BEA", borderRadius: 7.8, padding: 10 }}
        >
          <Feather name="power" color="#ffffff" size={20} />
        </TouchableOpacity>
      </View>
      <Image style={styles.banner} source={landingImg} />

      <Text style={styles.title}>
        Welcome, {"\n"}
        <Text style={styles.bold}>What would you like to do?</Text>
      </Text>

      <View style={styles.buttonContainer}>
        <RectButton
          onPress={() => navigation.navigate("Study")}
          style={[styles.button, styles.buttonPrimary]}
        >
          <Image source={studyIcon} />

          <Text style={styles.buttonText}>Study</Text>
        </RectButton>

        <RectButton
          onPress={() =>
            navigation.navigate("GiveClasses", {
              user: user,
              tokenData: tokenData,
              imageData: imageData,
            })
          }
          style={[styles.button, styles.buttonSecondary]}
        >
          <Image source={giveClassesIcon} />

          <Text style={styles.buttonText}>Give Classes</Text>
        </RectButton>
      </View>

      <Text style={styles.totalConnections}>
        Total of {totalConnections} Connections already made {""}
        <Image source={heartIcon} />
      </Text>
    </View>
  );
}

export default Landing;
