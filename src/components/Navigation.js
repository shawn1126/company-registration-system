import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "../Screens/LoginScreen";
import IndexScreen from "../Screens/IndexScreen";
import HomeScreenNew from "../Screens/Home/HomeScreenNew";
import LeaveRecord from "../Screens/LeaveRecord";
import CheckInRecords from "../Screens/CheckInRecords";
import HomeScreen from "../Screens/Home/HomeScreen";
import HomeDetailScreen from "../Screens/Home/HomeDetailScreen";
import RegistrationLeaving from "../Screens/Home/RegistrationLeaving";
import LeaveApplication from "../Screens/LeaveApplication";
import AddSickLeaveApplication from "../Screens/AddSickLeaveApplication";
import ApproveRecord from "../Screens/ApproveRecord";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import { FontAwesome } from "@expo/vector-icons";
import { File_dock_add } from "../../assets/File_dock_add.png";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Network from "expo-network";
import { useMappedState, useDispatch } from "redux-react-hook";

import { LoginInformation } from "../redux/action";

const Navigation = () => {
  const [IpAddressValidation, setIPAddressValidation] = useState(false);
  const [userName, setUserName] = useState("");
  const [initialRoute, setInitialRoute] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const disPatch = useDispatch();
  const userInformation = useMappedState((state) => state.userInformation);

  const ipVerifiyData = [
    { key: "Robert", value: "192.168.31.174" },
    { key: "Eric", value: "192.168.31.156" },
    { key: "Ivan", value: "192.168.31.22" },
    { key: "Howard", value: "192.168.31.206" },
    { key: "Freda", value: "192.168.31.115" },
    { key: "Nicole", value: "192.168.31.137" },
    { key: "Shawn", value: "192.168.31.66" },
    { key: "Justin", value: "192.168.31.155" },
    { key: "Derek", value: "192.168.31.9" },
  ];
  function findUserByIP(ip) {
    const match = ipVerifiyData.find((item) => item.value === ip);
    return match ? match.key : "";
  }
  async function login() {
    const ip = await Network.getIpAddressAsync();
    console.log("ipAddress", ip);
    const user = findUserByIP(ip);
    setIpAddress(ip);
    setUserName(user);
    if (user) {
      console.log("your ip address is at", ip);
      disPatch(LoginInformation({ user: { account: user } }));
      // navigation.navigate("HomeScreenNew"); //進入index screen
      setIPAddressValidation(true);
      setInitialRoute("HomeScreenNew");
    } else {
      console.log("your ip address is wrong.please connect to company wifi.");
      setIPAddressValidation(false);
      setInitialRoute("LoginScreen");

      // Alert.alert(`請檢查您手機是否使用公司內網進行登入`);
    }
  }
  const Tab = createBottomTabNavigator();

  useEffect(() => {
    login();
    // }, [ipAddress]);
  }, []);

  // Conditional rendering
  if (initialRoute === "") {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    ); // Or any other loading indicator
  }
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={initialRoute}
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#343434",
            borderTopColor: "transparent",
            height: 78,
            paddingTop: 10,
          },
          tabBarItemStyle: {
            marginHorizontal: 1, // Adjust this value to control the space between tab items
          },
        }}
      >
        <Tab.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={() => ({
            tabBarStyle: {
              display: "none",
            },
            tabBarButton: () => null,
          })}
        />
        <Tab.Screen
          options={{
            tabBarActiveTintColor: "#9ABA24",
            tabBarInactiveTintColor: "white",
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" size={size} color={color} />
            ),
          }}
          name="HomeScreenNew"
          component={HomeScreenNew}
        />
        <Tab.Screen
          options={{
            tabBarActiveTintColor: "#9ABA24",
            tabBarInactiveTintColor: "white",
            tabBarLabel: "打卡紀錄",
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="calendar" size={size} color={color} />
            ),
            // tabBarIcon: ({ color, size }) => (
            //   <Ionicons name="md-checkmark-circle" size={size} color={color} />
            // ),
          }}
          name="signinRecords"
          component={CheckInRecords}
        />
        <Tab.Screen
          options={{
            tabBarActiveTintColor: "#9ABA24",
            tabBarInactiveTintColor: "white",
            tabBarLabel: "請假紀錄",
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="calendar" size={size} color={color} />
            ),
            // tabBarIcon: ({ color, size }) => (
            //   <Ionicons name="md-checkmark-circle" size={size} color={color} />
            // ),
          }}
          name="LeaveRecord"
          component={LeaveRecord}
        />
        {/* {(userInformation.user.account == "Freda" ||
          "Shawn" ||
          "Justin" ||
          "Ned" ||
          "Derek") && ( */}
        <Tab.Screen
          options={{
            tabBarActiveTintColor: "#9ABA24",
            tabBarInactiveTintColor: "white",
            tabBarLabel: "簽核",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="pencil" size={size} color={color} />
            ),
            // tabBarIcon: ({ color, size }) => (
            //   <Ionicons name="md-checkmark-circle" size={size} color={color} />
            // ),
          }}
          name="ApproveRecord"
          component={ApproveRecord}
        />
        {/* )} */}
        <Tab.Screen
          options={{
            tabBarActiveTintColor: "#9ABA24",
            tabBarInactiveTintColor: "white",
            tabBarLabel: "請假",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="brain" size={size} color={color} />
            ),
            // tabBarIcon: ({ color, size }) => (
            //   <Ionicons name="md-checkmark-circle" size={size} color={color} />
            // ),
          }}
          name="LeaveApplication"
          component={LeaveApplication}
        />
        <Tab.Screen
          options={{
            tabBarActiveTintColor: "#9ABA24",
            tabBarInactiveTintColor: "white",
            tabBarLabel: "加班",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="work" size={size} color={color} />
            ),
            // tabBarIcon: ({ color, size }) => (
            //   <Ionicons name="md-checkmark-circle" size={size} color={color} />
            // ),
          }}
          name="AddSickLeaveApplication"
          component={AddSickLeaveApplication}
        />
        {/* <Tab.Screen name="簽核" component={LeaveRecord} />
        <Tab.Screen name="我的" component={LeaveApplication} /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
