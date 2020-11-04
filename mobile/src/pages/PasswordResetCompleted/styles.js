import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  containerImage: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#8257E5",
    alignItems: "center",
  },
  bgImage: {
    marginTop: 100,
    height: 350,
    width: 450,
    transform: [{ rotate: "90deg" }],
  },
  checkImage: {
    position: "absolute",
    top: 130,
    height: 80,
    width: 80,
  },
  title: {
    paddingTop: 100,
    color: "#fff",
    fontSize: 30,
    fontFamily: "Archivo_700Bold",
    transform: [{ rotate: "270deg" }],
    paddingBottom: 200,
    paddingLeft: 110,
  },
  subTitle: {
    position: "absolute",
    color: "#e0dde5",
    width: 240,
    transform: [{ rotate: "270deg" }],
    marginLeft: 120,
    left: 20,
    lineHeight: 20,
    textAlign: "center",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    width: 500,
  },
});

export default styles;
