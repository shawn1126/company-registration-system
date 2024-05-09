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
import { useFocusEffect } from "@react-navigation/native";

import LeaveRecordCard from "../components/LeaveRecordCard";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const LeaveRecord = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [loadingVisible, setLoadingVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [leaveRecord, setLeaveRecord] = useState([]);

  const tabBarHeight = useBottomTabBarHeight();

  const userInformation = useMappedState((state) => state.userInformation);

  useFocusEffect(
    useCallback(() => {
      actionRecord("SELECT", userInformation.user.account);
      toggleLoading();
      return () => {};
    }, [userInformation.user.account])
  );

  const toggleLoading = () => {
    setLoadingVisible(!loadingVisible);
    setTimeout(function () {
      setLoadingVisible(false);
    }, 2500);
  };

  const actionRecord = (...factors) => {
    console.log("factors", factors);
    switch (factors[0]) {
      case "SELECT":
        var fetchJson = {
          doing: "SELECT",
          // action: "DEFULT",
          user: factors[1],
        };
        break;
    }
    // call api
    fetchData(fetchJson)
      .then((response) => {
        console.log("called leave record api");
        console.log("leave sick response", response.punchInRecord);
        if (factors[0] == "SELECT") {
          setLeaveRecord(response.punchInRecord.reverse());
          // console.log(
          //   "response.punchInRecord.reverse()",
          //   response.punchInRecord.reverse()
          // );
          setIsLoading(false);
        } else if (factors[0] == "REVISE") {
          setIsLoading(false);
        }
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
            <Text style={styles.upperBarText}>請假紀錄</Text>
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
              {leaveRecord.map(
                ([id, second, third, fourth, fifth, sixth, seventh]) => (
                  <LeaveRecordCard
                    key={id}
                    second={second}
                    third={third}
                    fourth={fourth}
                    fifth={fifth}
                    sixth={sixth}
                    seventh={seventh}
                  />
                )
              )}
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
