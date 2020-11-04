import React, { useState, useEffect } from "react";
import { View, Image, Text, Linking } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { RectButton } from "react-native-gesture-handler";
import heartOutlineIcon from "../../assets/images/icons/heart-outline.png";
import unfavoriteIcon from "../../assets/images/icons/unfavorite.png";
import whatsappIcon from "../../assets/images/icons/whatsapp.png";
import backIcon from "../../assets/images/icons/backLong.png";
import api from "../../services/api";
import styles from "./styles";

const TeacherItem = ({ teacher, favorited }) => {
  const [mergedArrays, setMergedArrays] = useState([]);
  const [isFavorited, setIsFavorited] = useState(favorited);
  const [schedule, setSchedule] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState([]);
  const [unSelectedSchedule, setUnselectedSchedule] = useState([]);
  const [staticSchedule, setStaticSchedule] = useState([
    { week_day: 0, value: "Sunday" },
    { week_day: 1, value: "Monday" },
    { week_day: 2, value: "Tuesday" },
    { week_day: 3, value: "Wednesday" },
    { week_day: 4, value: "Thrusday" },
    { week_day: 5, value: "Friday" },
    { week_day: 6, value: "Saturday" },
  ]);

  useEffect(() => {
    loadSchedules();
  }, [schedule]);

  function handleLinkToWhatsapp() {
    api.post("connections", {
      user_id: teacher.id,
    });
    Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`);
  }

  async function handleToggleFavorited() {
    const favorites = await AsyncStorage.getItem("favorites");
    let favoritesArray = [];

    if (favorites) {
      favoritesArray = JSON.parse(favorites);
    }

    if (isFavorited) {
      const favoriteIndex = favoritesArray.findIndex((teacherItem) => {
        return teacherItem.id === teacher.id;
      });

      favoritesArray.splice(favoriteIndex, 1);

      setIsFavorited(false);
    } else {
      favoritesArray.push(teacher);

      setIsFavorited(true);
    }
    await AsyncStorage.setItem("favorites", JSON.stringify(favoritesArray));
  }

  function loadSchedules() {
    api.get(`/user/${teacher.user_id}/schedule`).then((response) => {
      setSchedule(response.data);
    });
    const array = [];
    staticSchedule.filter((staticResult) => {
      schedule.some((scheduleResult) => {
        if (scheduleResult.week_day === staticResult.week_day) {
          array.push({
            week_day: scheduleResult.week_day,
            from: scheduleResult.from / 60,
            to: scheduleResult.to / 60,
          });
        }
      });
    });
    setSelectedSchedule(array);
    setUnselectedSchedule(
      staticSchedule.filter((staticResult) => {
        return !schedule.some((scheduleResult) => {
          return scheduleResult.week_day === staticResult.week_day;
        });
      })
    );
    setMergedArrays([...selectedSchedule, ...unSelectedSchedule]);
  }

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image
          style={styles.avatar}
          source={{
            uri: `http://192.168.15.10:3333/uploads/${teacher.avatar}`,
          }}
        />

        <View style={styles.profileInfo}>
          <Text style={styles.name}>
            {teacher.name} {teacher.lastName}
          </Text>
          <Text style={styles.subject}>{teacher.subject}</Text>
        </View>
      </View>

      <Text style={styles.bio}>{teacher.bio}</Text>
      <View style={styles.schedule}>
        <View style={styles.dayHourLabel}>
          <Text style={styles.dayLabel}>Day</Text>
          <Text style={styles.hourLabel}>Hour</Text>
        </View>

        {mergedArrays.map((schedule) => {
          return (
            <>
              <View
                style={
                  schedule.from
                    ? styles.availableDayHour
                    : styles.unavailableDayHour
                }
              >
                <Text
                  style={schedule.from ? styles.day : styles.dayUnavailable}
                >
                  {schedule.week_day == 0
                    ? "Sunday"
                    : schedule.week_day == 1
                    ? "Monday"
                    : schedule.week_day == 2
                    ? "Tuesday"
                    : schedule.week_day == 3
                    ? "Wednesday"
                    : schedule.week_day == 4
                    ? "Thusday"
                    : schedule.week_day == 5
                    ? "Friday"
                    : schedule.week_day == 6
                    ? "Saturday"
                    : ""}
                </Text>
                <Image
                  source={backIcon}
                  style={schedule.from ? styles.back : styles.backUnavailabe}
                />

                <Text style={styles.hour}>
                  {schedule.from ? (
                    schedule.from + "h -"
                  ) : (
                    <Text style={styles.dash}>-</Text>
                  )}
                  {schedule.to ? schedule.to + "h" : ""}
                </Text>
              </View>
            </>
          );
        })}
      </View>
      <View style={styles.footer}>
        <Text style={styles.price}>
          Price/Hour: <Text style={styles.priceValue}>${teacher.cost}</Text>
        </Text>
        <View style={styles.buttonsContainer}>
          <RectButton
            onPress={handleToggleFavorited}
            style={[styles.favoriteButton, isFavorited ? styles.favorited : {}]}
          >
            {isFavorited ? (
              <Image source={unfavoriteIcon} />
            ) : (
              <Image source={heartOutlineIcon} />
            )}
          </RectButton>

          <RectButton
            onPress={handleLinkToWhatsapp}
            style={styles.contactButton}
          >
            <Image source={whatsappIcon} />
            <Text style={styles.contactButtonText}>Get in touch</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
};

export default TeacherItem;
