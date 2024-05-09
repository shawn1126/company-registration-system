import { Image, StyleSheet, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { strToDate } from "../api/strToDate";
import { useMappedState } from "redux-react-hook";
import {adjustTime} from "../api/adjustTime";

const ApproveRecordCard = (
    {record}
) => {
  const userInformation = useMappedState((state) => state.userInformation);
  // console.log("rrecorrd",record);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.rowLeft}>
          <Text style={styles.rowLeftText}>簽核類別</Text>
        </View>
        <View style={styles.rowRight}>
          {/* <Entypo name="dot-single" size={24} color={"#6AAD2B"} /> */}
          <Text style={styles.rowRightText}>請假</Text>
        </View>
      </View>
      <View style={[{ height: 1, overflow: "hidden", marginVertical: 8 }]}>
        <View
          style={[
            {
              height: 2,
              borderWidth: 3,
              borderColor: "#797B86",
              borderStyle: "dashed",
            },
          ]}
        ></View>
      </View>
      <View style={styles.rowsContainer}>
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Text style={styles.rowLeftText}>申請人</Text>
          </View>
          <View style={styles.rowRight}>
            <Text style={styles.rowRightText}>
              {/* {userInformation.user.account} */}
              {record.name}
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Text style={styles.rowLeftText}>假別</Text>
          </View>
          <View style={styles.rowRight}>
            <Text style={styles.rowRightText}>{record.leaveType}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Text style={styles.rowLeftText}>原因</Text>
          </View>
          <View style={styles.rowRight}>
            <Text style={styles.rowRightText}>{record.reason}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Text style={styles.rowLeftText}>開始時間</Text>
          </View>
          <View style={styles.rowRight}>
            <Text style={styles.rowRightText}>{strToDate("date", record.startDate)}</Text>
            <Text style={styles.rowRightTextTime}>
              {adjustTime(record.startTime )}
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Text style={styles.rowLeftText}>結束時間</Text>
          </View>
          <View style={styles.rowRight}>
            <Text style={styles.rowRightText}>{strToDate("date", record.endDate)}</Text>
            <Text style={styles.rowRightTextTime}>
              {adjustTime(record.endTime)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ApproveRecordCard;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
    marginBottom: 22,
    borderRadius: 16,
    flexDirection: "column",
  },
  row: {
    flexDirection: "row",
    gap: 24,
  },
  rowLeft: {
    minWidth: 60,
  },
  rowLeftText: {
    color: "#797B86",
    fontFamily: "bold",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: 24,
  },
  rowRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowRightText: {
    color: "#343434",
    fontFamily: "bold",
    fontSize: 15,
    fontStyle: "normal",
    lineHeight: 24,
  },
  rowRightTextTime: {
    color: "#343434",
    fontFamily: "bold",
    fontSize: 15,
    fontStyle: "normal",
    lineHeight: 24,
    marginLeft: 12,
  },
  rowsContainer: {
    gap: 10,
  },
});
