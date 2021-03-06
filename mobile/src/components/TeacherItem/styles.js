import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#e6e6f0",
    borderRadius: 8,
    marginBottom: 16,
    overflow: "hidden",
    borderBottomWidth: 1,
    borderBottomColor: "#e0dde5",
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#eee",
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    padding: 24,
  },
  profileInfo: {
    marginLeft: 16,
  },
  name: {
    fontFamily: "Archivo_700Bold",
    color: "#32264d",
    fontSize: 20,
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
    backgroundColor: "#fafafc",
    padding: 24,
    alignItems: "center",
    marginTop: 24,
    borderTopWidth: 1,
    borderTopColor: "#e0dde5",
  },
  price: {
    fontFamily: "Poppins_400Regular",
    color: "#6a6180",
    fontSize: 14,
  },
  priceValue: {
    fontFamily: "Archivo_700Bold",
    color: "#8257e5",
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: "row",
    marginTop: 16,
  },
  favoriteButton: {
    backgroundColor: "#8257e5",
    width: 56,
    height: 56,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  contactButton: {
    backgroundColor: "#04d461",
    flex: 1,
    height: 56,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  contactButtonText: {
    color: "#FFF",
    fontFamily: "Archivo_700Bold",
    fontSize: 16,
    marginLeft: 16,
  },
  favorited: {
    backgroundColor: "#e33d3d",
  },
  schedule: {
    borderTopColor: "#e0dde5",
    padding: 24,
    borderTopWidth: 1,
    paddingBottom: -10,
    // marginHorizontal: 24,
  },
  eachTime: {
    marginHorizontal: 24,
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    lineHeight: 28,
    color: "#6a6180",
  },
  availableDayHour: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 8,
    backgroundColor: "#F8F8FC",
    borderWidth: 1,
    borderColor: "#c1bccc",
    marginBottom: 5,
    alignItems: "center",
  },
  unavailableDayHour: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0dde5",
    marginBottom: 5,
    alignItems: "center",
  },
  dayHourLabel: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dayLabel: {
    marginHorizontal: 24,
    fontFamily: "Poppins_400Regular",
    fontSize: 10,
    lineHeight: 28,
    color: "#6a6180",
  },
  hourLabel: {
    marginHorizontal: 64,
    fontFamily: "Poppins_400Regular",
    fontSize: 10,
    lineHeight: 28,
    color: "#6a6180",
  },
  day: {
    marginHorizontal: 24,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#32264d",
  },
  dayUnavailable: {
    marginHorizontal: 24,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#c1bccc",
  },
  hour: {
    marginHorizontal: 24,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#32264d",
  },
  backUnavailabe: {
    tintColor: "#e0dde5",
    transform: [{ rotate: "180deg" }],
  },
  back: {
    tintColor: "#c1bccc",
    transform: [{ rotate: "180deg" }],
  },
  dash: {
    color: "#e0dde5",
  },
});

export default styles;
