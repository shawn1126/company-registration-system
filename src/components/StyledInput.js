import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
const StyledInput = ({ ...args }) => {
  return (
    <View style={styles.inputWrapper}>
      <TextInput {...args} style={styles.textInput} autoCapitalize="none" />
    </View>
  );
};

export default StyledInput;

const styles = StyleSheet.create({
  inputWrapper: {
    height: 50,
  },
  textInput: {
    flex: 1,
    backgroundColor: "#acacac1a",
    paddingHorizontal: 18,
    paddingVertical: 14,
    fontFamily: "regular",
    fontSize: 17,
    borderRadius: 16,
  },
});
