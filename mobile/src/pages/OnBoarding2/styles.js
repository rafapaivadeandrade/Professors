import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#04D361",
  },
  content: {
    padding: 110,
    transform: [{ rotate: "270deg" }],
  },
  study: {
    padding: 50,
    left: 40,
    top: 0,
    transform: [{ rotate: "90deg" }],
  },
  title: {
    fontFamily: "Archivo_700Bold",
    color: "#04BF58",
    fontSize: 32,
    lineHeight: 57,
    right: 200,
    maxWidth: 180,
  },
  description: {
    marginTop: 15,
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
    tintColor: "#32264D",
  },
  secondContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingHorizontal: 100,
  },
});

export default styles;
