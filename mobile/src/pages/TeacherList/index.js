import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, Image } from "react-native";
import styles from "./styles";
import TeacherItem from "../../components/TeacherItem";
import PageHeader from "../../components/PageHeader";
import { RectButton, TouchableOpacity } from "react-native-gesture-handler";
import { Feather, AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Smile from "../../assets/images/icons/smile.png";
import api from "../../services/api";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";

function TeacherList({ navigation }) {
  const { navigate } = useNavigation();
  const [total, setTotal] = useState(0);
  const [teachers, setTeachers] = useState([]);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [week_day, setWeekDay] = useState(0);
  const [subject, setSubject] = useState("");
  const [time, setTime] = useState("");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadTotalUsers();
  }, []);

  async function loadTotalUsers() {
    try {
      const response = await api.get("totalUsers");
      setTotal(response.data.count);
    } catch (error) {
      alert("Login session expired! Or no user logged. \n Please Login again.");
      AsyncStorage.clear();
      navigate("Login");
    }
  }

  function loadFavorites() {
    AsyncStorage.getItem("favorites").then((response) => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);
        const favoritedTeachersIds = favoritedTeachers.map((teacher) => {
          return teacher.id;
        });
        setFavorites(favoritedTeachersIds);
      }
    });
  }

  async function handleFiltersSubmit() {
    loadFavorites();
    const response = await api.get("classes", {
      params: {
        subject,
        week_day,
        time,
      },
    });
    setIsFiltersVisible(!isFiltersVisible);
    setTeachers(response.data);
    {
    }
  }

  function handleToggleFiltersVisible() {
    setIsFiltersVisible(!isFiltersVisible);
  }

  return (
    <View style={styles.container}>
      <PageHeader
        title={"Available \nProfessors"}
        headerRight={
          <View style={styles.headerRightView}>
            <Image
              resizeMode="stretch"
              source={Smile}
              style={{ height: 25, width: 25, marginRight: 10 }}
            />
            <Text style={{ color: "#e0dde5" }}>{total} Proffy(s)</Text>
          </View>
        }
        headerTop={"Study"}
      >
        <TouchableOpacity
          style={styles.headerDown}
          onPress={handleToggleFiltersVisible}
        >
          <Feather name="filter" size={20} color="#04d361" />
          <Text style={{ marginRight: 70, color: "#e0dde5" }}>
            Filter per day, hour and subject
          </Text>
          <AntDesign name="down" color="#e0dde5" />
        </TouchableOpacity>
        {isFiltersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Subject</Text>

            <DropDownPicker
              items={[
                {
                  label: "Web Development",
                  value: "Web Development",
                  icon: () => (
                    <MaterialIcons name="subject" size={18} color="#c1bccc" />
                  ),
                },
                {
                  label: "Mobile",
                  value: "Mobile",
                  icon: () => (
                    <MaterialIcons name="subject" size={18} color="#c1bccc" />
                  ),
                },
                {
                  label: "Network Security",
                  value: "Network Security",
                  icon: () => (
                    <MaterialIcons name="subject" size={18} color="#c1bccc" />
                  ),
                },
                {
                  label: "Algorithms",
                  value: "Algorithms",
                  icon: () => (
                    <MaterialIcons name="subject" size={18} color="#c1bccc" />
                  ),
                },
              ]}
              itemStyle={{ justifyContent: "flex-start" }}
              placeholder="Select"
              labelStyle={{
                color: "#c1bccc",
              }}
              multiple={false}
              multipleText="%d items have been selected."
              min={0}
              max={4}
              containerStyle={{ height: 54, borderRadius: 8, marginBottom: 16 }}
              onChangeItem={(text) => {
                setSubject(text.value);
              }}
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Week day</Text>
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
                  itemStyle={{ justifyContent: "flex-start" }}
                  placeholder="Select"
                  labelStyle={{
                    color: "#c1bccc",
                  }}
                  multiple={false}
                  multipleText="%d items have been selected."
                  min={0}
                  max={2}
                  containerStyle={{
                    height: 54,
                    borderRadius: 8,
                    marginBottom: 16,
                  }}
                  onChangeItem={(text) => {
                    setWeekDay(text.value);
                  }}
                  dropDownStyle={{ height: 100 }}
                />
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Hour</Text>
                <DropDownPicker
                  items={[
                    {
                      label: "8 AM",
                      value: "8:00",
                      icon: () => (
                        <AntDesign name="hourglass" size={18} color="#c1bccc" />
                      ),
                    },
                    {
                      label: "9 AM",
                      value: "9:00",
                      icon: () => (
                        <AntDesign name="hourglass" size={18} color="#c1bccc" />
                      ),
                    },
                    {
                      label: "10 AM",
                      value: "10:00",
                      icon: () => (
                        <AntDesign name="hourglass" size={18} color="#c1bccc" />
                      ),
                    },
                    {
                      label: "11 AM",
                      value: "11:00",
                      icon: () => (
                        <AntDesign name="hourglass" size={18} color="#c1bccc" />
                      ),
                    },
                    {
                      label: "12 AM",
                      value: "12:00",
                      icon: () => (
                        <AntDesign name="hourglass" size={18} color="#c1bccc" />
                      ),
                    },
                    {
                      label: "1 PM",
                      value: "13:00",
                      icon: () => (
                        <AntDesign name="hourglass" size={18} color="#c1bccc" />
                      ),
                    },
                    {
                      label: "2 PM",
                      value: "14:00",
                      icon: () => (
                        <AntDesign name="hourglass" size={18} color="#c1bccc" />
                      ),
                    },
                    {
                      label: "3 PM",
                      value: "15:00",
                      icon: () => (
                        <AntDesign name="hourglass" size={18} color="#c1bccc" />
                      ),
                    },
                    {
                      label: "4 PM",
                      value: "16:00",
                      icon: () => (
                        <AntDesign name="hourglass" size={18} color="#c1bccc" />
                      ),
                    },
                    {
                      label: "5 PM",
                      value: "17:00",
                      icon: () => (
                        <AntDesign name="hourglass" size={18} color="#c1bccc" />
                      ),
                    },
                    {
                      label: "6 PM",
                      value: "18:00",
                      icon: () => (
                        <AntDesign name="hourglass" size={18} color="#c1bccc" />
                      ),
                    },
                  ]}
                  itemStyle={{ justifyContent: "flex-start" }}
                  placeholder="Select"
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
                  onChangeItem={(item) => setTime(item.value)}
                  dropDownStyle={{ height: 100 }}
                />
              </View>
            </View>
            <RectButton
              onPress={handleFiltersSubmit}
              style={styles.submitButton}
            >
              <Text style={styles.submitButtonText}>Filter</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {teachers.map((teacher) => (
          <TeacherItem
            key={teacher.id}
            teacher={teacher}
            favorited={favorites.includes(teacher.id)}
          />
        ))}
        {teachers.length === 0 && !isFiltersVisible && (
          <Text
            style={{
              color: "#04d361",
              fontWeight: "bold",
              fontSize: 16,
              alignSelf: "center",
            }}
          >
            There is no Proffys to show
          </Text>
        )}
      </ScrollView>
    </View>
  );
}

export default TeacherList;
