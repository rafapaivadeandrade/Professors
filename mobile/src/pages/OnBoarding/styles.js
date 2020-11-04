import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#8257E5",
  },
  content: {
    padding: 110,
    transform: [{ rotate: "270deg" }],
  },
  study: {
    padding: 50,
    transform: [{ rotate: "90deg" }],
    left: 30,
  },
  title: {
    fontFamily: "Archivo_700Bold",
    color: "#D4C2FF",
    fontSize: 32,
    lineHeight: 37,
    maxWidth: 180,
    right: 180,
  },
  description: {
    marginTop: 24,
    color: "#32264D",
    fontSize: 16,
    lineHeight: 26,
    fontFamily: "Poppins_400Regular",
    maxWidth: 240,
  },
  arrow: {
    transform: [{ rotate: "180deg" }],
    marginTop: 30,
    paddingVertical: 40,
  },
  secondContainer: {
    flex: 1,
    paddingHorizontal: 92,
    justifyContent: "center",
    alignItems: "flex-end",
  },
});

export default styles;
