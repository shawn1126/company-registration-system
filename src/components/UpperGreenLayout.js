import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const UpperGreenLayout = ({ children }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.upperBox}>
        <View style={styles.bottomCurve}></View>
      </View>
      <View style={styles.appPages}>{children}</View>
    </View>
  );
};

export default UpperGreenLayout;

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    flex: 1,
  },
  upperBox: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: windowHeight * 0.3,
    backgroundColor: "#1C7A53",
    zIndex: 2,
  },
  bottomCurve: {
    position: "absolute",
    bottom: -25,
    width: windowWidth,
    height: 74,
    left: 0,
    right: 0,
    backgroundColor: "#1C7A53",
    borderRadius: 26,
  },
  appPages: {
    position: "relative",
    top: 0,
    left: 0,
    right: 0,
    height: windowHeight,
    zIndex: 3,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 30,
  },
});
