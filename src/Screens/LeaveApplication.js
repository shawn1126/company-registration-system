import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  View,
} from "react-native";
import axios from "axios";
import React, { useState } from "react";
import Calendar from "react-native-calendar-range-picker";
import UpperGreenLayout from "../components/UpperGreenLayout";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { SelectList } from "react-native-dropdown-select-list";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useMappedState } from "redux-react-hook";
import { fetchData } from "../api/postSickData";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Button } from "react-native-paper";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const LeaveApplication = () => {
  const tabBarHeight = useBottomTabBarHeight();
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const userInformation = useMappedState((state) => state.userInformation);
  const [todayRecord, setTodayRecord] = useState(userInformation.todayRecord);

  const [StartedselectedDate, setStartedSelectedDate] = useState("");
  const [EndedSelectedDate, setEndedSelectedDate] = useState("");
  const [reason, setReason] = useState("");
  // const [name, setName] = useState("");
  const [selected, setSelected] = React.useState("");
  //   const [selectedTime, setSelectedTime] = useState(new Date());
  //   const [showTimePicker, setShowTimePicker] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [isSubmitLeavingButtonDisabled, setSubmitLeavingButtonDisabled] =
    useState(false); // Assume initially button is disabled
  const navigation = useNavigation(); // Hook to get access to navigation object

  // const [isBtnDisabled, setIsBtnDisabled] = useState(true); // Assume initially button is disabled
  const isBtnDisabled =
    !StartedselectedDate ||
    !EndedSelectedDate ||
    !reason ||
    !startTime ||
    !endTime;

  const onChangeStartTimePicker = (event, selectedTime) => {
    setStartTime(selectedTime || startTime); // Update startTime with selected time or keep the old value if selection is cancelled
  };

  const onChangeEndTimePicker = (event, selectedTime) => {
    setEndTime(selectedTime || endTime); // Update endTime with selected time or keep the old value if selection is cancelled
  };

  const padWithZero = (number) => {
    return number < 10 ? `0${number}` : number;
  };

  const onSubmitLeavingInfo = async () => {
    console.log("StartedselectedDate", StartedselectedDate);
    console.log("EndedSelectedDate", EndedSelectedDate);
    console.log("leaving category", selected);
    console.log("reason", reason);
    console.log("startTime", startTime);
    console.log("endTime", endTime);
    dayjs.extend(utc);
    const startTimeUtc8 = dayjs.utc(startTime).utcOffset(8); // Convert to UTC+8
    const endTimeUtc8 = dayjs.utc(endTime).utcOffset(8); // Convert to UTC+8

    const starthours = padWithZero(startTimeUtc8.hour()); // get hours
    const startminutes = padWithZero(startTimeUtc8.minute()); // get minutes
    const startseconds = padWithZero(startTimeUtc8.second()); // get minutes

    // const endhours = endTimeUtc8.hour(); // get hours
    // const endminutes = endTimeUtc8.minute(); // get minutes

    const endhours = padWithZero(endTimeUtc8.hour());
    const endminutes = padWithZero(endTimeUtc8.minute());
    const endseconds = padWithZero(startTimeUtc8.second()); // get minutes

    let fetchJson = {
      doing: "WRITE",
      user: userInformation.user.account,
      startedselectedDate: StartedselectedDate,
      startTime: `${starthours}:${startminutes}:${startseconds}`,
      endedselectedDate: EndedSelectedDate,
      endTime: `${endhours}:${endminutes}:${endseconds}`,
      reason: reason,
      selected: selected,
    };

    // call api
    fetchData(fetchJson)
      .then((response) => {
        console.log("response", response);
      })
      .catch((err) => {
        console.log("postdaat err", err);
      });

    // try {
    //   await axios.post("../api/postSickData", {
    //     // user: userInformation.user.account,
    //     use: "shawn",
    //     startedselectedDate: StartedselectedDate,
    //     startTime: startTime,
    //     endedselectedDate: EndedSelectedDate,
    //     endTime: endTime,
    //     reason: reason,
    //     selected: selected,
    //   });
    // } catch (e) {
    //   console.log("api error", e);
    // }

    Alert.alert(
      "請假成功！",
      // `您於\n${StartedselectedDate} ${starthours}:${startminutes}\n${EndedSelectedDate} ${endhours}:${endminutes}\n${reason}\n${selected}`
      `您於\n${StartedselectedDate} ${startTimeUtc8.format(
        "HH:mm"
      )}\n${EndedSelectedDate} ${endTimeUtc8.format(
        "HH:mm"
      )}${reason}\n${selected}`
    );
  };

  return (
    <UpperGreenLayout>
      {/* <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingViewStyle}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 80}
      > */}
      {/* <SafeAreaView> */}
      <KeyboardAwareScrollView>
        <ScrollView style={styles.scrollViewStyle}>
          <View style={styles.pageWrapper}>
            <View style={styles.topRow}>
              <View style={styles.backBtnText}>
                <Ionicons
                  name="ios-chevron-back-sharp"
                  size={24}
                  color="white"
                  onPress={() => navigation.navigate("HomeScreenNew")} // Replace 'Home' with the route name of your home screen
                />
                <Text style={styles.heading}>請假單</Text>
              </View>
              <AntDesign
                style={styles.bellIcon}
                name="bells"
                size={24}
                color="white"
              />
            </View>
            <ScrollView>
              <View style={styles.calTimeWrapper}>
                <View style={styles.calWrapper}>
                  <Calendar
                    startDate="2023-10-21"
                    endDate="2023-10-26"
                    onChange={({ startDate, endDate }) => {
                      console.log({ 起始日: startDate, 結束日: endDate });
                      setStartedSelectedDate(startDate);
                      setEndedSelectedDate(endDate);
                      setShowStartTimePicker(true);
                      setShowEndTimePicker(true);
                    }}
                    style={{
                      container: {
                        borderRadius: 50,
                      },
                    }}
                  />
                </View>
                <View style={styles.selectedCont}>
                  <View style={styles.selectedDateTimeCont}>
                    <Text style={styles.selectedDateDetails}>開始</Text>
                    <Text style={styles.selectedDateDetails}>
                      {StartedselectedDate}
                    </Text>
                    <DateTimePicker
                      testID="startTimePicker"
                      value={startTime}
                      mode={"time"}
                      is24Hour={true}
                      display="default"
                      onChange={onChangeStartTimePicker}
                    />
                  </View>
                  <View style={styles.selectedDateTimeCont}>
                    <Text style={styles.selectedDateDetails}>結束</Text>
                    <Text style={styles.selectedDateDetails}>
                      {EndedSelectedDate}
                    </Text>
                    <DateTimePicker
                      testID="endTimePicker"
                      value={endTime}
                      mode={"time"}
                      is24Hour={true}
                      display="default"
                      onChange={onChangeEndTimePicker}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.cardCont}>
                <SelectList
                  setSelected={(val) => setSelected(val)}
                  data={sickData}
                  save="value"
                  placeholder="請選擇假別"
                />
                <View style={styles.inputCont}>
                  <TextInput
                    style={styles.textArea}
                    placeholder="請假原因"
                    value={reason}
                    onChangeText={(text) => setReason(text)}
                  />
                </View>
                <TouchableOpacity
                  mode="contained"
                  style={{
                    ...styles.formBtn,
                    backgroundColor: isBtnDisabled ? "#6aad2b66" : "#1C7A53",
                  }}
                  onPress={onSubmitLeavingInfo}
                  disabled={isBtnDisabled}
                >
                  <Text style={styles.btnText}>請假</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
          {/* </SafeAreaView> */}
        </ScrollView>
        {/* </KeyboardAvoidingView> */}
      </KeyboardAwareScrollView>
    </UpperGreenLayout>
  );
};

