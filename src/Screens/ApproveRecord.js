import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import UpperGreenLayout from "../components/UpperGreenLayout";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { fetchData } from "../api/postSickData";

import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useMappedState } from "redux-react-hook";
import Spinner from "react-native-loading-spinner-overlay";

import ApproveRecordCard from "../components/ApproveRecordCard";
import { useFocusEffect } from "@react-navigation/native";


const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const LeaveRecord = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [loadingVisible, setLoadingVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [leaveRecord, setLeaveRecord] = useState([]);

  const tabBarHeight = useBottomTabBarHeight();

  const userInformation = useMappedState((state) => state.userInformation);

  //   useEffect(() => {
  //     //   actionRecord("QUERYALL", userInformation.user.account);
  //     actionRecord();
  //     toggleLoading();
  //   }, []);

  useFocusEffect(
    useCallback(() => {
      // Code to run when the screen is focused
      actionRecord("QUERYALL", userInformation.user.account);
      toggleLoading();

      return () => {
        // Optional: Code to run when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  const toggleLoading = () => {
    setLoadingVisible(!loadingVisible);
    setTimeout(function () {
      setLoadingVisible(false);
    }, 2500);
  };

  const actionRecord = () => {
    //   console.log("factors", factors);
    //   switch (factors[0]) {
    //     case "QUERYALL":
    var fetchJson = {
      doing: "QUERYALL",
      // action: "DEFULT",
      // user: factors[1],
    };
    //       break;
    //   }
    // call api
    fetchData(fetchJson)
      .then((response) => {
        console.log("called leave record api");
        console.log("leave sick response", response.filterallRecord);

        //   if (factors[0] == "SELECT") {
        // setLeaveRecord(response.filterallRecord.reverse());
        // console.log(
        //   "response.punchInRecord.reverse()",
        //   response.filterallRecord.reverse()
        // );
        const transformedLeaveRecords = response.filterallRecord
          .reverse()
          .map((record) => ({
            name: record[0],
            startDate: record[1],
            startTime: record[2],
            endDate: record[3],
            endTime: record[4],
            reason: record[5],
            leaveType: record[6],
          }));
        setLeaveRecord(transformedLeaveRecords);

        setIsLoading(false);
        //   } else if (factors[0] == "REVISE") {
        //     setIsLoading(false);
        //   }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(true);
      });
  };

  return (
    <UpperGreenLayout>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.pageWrapper}>
          <View style={styles.upperBar}>
            <Text style={styles.upperBarText}>簽核</Text>
            <View style={styles.dotsCont}>
              <Entypo
                name="dot-single"
                size={24}
                color={activeTab === 0 ? "#AAFF01" : "#6BA98F"}
              />
              <Entypo
                name="dot-single"
                size={24}
                color={activeTab === 1 ? "#AAFF01" : "#6BA98F"}
              />
            </View>
            <AntDesign
              style={styles.bellIcon}
              name="bells"
              size={24}
              color="white"
            />
          </View>
          <View style={styles.contentContainer}>
            <ScrollView
              style={{
                marginBottom: tabBarHeight,
              }}
            >
              {/* {leaveRecord.map(
                ([id, second, third, fourth, fifth, sixth, seventh]) => (
                  <ApproveRecordCard
                    key={id}
                    second={second}
                    third={third}
                    fourth={fourth}
                    fifth={fifth}
                    sixth={sixth}
                    seventh={seventh}
                  />
                )
              )} */}
              {leaveRecord.map((record) => (
                <ApproveRecordCard
                  key={`${record.startTime}-${record.name}-${record.endDate}`}
                  record={record}
                />
              ))}

              {/* <LeaveRecordCard />
                <LeaveRecordCard />
                <LeaveRecordCard />
                <LeaveRecordCard /> */}
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
      <Spinner
        visible={isLoading}
        textContent={"Loading..."}
        textStyle={styles.spinnerTextStyle}
        cancelable={true}
      />
    </UpperGreenLayout>
  );
};

export default LeaveRecord;

const styles = StyleSheet.create({
  pageWrapper: {
    paddingHorizontal: 19,
    flex: 1,
  },
  upperBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
    marginBottom: 18,
  },
  upperBarText: {
    color: "#FFF",
    fontFamily: "bold",
    fontSize: 20,
  },
  dotsCont: {
    flexDirection: "row",
    width: 30,
    position: "absolute",
    left: "50%",
    transform: [{ translateX: -15 }],
    top: 5,
  },
  contentContainer: {
    paddingVertical: 10,
    flex: 1,
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
});
