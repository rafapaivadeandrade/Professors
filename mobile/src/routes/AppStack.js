import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import StudyTabs from "./StudyTabs";
import Landing from "../pages/Landing";
import GiveClasses from "../pages/GiveClasses";
import OnBoarding from "../pages/OnBoarding";
import OnBoardings from "../pages/OnBoardings";
import OnBoarding2 from "../pages/OnBoarding2";
import RegistrationForm1 from "../components/RegistrationForm1";
import RegistrationForm2 from "../components/RegistrationForm2";
import Login from "../pages/Login";
import RegistrationCompleted from "../pages/RegistrationCompleted";
import PasswordCompleted from "../pages/PasswordResetCompleted";
import PasswordReset from "../pages/PasswordReset";
import User from "../pages/User";
import CreateClassCompleted from "../pages/CreateClassCompleted";

const { Navigator, Screen } = createStackNavigator();

function AppStack() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="OnBoardings" component={OnBoardings} />
        <Screen name="OnBoarding" component={OnBoarding} />
        <Screen name="OnBoarding2" component={OnBoarding2} />
        <Screen name="Login" component={Login} />
        <Screen name="User" component={User} />
        <Screen name="Study" component={StudyTabs} />
        <Screen name="RegistrationForm1" component={RegistrationForm1} />
        <Screen name="RegistrationForm2" component={RegistrationForm2} />
        <Screen
          name="RegistrationCompleted"
          component={RegistrationCompleted}
        />
        <Screen name="PasswordCompleted" component={PasswordCompleted} />
        <Screen name="PasswordReset" component={PasswordReset} />
        <Screen name="Landing" component={Landing} />
        <Screen name="GiveClasses" component={GiveClasses} />
        <Screen name="ClassesCompleted" component={CreateClassCompleted} />
      </Navigator>
    </NavigationContainer>
  );
}

export default AppStack;
