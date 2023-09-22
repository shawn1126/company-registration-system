import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Calendar } from "react-native-calendars";
import { Button, TextInput } from "react-native-paper";
import { SelectList } from "react-native-dropdown-select-list";

const RegistrationLeaving = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [reason, setReason] = useState("");
  const [name, setName] = useState("");
  const [selected, setSelected] = React.useState("");

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
  };

  

  const onSubmit = () => {
    console.log("selectedDate",selectedDate);
    console.log("reason",selected);
    console.log("name",name); 
    
    if (!selectedDate || !selected || !name) {
      Alert.alert("請填完所有請假資訊");
      return;
    }
    // Handle the submit logic, maybe call an API to save the data
    Alert.alert(
      "Leaving Registered",
      `Leaving registered for ${name} on ${selectedDate} for ${selected}`
    );
  };

  return (
    <View style={styles.container}>
      <Calendar onDayPress={handleOnDayPress} />
      <TextInput
        label="Name"
        value={name}
        onChangeText={(text) => setName(text)}
        style={styles.input}
      />
      {/* <TextInput
        label="Reason for Leave"
        value={reason}
        onChangeText={(text) => setReason(text)}
        multiline
        numberOfLines={3}
        style={styles.input}
      /> */}
      <SelectList
        setSelected={(val) => setSelected(val)}
        data={data}
        save="value"
        placeholder="請選擇假別"
      />

      <Button mode="contained" onPress={onSubmit} style={styles.button}>
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
  },
});

export default RegistrationLeaving;