export default LeaveApplication;

const styles = StyleSheet.create({
  keyboardAvoidingViewStyle: {
    flex: 2,
    position: "relative", // Relative positioning for the KeyboardAvoidingView
  },
  scrollViewStyle: {
    flex: 2, // Allows the ScrollView to expand to fill the space
    position: "relative", // Relative positioning for the KeyboardAvoidingView
  },
  pageWrapper: {
    paddingHorizontal: 19,
    position: "relative", // Relative positioning for the pageWrapper

  },
  topRow: {
    paddingHorizontal: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 28,
    marginTop:17,
    
    position:"relative"

  },
  backBtnText: {
    flexDirection: "row",
    alignItems: "center",
    gap: 1,
    marginLeft:-6
  },
  heading: {
    color: "#FFF",
    fontFamily: "bold",
    fontSize: 20,
  },
  calTimeWrapper: {
    backgroundColor: "#FFF",
    marginBottom: 20,
    borderRadius: 15,
    padding: 5,
  },

  calWrapper: {
    height: windowHeight * 0.4,
  },
  cardCont: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 20,
  },
  inputCont: {
    marginTop: 10,
    marginBottom: 20,
  },
  textArea: {
    backgroundColor: "#acacac1a",
    paddingHorizontal: 18,
    paddingVertical: 11,
    fontSize: 15,
    fontFamily: "bold",
    borderRadius: 9,
  },
  formBtn: {
    paddingTop: 11,
    paddingBottom: 7,
    borderRadius: 9,
    alignItems: "center",
  },
  btnText: {
    color: "#FFF",
    fontFamily: "extraBold",
    fontSize: 24,
  },
  selectedDateTimeCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedCont: {
    paddingTop: 13,
    paddingHorizontal: 15,
    paddingBottom: 16,
    gap: 13,
  },
  selectedDateDetails: {
    fontSize: 15,
  },
});

const sickData = [
  { key: "1", value: "普通傷病假" },
  { key: "2", value: "事假" },
  { key: "3", value: "喪假" },
  { key: "4", value: "特別休假" },
  { key: "5", value: "產假" },
  { key: "6", value: "生理假" },
  { key: "7", value: "婚假" },
  { key: "8", value: "公假" },
];
