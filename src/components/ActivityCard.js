import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
// import { strToDate } from '../api/strToDate';

const ActivityCard = ({
  img,
  heading,
  description,
  onPress,
  targetScreen,
}) => {
  // {console.log("targetScreen",targetScreen)}
  return (
    <TouchableOpacity style={styles.wrapper} onPress={onPress}>
      <View style={styles.leftView}>
        <View style={styles.iconCont}>
          <Image source={img} width={45} height={45} />
        </View>
      </View>
      <View style={styles.rightView}>
        {/* <TouchableOpacity onPress={() => navigation.navigate(targetScreen)}> */}
          <Text style={styles.heading}>{heading}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ActivityCard;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#0000000a",
    height: 83,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 13,
    gap: 18,
    borderRadius: 16,
    marginBottom: 27,
  },
  iconCont: {
    backgroundColor: "white",
    borderRadius: 13,
    padding: 16,
    position: "relative",
    top: 13,

    shadowColor: "#6060604d",
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  heading: {
    fontSize: 15,
    fontFamily: "bold",
  },
  description: {
    fontSize: 13,
    color: "#aeaeaeb0",
    fontFamily: "regular",
  },
});
