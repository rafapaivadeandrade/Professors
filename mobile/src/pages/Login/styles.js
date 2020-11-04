import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    marginTop: -170,
    backgroundColor: "#8257E5",
  },
  content: {
    paddingTop: 60,
    paddingRight: 100,
    paddingBottom: 100,
    paddingLeft: 100,
    transform: [{ rotate: "180deg" }],
  },
  study: {
    width: 120,
    height: 45,
    marginLeft: 60,
    transform: [{ rotate: "180deg" }],
    resizeMode: "contain",
  },
  platform: {
    color: "#D4C2FF",
    transform: [{ rotate: "180deg" }],
    marginRight: 30,
    marginBottom: 10,
  },
  title: {
    fontFamily: "Archivo_700Bold",
    color: "#32264D",
    fontSize: 32,
    maxWidth: 180,
    marginTop: -45,
    marginLeft: -40,
    marginBottom: 10,
  },
  create: {
    marginLeft: 80,
    fontFamily: "Poppins_400Regular",
    width: "100%",
    marginTop: -30,
    height: 20,
  },
  createText: {
    color: "#8257E5",
    fontSize: 16,
    fontFamily: "Archivo_700Bold",
  },
  secondContainer: {
    marginTop: 60,
    justifyContent: "center",
    paddingHorizontal: 100,
  },
  createAccountContainer: {
    flexDirection: "row",
  },
  input: {
    backgroundColor: "#FFF",
    paddingHorizontal: 16,
    height: 54,
    width: 300,
    justifyContent: "center",
    borderRadius: 8,
    marginTop: 3,
    alignItems: "center",
    marginLeft: -40,
  },
  rememberForgotPassword: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: 200,
  },
  MainContainer: {
    backgroundColor: "#8257E5",
  },
  forgotButton: {
    height: 20,
    width: 200,
    borderRadius: 8,
  },
  forgotButtonText: {
    color: "#c1bccc",
    fontFamily: "Archivo_700Bold",
    fontSize: 14,
  },
  loginForm: {
    justifyContent: "center",
  },
});

export default styles;
