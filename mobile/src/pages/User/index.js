import React, { useState, useEffect, Reducer } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import PageHeader from "../../components/PageHeader";
import styles from "./styles";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";
import api from "../../services/api";

function User({ route, navigation }) {
  const { navigate } = useNavigation();
  const { userid } = route.params;
  const { tokenData } = route.params;
  const [imageBoolean, setImageBoolen] = useState(false);
  const [userId, setUserId] = useState(0);
  const [classId, setClassId] = useState(0);
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
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

  async function loadUser() {
    const response = await api.get(`/user/${userid}`, {
      headers: { Authorization: "Bearer " + tokenData },
    });
    if (!response.data) {
      alert("User needs to register class first!");
      navigation.navigate("Landing");
    }
    setClassId(response.data.class_id);
    setUserId(response.data.user_id);
    setName(response.data.name);
    setLastName(response.data.lastName);
    setSubject(response.data.subject);
    setImage(response.data.avatar);
    setWhatsapp(response.data.whatsapp);
    setBio(response.data.bio);
    setCost(response.data.cost);
    setEmail(response.data.email);
    const secondResponse = await api.get(`/user/${userid}/schedule`);
    setScheduleItems(secondResponse.data);
  }

  useEffect(() => {
    loadUser();
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, [userid]);

  async function updateUser() {
    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("lastName", lastName);
    data.append("bio", bio);
    data.append("whatsapp", whatsapp);
    data.append("subject", subject);
    data.append("cost", cost);
    data.append(
      "avatar",
      imageBoolean
        ? {
            uri: image,
            type: "image/jpeg",
            name: image.substr(image.lastIndexOf("/") + 1),
          }
        : image
    );
    try {
      await api.put(`/user/${userId}/${classId}`, data, {
        headers: { Authorization: `Bearer ${tokenData}` },
      });
      const response = await api.get(`/user/${userId}`, {
        headers: { Authorization: "Bearer " + tokenData },
      });
      const { user } = response.data;
      alert(
        "User Successfully Updated! \nLog in again to see your new Profile info!"
      );
      navigation.navigate("Landing", { userData: user });
    } catch (error) {
      console.log(error);
    }
  }
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      setImageBoolen(true);
    }
  };
  return (
    <View style={styles.container}>
      <PageHeader
        name={name}
        lastName={lastName}
        classy={subject}
        profile={true}
        headerTop={"Profile"}
        imagePicker={
          <TouchableOpacity
            onPress={pickImage}
            style={
              ({
                backgroundImage: `url(${image})`,
              },
              image ? styles.imageContainerNotDotted : styles.imageContainer)
            }
          >
            {!image && (
              <View>
                <Image style={styles.imageSelected} />
                <View style={styles.cameraView}>
                  <MaterialCommunityIcons
                    name="camera-outline"
                    size={20}
                    color="#fff"
                  />
                </View>
              </View>
            )}

            {image && (
              <View>
                <Image
                  source={
                    !imageBoolean
                      ? { uri: `http://192.168.15.10:3333/uploads/${image}` }
                      : { uri: image }
                  }
                  style={styles.imageSelected}
                />
                <View style={styles.cameraView}>
                  <MaterialCommunityIcons
                    name="camera-outline"
                    size={20}
                    color="#fff"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        }
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
              <Text style={styles.name}>Your data</Text>
              <Text style={styles.subject}>Name</Text>
              <TextInput
                placeholder="Name"
                placeholderTextColor="#c1bccc"
                style={styles.textInput}
                value={name}
                onChangeText={(text) => setName(text)}
              ></TextInput>
              <Text style={styles.subject}>Last Name</Text>
              <TextInput
                placeholder="Last Name"
                placeholderTextColor="#c1bccc"
                style={styles.textInput}
                value={lastName}
                onChangeText={(text) => setLastName(text)}
              ></TextInput>
              <Text style={styles.subject}>E-mail</Text>
              <TextInput
                placeholder="E-mail"
                placeholderTextColor="#c1bccc"
                style={styles.textInput}
                value={email}
                onChangeText={(text) => setEmail(text)}
              ></TextInput>
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
              <Text style={styles.name}>About the class</Text>
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
                  disabled
                />

                <View style={styles.fromToContainer}>
                  <View>
                    <Text style={styles.label}>From</Text>

                    <TextInput
                      editable={false}
                      defaultValue={String(scheduleItems.from / 60)}
                      placeholder="From"
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
                      editable={false}
                      defaultValue={String(scheduleItems.to / 60)}
                      placeholder="To"
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
              onPress={updateUser}
            >
              <Text style={styles.saveButton}>Save alterations</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
export default User;
