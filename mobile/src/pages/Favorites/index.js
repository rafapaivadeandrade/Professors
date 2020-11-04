import React, { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";
import PageHeader from "../../components/PageHeader";
import TeacherItem from "../../components/TeacherItem";
import AsyncStorage from "@react-native-community/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import api from "../../services/api";
import styles from "./styles";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    loadTotalUsers();
  }, []);

  function loadFavorites() {
    AsyncStorage.getItem("favorites").then((response) => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);

        setFavorites(favoritedTeachers);
      }
    });
  }
  async function loadTotalUsers() {
    try {
      const response = await api.get("totalUsers");
      setTotal(response.data.count);
    } catch (error) {
      alert("Login session expired! Or no user logged. \n Please Login again.");
      localStorage.clear();
      history.push("/");
    }
  }
  useFocusEffect(() => {
    loadFavorites();
  });
  return (
    <View style={styles.container}>
      <PageHeader title={"My Available Professors"} />
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {favorites.map((teacher) => {
          return (
            <TeacherItem key={teacher.id} teacher={teacher} favorited={true} />
          );
        })}
      </ScrollView>
    </View>
  );
}

export default Favorites;
