import React, { useState, useEffect, Reducer } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import warnIcon from "../../assets/images/icons/warning.png";
import PageHeader from "../../components/PageHeader";
import styles from "./styles";
import { AntDesign } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";
import api from "../../services/api";

function GiveClasses({ route, navigation }) {
  const { navigate } = useNavigation();
  const { user } = route.params;
  const { tokenData } = route.params;
  const { imageData } = route.params;
  const [image, setImage] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [bio, setBio] = useState("");
  const [subject, setSubject] = useState("");
  const [cost, setCost] = useState(0);
  const [scheduleItems, setScheduleItems] = useState([
    {
      week_day: 0,
      from: "",
      to: "",
    },
  ]);
  function addNewScheduleItem() {
    setScheduleItems([
      ...scheduleItems,
      {
        week_day: 0,
        from: "",
        to: "",
      },
    ]);
  }

  function removeNewScheduleItem(index) {
    const indexToDelete = scheduleItems.findIndex(
      (scheduleItem) => scheduleItem.id === index
    );
    scheduleItems.splice(indexToDelete, 1);
    setScheduleItems([...scheduleItems]);
  }
  function setscheduleItemValue(position, field, value) {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value };
      }
      return scheduleItem;
    });

    setScheduleItems(updatedScheduleItems);
  }

  async function handleCreateClass() {
    try {
      await api.post("classes", {
        email: user.email,
        whatsapp: whatsapp,
        bio,
        subject,
        cost: Number(cost),
        schedule: scheduleItems,
      });

      navigation.navigate("ClassesCompleted");
    } catch (error) {
      alert(
        "Error on Register. \nUser cannot register another class or info missing, try again."
      );
    }
  }

  return (
    <View style={styles.container}>
      <PageHeader
        title={"Great that you want to teach classes!"}
        headerTop={"Teach Classes"}
        teachClasses={true}
      ></PageHeader>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingBottom: 16,
        }}
      >
        <View style={styles.secondContainer}>
          <View style={styles.profile}>
            <View style={styles.profileInfo}>
              <Text style={styles.data}>Your data</Text>
              <View style={styles.profileFlexBox}>
                <Image
                  style={styles.avatar}
                  source={{
                    uri: imageData,
                  }}
                />

                <Text style={styles.name}>
                  {user.name} {user.lastName}
                </Text>
              </View>
              <Text style={styles.subject}>Whatsapp</Text>
              <TextInput
                placeholder="( )  _  _ _ _ _  _ _ _ _"
                placeholderTextColor="#c1bccc"
                style={styles.textInput}
                dataDetectorTypes="phoneNumber"
                value={whatsapp}
                onChangeText={(text) => setWhatsapp(text)}
              />
              <Text style={styles.subject}>Bio</Text>
              <TextInput
                multiline
                placeholder="Bio"
                placeholderTextColor="#c1bccc"
                style={styles.textInput}
                value={bio}
                onChangeText={(text) => setBio(text)}
              ></TextInput>
              <Text style={styles.data}>About the class</Text>
              <Text style={styles.subject}>Subject</Text>
              <TextInput
                multiline
                placeholder="Subject"
                placeholderTextColor="#c1bccc"
                style={styles.textInput}
                value={subject}
                onChangeText={(text) => setSubject(text)}
              ></TextInput>
              <Text style={styles.subject}>Cost per Hour</Text>
              <TextInput
                multiline
                placeholder="$"
                placeholderTextColor="#c1bccc"
                style={styles.textInput}
                value={String(cost)}
                onChangeText={(text) => setCost(text)}
              ></TextInput>
              <View style={styles.bottomLine}>
                <Text style={styles.availableTime}>Available time</Text>
                <TouchableOpacity
                  style={{ padding: 10 }}
                  onPress={addNewScheduleItem}
                >
                  <Text style={styles.priceValue}>+ New</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {scheduleItems.map((scheduleItems, index) => {
            return (
              <View key={index} style={styles.scheduleItem}>
                <Text style={[styles.label, styles.labelWeekDay]}>
                  Week Day
                </Text>
                <DropDownPicker
                  items={[
                    {
                      label: "Sunday",
                      value: 0,
                      icon: () => (
                        <AntDesign name="calendar" size={18} color="#c1bccc" />
                      ),
                    },
                    {
                      label: "Monday",
                      value: 1,
                      icon: () => (
                        <AntDesign name="calendar" size={18} color="#c1bccc" />
                      ),
                    },
                    {
                      label: "Tuesday",
                      value: 2,
                      icon: () => (
                        <AntDesign name="calendar" size={18} color="#c1bccc" />
                      ),
                    },
                    {
                      label: "Wednesday",
                      value: 3,
                      icon: () => (
                        <AntDesign name="calendar" size={18} color="#c1bccc" />
                      ),
                    },
                    {
                      label: "Thursday",
                      value: 4,
                      icon: () => (
                        <AntDesign name="calendar" size={18} color="#c1bccc" />
                      ),
                    },
                    {
                      label: "Friday",
                      value: 5,
                      icon: () => (
                        <AntDesign name="calendar" size={18} color="#c1bccc" />
                      ),
                    },
                    {
                      label: "Saturday",
                      value: 6,
                      icon: () => (
                        <AntDesign name="calendar" size={18} color="#c1bccc" />
                      ),
                    },
                  ]}
                  defaultValue={scheduleItems.week_day}
                  style={{
                    backgroundColor: "#F8F8FC",
                  }}
                  itemStyle={{
                    justifyContent: "flex-start",
                    backgroundColor: "#F8F8FC",
                  }}
                  placeholder={
                    scheduleItems.week_day == 0
                      ? "Sunday"
                      : scheduleItems.week_day == 1
                      ? "Monday"
                      : scheduleItems.week_day == 2
                      ? "Tuesday"
                      : scheduleItems.week_day == 3
                      ? "Wednesday"
                      : scheduleItems.week_day == 4
                      ? "Thursday"
                      : scheduleItems.week_day == 5
                      ? "Friday"
                      : scheduleItems.week_day == 6
                      ? "Saturday"
                      : ""
                  }
                  labelStyle={{
                    color: "#c1bccc",
                  }}
                  multiple={false}
                  multipleText="%d items have been selected."
                  min={0}
                  max={4}
                  containerStyle={{
                    height: 54,
                    borderRadius: 8,
                    marginBottom: 16,
                  }}
                  onChangeItem={(item) =>
                    setscheduleItemValue(index, "week_day", item.value)
                  }
                />

                <View style={styles.fromToContainer}>
                  <View>
                    <Text style={styles.label}>From</Text>

                    <TextInput
                      editable={true}
                      defaultValue={String(scheduleItems.from / 60)}
                      placeholder=" Hours"
                      multiline
                      placeholderTextColor="#c1bccc"
                      style={{
                        backgroundColor: "#F8F8FC",
                        borderColor: "#e0dde5",
                        borderWidth: 1,
                        borderRadius: 8,
                        height: 54,
                        width: 140,
                        paddingHorizontal: 16,
                      }}
                      value={scheduleItems.from}
                      onChangeText={(text) =>
                        setscheduleItemValue(index, "from", text)
                      }
                    ></TextInput>
                  </View>

                  <View>
                    <Text style={styles.label}>To</Text>
                    <TextInput
                      editable={true}
                      defaultValue={String(scheduleItems.to / 60)}
                      placeholder=" Hours"
                      multiline
                      placeholderTextColor="#c1bccc"
                      style={{
                        backgroundColor: "#F8F8FC",
                        borderColor: "#e0dde5",
                        borderWidth: 1,
                        borderRadius: 8,
                        height: 54,
                        width: 140,
                        paddingHorizontal: 16,
                      }}
                      value={scheduleItems.to}
                      onChangeText={(text) => {
                        setscheduleItemValue(index, "to", text);
                      }}
                    ></TextInput>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => removeNewScheduleItem(index)}
                  style={styles.deleteContainer}
                >
                  <View style={styles.sideLine}></View>
                  <Text style={styles.delete}>Delete Hour</Text>
                  <View style={styles.sideLine}></View>
                </TouchableOpacity>
              </View>
            );
          })}

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.saveButtonContainer}
              onPress={handleCreateClass}
            >
              <Text style={styles.saveButton}>Save alterations</Text>
            </TouchableOpacity>
            <View style={styles.warningContainer}>
              <Image source={warnIcon} />
              <Text style={{ color: "#9C98A6", lineHeight: 20 }}>
                {" "}
                <Text style={{ color: "#916BEA" }}>Important!</Text> {"\n"} Fill
                all the information correctly
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
export default GiveClasses;
