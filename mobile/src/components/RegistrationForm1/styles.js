import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    backgroundColor: "#8257E5",
  },

  title: {
    fontFamily: "Archivo_700Bold",
    color: "#32264D",
    fontSize: 32,
    marginLeft: -40,
    width: 300,
  },
  secondTitle: {
    fontFamily: "Archivo_700Bold",
    color: "#32264D",
    marginLeft: -40,
    paddingTop: 70,
    fontSize: 24,
    width: 280,
  },
  description: {
    marginBottom: 20,
    marginLeft: -40,
    paddingTop: 60,
    marginTop: -40,
    color: "#595561af",
    fontFamily: "Archivo_700Bold",
  },

  secondContainer: {
    padding: 50,
    paddingHorizontal: 100,
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

  button: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  imageContainer: {
    borderColor: "#ddd",
    borderStyle: "dashed",
    borderWidth: 1,
    width: 200,
    height: 100,
    marginLeft: -40,
    marginTop: 30,
  },
  imageSelected: {
    width: 200,
    height: 100,
    marginBottom: -100,
    marginLeft: -0,
  },
  topHeader: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: 15,
    width: 400,
    paddingHorizontal: 30,
  },
});

export default styles;
