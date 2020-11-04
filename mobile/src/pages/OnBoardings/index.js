import React from "react";
import { Dimensions, Animated, ScrollView } from "react-native";

const { width } = Dimensions.get("window").width;

import OnBoarding from "../OnBoarding/index";

import OnBoarding2 from "../OnBoarding2";

function OnBoardings({ navigation }) {
  return (
    <ScrollView
      // snapToInterval={width}
      // decelerationRate="normal"
      showsHorizontalScrollIndicator={false}
      // disableIntervalMomentum={false}
      horizontal
      // bounces={false}
      pagingEnabled
    >
      <OnBoarding />
      <OnBoarding2 navigation={navigation} />
    </ScrollView>
  );
}

export default OnBoardings;
