import React, { useState } from "react";
import { View, StyleSheet, Alert, Text, Modal } from "react-native";
import { Calendar } from "react-native-calendars";
import { Button, TextInput } from "react-native-paper";
import { SelectList } from "react-native-dropdown-select-list";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

const RegistrationLeaving = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [reason, setReason] = useState("");
  const [name, setName] = useState("");
  const [selected, setSelected] = React.useState("");
  //   const [selectedTime, setSelectedTime] = useState(new Date());
  //   const [showTimePicker, setShowTimePicker] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [isSubmitLeavingButtonDisabled, setSubmitLeavingButtonDisabled] =
    useState(false); // Assume initially button is disabled

  const data = [
    { key: "1", value: "普通傷病假" },
    { key: "2", value: "事假" },
    { key: "3", value: "喪假" },
    { key: "4", value: "特別休假" },
    { key: "5", value: "產假" },
    { key: "6", value: "生理假" },
    { key: "7", value: "婚假" },
    { key: "8", value: "公假" },
  ];

  const handleOnDayPress = (day) => {
    console.log("日", day.dateString);
    setSelectedDate(day.dateString);
    Alert.alert("您選擇了", day.dateString);
    setShowStartTimePicker(true);
    setShowEndTimePicker(true);
  };
  const onStartTimeChange = (event, selectedTime) => {
    const currentTimeSelected = selectedTime || startTime;
    setShowStartTimePicker(Platform.OS === "ios");
    setStartTime(currentTimeSelected);
  };

  // New function to handle end time change.
  const onEndTimeChange = (event, selectedTime) => {
    const currentTimeSelected = selectedTime || endTime;
    if (startTime > endTime) {
      Alert.alert("請選擇正確時間");
    }
    setShowEndTimePicker(Platform.OS === "ios");
    setEndTime(currentTimeSelected);
  };

  const onSubmitLeavingInfo = () => {
    console.log("selectedDate", selectedDate);
    console.log("leaving category", selected);
    console.log("name", name);
    console.log("reason", reason);
    console.log("startTime", startTime);
    console.log("endTime", endTime);
    dayjs.extend(utc);
    const startTimeUtc8 = dayjs.utc(startTime).utcOffset(8); // Convert to UTC+8
    const endTimeUtc8 = dayjs.utc(endTime).utcOffset(8); // Convert to UTC+8

    const starthours = startTimeUtc8.hour(); // get hours
    const startminutes = startTimeUtc8.minute(); // get minutes
    const endhours = endTimeUtc8.hour(); // get hours
    const endminutes = endTimeUtc8.minute(); // get minutes

    // const startTimeUtc8Date = ((moment(startTime).tz("Asia/Shanghai")).format()); // Shanghai is in UTC+8 timezone
    // const endTimeUtc8Date = ((moment(endTime).tz("Asia/Shanghai")).format());
    // console.log("startTimeUtc8Date", startTimeUtc8Date);
    // console.log("endTimeUtc8Date", endTimeUtc8Date);
    // const formattedTime = selectedTime.toLocaleTimeString("en-US", {
    //   hour: "2-digit",
    //   minute: "2-digit",
    // });
    // console.log("Selected Time", formattedTime);

    if (!selectedDate && reason && selected && startTime < endTime) {
      Alert.alert("請選擇請假日期");
      return;
    } else if (selectedDate && reason && !selected && startTime < endTime) {
      Alert.alert("請選擇請假類別");
      return;
    } else if (selectedDate && !reason && selected && startTime < endTime) {
      Alert.alert("請記得填寫請假原因");
      return;
    } else if (selectedDate && reason && selected && startTime > endTime) {
      Alert.alert("請填寫正確請假時間");
    } else {
      Alert.alert(
        "請假成功！",
        `您於\n${selectedDate} ${starthours}:${startminutes}\n${selectedDate} ${endhours}:${endminutes}\n${reason}\n${selected} 請假`
      );
    }
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={handleOnDayPress}
        style={{
          height: 300,
        }}
      />
      {/* <TextInput
        label="姓名"
        value={name}
        onChangeText={(text) => setName(text)}
        style={styles.input}
      /> */}
      {/* <Button
        mode="contained"
        onPress={() => setShowTimePicker(true)}
        style={styles.button}
      >
        請選擇當日請假時間
      </Button> */}
      {/* <Button
        mode="contained"
        onPress={() => setShowStartTimePicker(true)}
        style={styles.button}
      >
        請選擇開始時間
      </Button> */}
      <Text style={styles.text}>請選擇請假開始時間:</Text>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {showStartTimePicker && (
          <DateTimePicker
            testID="startTimePicker"
            value={startTime}
            mode={"time"}
            is24Hour={true}
            display="default"
            onChange={onStartTimeChange}
          />
        )}
      </View>
      <Text style={styles.text}>請選擇請假結束時間:</Text>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {showEndTimePicker && (
          <DateTimePicker
            testID="endTimePicker"
            value={endTime}
            mode={"time"}
            is24Hour={true}
            display="default"
            onChange={onEndTimeChange}
          />
        )}
      </View>
      {startTime && endTime && (
        <Text style={styles.text}>
          您選擇當日請假時間為: {`\n`}
          {selectedDate}
          {"   "}
          {`${startTime.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })} - ${endTime.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}`}
        </Text>
      )}

      <TextInput
        label="請假原因"
        value={reason}
        onChangeText={(text) => setReason(text)}
        multiline
        numberOfLines={1}
        style={styles.input}
      />
      <SelectList
        setSelected={(val) => setSelected(val)}
        data={data}
        save="value"
        placeholder="請選擇假別"
      />
      <Button
        mode="contained"
        onPress={onSubmitLeavingInfo}
        style={styles.button}
        disabled={isSubmitLeavingButtonDisabled}
      >
        請假
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
    color: "#2ecc71",
  },
  text: {
    marginVertical: 12,
    fontSize: 16,
    textAlign: "center",
  },
});

export default RegistrationLeaving;
