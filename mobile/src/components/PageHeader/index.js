import React, { ReactNode } from "react";
import { View, Image, Text } from "react-native";
import styles from "./styles";
import { BorderlessButton } from "react-native-gesture-handler";
import backIcon from "../../assets/images/icons/back.png";
import logoImg from "../../assets/images/logo.png";
import { useNavigation } from "@react-navigation/native";

function PageHeader({
  title,
  children,
  headerRight,
  headerTop,
  imagePicker,
  profile,
  classy,
  name,
  lastName,
  teachClasses,
}) {
  const { navigate } = useNavigation();

  function handleGoBack() {
    navigate("Landing");
  }
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <BorderlessButton onPress={handleGoBack}>
          <Image source={backIcon} resizeMode="contain" />
        </BorderlessButton>
        <Text style={styles.headerTop}>{headerTop}</Text>
        <Image source={logoImg} resizeMode="contain" />
      </View>
      {imagePicker}
      <View style={teachClasses ? "" : styles.header}>
        <Text style={teachClasses ? styles.titleClasses : styles.title}>
          {title}
        </Text>
        {teachClasses && (
          <Text style={styles.teachClasses}>
            The first step is to fill the inscription form.
          </Text>
        )}
        {profile && (
          <Text style={styles.profile}>
            {name} {lastName}
            {"\n"}
            <Text style={{ color: "#e0dde5", fontSize: 15 }}>{classy}</Text>
          </Text>
        )}

        {headerRight}
      </View>
      {children}
    </View>
  );
}

export default PageHeader;
