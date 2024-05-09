import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { strToDate } from "../api/strToDate";
// import Spinner from "react-native-loading-spinner-overlay";

// {strToDate("day", cases[3] ? cases[3] : cases[4])}

// const CheckInRecordCard = ({ fourth, fifth }) => {
//   console.log("test sick records", record);
//   const parsedData = record.reduce((acc, [id, , , fourth, fifth]) => {
//     acc[id] = { fourth, fifth };
//     return acc;
//   }, {});

//   console.log("parsedData", parsedData);
//   return (
//     <View style={styles.container}>
//       <Text style={styles.date}>2023年 10月 05日 星期二</Text>
//       <View style={styles.bottomCont}>
//         <View style={styles.bottomLeft}>
//           <Image source={require("../../assets/download.png")} />
//           <Text style={styles.bottomLeftText}>簽到</Text>
//           <Text style={styles.bottomLeftTime}>09:00</Text>
//         </View>
//         <View style={styles.bottomRight}>
//           <Image source={require("../../assets/download.png")} />
//           <Text style={styles.bottomLeftText}>簽退</Text>
//           <Text style={styles.bottomLeftTime}>18:00</Text>
//         </View>
//       </View>
//     </View>
//   );
// };

const CheckInRecordCard = ({ id, fourth, fifth }) => {
  console.log("CheckInRecordCard id", fourth,fifth,id)
  return (
    <View style={styles.container}>
      {/* {Object.entries(parsedData).map(([id, { fourth, fifth }]) => ( */}
      <View key={id} style={styles.recordItem}>
        <Text style={styles.date}>
          {strToDate("date", fourth || fifth)}{" "}
          {strToDate("day", fourth || fifth)}
        </Text>
        <View style={styles.bottomCont}>
          <View style={styles.bottomLeft}>
            {
              <Image
                source={
                  fourth
                    ? require("../../assets/come_green.png")
                    : require("../../assets/come_red.png")
                }
              />
            }
            <Text style={styles.bottomLeftText}>簽到</Text>
            <Text style={styles.bottomLeftTime}>
              {strToDate("time", fourth)}
            </Text>
          </View>
          <View style={styles.bottomRight}>
            <Image
              source={
                fifth
                  ? require("../../assets/leave_green.png")
                  : require("../../assets/leave_red.png")
              }
            />
            <Text style={styles.bottomLeftText}>簽退</Text>
            <Text style={styles.bottomLeftTime}>
              {strToDate("time", fifth)}
            </Text>
          </View>
        </View>
      </View>
      {/* ))} */}
      {/* <Spinner
        visible={loading}
        textContent={"Loading..."}
        textStyle={styles.spinnerTextStyle}
        cancelable={true}
      /> */}
    </View>
  );
};

export default CheckInRecordCard;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
    marginBottom: 12,
    borderRadius: 16,
    flexDirection: "column",
    gap: 16,
  },
  date: {
    color: "#343434",
    fontFamily: "bold",
    fontSize: 15,
    fontStyle: "normal",
  },
  bottomCont: {
    flexDirection: "row",
    gap: 50,
  },
  bottomLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  bottomLeftText: {
    color: "#343434",
    fontFamily: "bold",
    fontSize: 15,
    marginLeft: 2,
  },
  bottomLeftTime: {
    color: "#343434",
    fontFamily: "bold",
    fontSize: 15,
    marginLeft: 12,
  },
  bottomRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
});
