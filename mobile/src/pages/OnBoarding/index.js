import React from "react";
import { Image, View, Text, ImageBackground } from "react-native";
import studyIcon from "../../assets/images/icons/study.png";
import { useNavigation } from "@react-navigation/native";
import backIcon from "../../assets/images/icons/back.png";
import giveClassesBgImage from "../../assets/images/give-classes-background.png";
import { BorderlessButton } from "react-native-gesture-handler";
import Dot from "../../components/Dot";

import styles from "./styles";

function OnBoarding() {
  const { navigate } = useNavigation();

  return (
    <View>
      <View style={styles.container}>
        <ImageBackground
          resizeMode="contain"
          source={giveClassesBgImage}
          style={styles.content}
        >
          <Image source={studyIcon} style={styles.study} />
        </ImageBackground>
      </View>
      <View style={styles.secondContainer}>
        <Text style={styles.title}>01.</Text>
        <Text style={styles.description}>Find professors to teach you.</Text>
        <View
          style={{
            flexDirection: "row",
            height: 100,
            width: 20,
            position: "absolute",
            alignItems: "flex-end",
            justifyContent: "space-between",
            left: 100,
            top: 135,
          }}
        >
          <Dot color="#9871F5" />
          <Dot color="#c1bccc" />
        </View>
        <BorderlessButton onPress={() => {}}>
          <Image source={backIcon} resizeMode="contain" style={styles.arrow} />
        </BorderlessButton>
      </View>
    </View>
  );
}

export default OnBoarding;
