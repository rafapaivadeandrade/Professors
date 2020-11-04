import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: "#f0f0f7",
  },
  teacherList: {
    marginTop: -40,
    padding: 16,
  },
  imageContainer: {
    borderColor: "#ddd",
    borderStyle: "dashed",
    borderWidth: 1,
    width: 100,
    height: 100,
    marginLeft: 125,
    marginTop: 30,
    borderRadius: 100 / 2,
  },
  imageContainerNotDotted: {
    width: 100,
    height: 100,
    marginLeft: 120,
    marginTop: 30,
    borderRadius: 100 / 2,
  },
  imageSelected: {
    borderColor: "#ddd",
    borderWidth: 3,
    width: 105,
    height: 100,
    borderRadius: 100 / 2,
  },
  cameraView: {
    position: "absolute",
    top: 70,
    left: 70,
    width: 30,
    height: 30,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    overflow: "hidden",
    backgroundColor: "#04d361",
    justifyContent: "center",
    alignItems: "center",
  },
  secondContainer: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#e6e6f0",
    borderRadius: 8,
    marginBottom: 16,
    overflow: "hidden",
    borderBottomWidth: 1,
    borderBottomColor: "#e0dde5",
  },

  profile: {
    flexDirection: "row",
    alignItems: "center",
    padding: 24,
    paddingBottom: -10,
  },
  profileInfo: {
    marginLeft: 16,
  },
  name: {
    fontFamily: "Archivo_700Bold",
    color: "#32264d",
    fontSize: 20,
    borderWidth: 1,
    borderBottomColor: "#e0dde5",
    borderTopColor: "#fff",
    borderLeftColor: "#fff",
    borderRightColor: "#fff",
    marginBottom: 10,
    paddingBottom: 10,
  },
  availableTime: {
    fontFamily: "Archivo_700Bold",
    color: "#32264d",
    fontSize: 20,
  },
  bottomLine: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderBottomColor: "#e0dde5",
    borderTopColor: "#fff",
    borderLeftColor: "#fff",
    borderRightColor: "#fff",
    paddingBottom: 10,
  },
  subject: {
    fontFamily: "Poppins_400Regular",
    color: "#6a6180",
    fontSize: 12,
    marginTop: 4,
  },
  bio: {
    marginHorizontal: 24,
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    lineHeight: 28,
    color: "#6a6180",
  },
  footer: {
    backgroundColor: "#FAFAFC",
    padding: 24,
    marginLeft: 20,
  },
  delete: {
    color: "#E33D3D",
    fontSize: 14,
    backgroundColor: "#fff",
    fontWeight: "bold",
  },
  priceValue: {
    fontFamily: "Archivo_700Bold",
    color: "#8257e5",
    fontSize: 16,
  },
  scheduleItem: {
    display: "flex",
    flexDirection: "column",
    padding: 35,
    marginLeft: 0,
    paddingBottom: -10,
    marginTop: -40,
    borderBottomWidth: 1,
    borderBottomColor: "#e0dde5",
  },
  sideLine: {
    height: 15,
    width: 90,
    borderWidth: 1,
    borderBottomColor: "#e0dde5",
    borderTopColor: "#fff",
    borderLeftColor: "#fff",
    borderRightColor: "#fff",
  },
  textInput: {
    backgroundColor: "#F8F8FC",
    borderColor: "#e0dde5",
    borderWidth: 1,
    borderRadius: 8,
    height: 54,
    width: 300,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  fromToContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  deleteContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingBottom: 20,
    paddingTop: 10,
  },
  availableTimeLabels: {
    fontFamily: "Poppins_400Regular",
    color: "#6a6180",
    fontSize: 12,
  },
  saveButton: {
    color: "#fff",
    fontSize: 17,
    fontFamily: "Poppins_400Regular",
  },
  saveButtonContainer: {
    borderRadius: 8,
    backgroundColor: "#04d361",
    height: 54,
    width: 310,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontFamily: "Poppins_400Regular",
    color: "#6a6180",
    fontSize: 12,
    marginBottom: 4,
  },
  labelWeekDay: {
    marginTop: 20,
  },
});
export default styles;
