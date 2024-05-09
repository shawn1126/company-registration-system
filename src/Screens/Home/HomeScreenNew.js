import {
  Button,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { strToDate } from "../../api/strToDate";

import { AntDesign } from "@expo/vector-icons";
import ActivityCard from "../../components/ActivityCard";
import { ScrollView } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import UpperGreenLayout from "../../components/UpperGreenLayout";
import { fetchData } from "../../api/postUserData";
import { NetworkInfo } from "react-native-network-info";
import { useMappedState, useDispatch } from "redux-react-hook";
import { LoginInformation } from "../../redux/action";
import { LeaveApplication } from "../LeaveApplication";

import * as Network from "expo-network";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const upperBoxHeight = windowHeight * 0.27;
const lowerBoxHeight = windowHeight * 0.73;

const HomeScreenNew = () => {
  const tabBarHeight = useBottomTabBarHeight();
  const [_mins, setMins] = useState("");
  const [_hours, setHours] = useState("");
  const [_secs, setSecs] = useState("");
  const [_localtime, setLocalTime] = useState("");
  const userInformation = useMappedState((state) => state.userInformation);
  const [todayRecord, setTodayRecord] = useState(userInformation.todayRecord);
  const [ipAddress, setIpAddress] = useState("");
  const [registerForLeavingbtn, setRegisterForLeavingbtn] = useState(false);
  const [registerForComingbtn, setRegisterForComingbtn] = useState(true);
  const [IpAddressValidation, setIPAddressValidation] = useState(false);
  const [userName, setUserName] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      updateLocalTime();
      lastRecord();
      // You might want to set an interval to update the time every minute or every second
      const intervalId = setInterval(updateLocalTime, 1000); // updates every second
      return () => clearInterval(intervalId); // Cleanup on component unfocus
    }, [])
  );

  const navigation = useNavigation(); // Hook to get access to navigation object

  // Function to handle navigation when "請假單" is clicked

  const ipVerifiyData = [
    { key: "Robert", value: "192.168.31.174" },
    { key: "Eric", value: "192.168.31.156" },
    { key: "Ivan", value: "192.168.31.22" },
    { key: "Howard", value: "192.168.31.206" },
    { key: "Freda", value: "192.168.31.115" },
    { key: "Nicole", value: "192.168.31.137" },
    { key: "Shawn", value: "192.168.31.66" },
    { key: "Justin", value: "192.168.31.155" },
    { key: "Derek", value: "192.168.31.9" },
  ];
  const disPatch = useDispatch();

  async function login() {
    // Network.getMacAddressAsync()
    //   .then((macAddress) => {
    //     console.log(macAddress);
    //   })
    //   .catch((error) => console.log(error));
    // Get Local IP
    const ip = await Network.getIpAddressAsync();
    // console.log("ipAddress", ip);
    const user = findUserByIP(ip);
    // console.log("login user", user);
    setUserName(user);
    setIpAddress(ip);
    // console.log(
    //   "Config.COMPANY_IP_ADDRES",
    //   process.env.EXPO_PUBLIC_COMPANY_IP_ADDRESS
    // );


    if (ip.includes("192.168.31") && user) {
      // console.log("your ip address is at", ip);
      disPatch(LoginInformation({ user: { account: user } }));
      // navigation.navigate("homeScreen"); //進入index screen
      setIPAddressValidation(true);
    } else {
      // console.log("your ip address is wrong.please connect to company wifi.");
      setIPAddressValidation(false);

      Alert.alert(`請檢查您手機是否使用公司內網進行登入`);
    }
  }

  function findUserByIP(ip) {
    const match = ipVerifiyData.find((item) => item.value === ip);
    return match ? match.key : "";
  }

  const setComingRecord = async (_setData) => {
    let fetchJson = {
      doing: "PUNCHIN",
      punchIn: _setData,
    };
    await fetchData(fetchJson)
      .then((respone) => {
        if (respone.state == "success") {
          // 更新當日紀錄
          lastRecord();
          Alert.alert("上傳成功");
          setRegisterForComingbtn(false);
          setRegisterForLeavingbtn(true);
        } else {
          Alert.alert("打卡失敗，請確認網路或連繫MI");
        }
      })
      .catch((err) => {
        // console.log("失敗", err);
      });
  };

  const lastRecord = () => {
    var fetchJson = {
      doing: "SELECT",
      action: "DEFULT",
      account: userInformation.user.account,
      interval: ["", ""],
    };

    fetchData(fetchJson)
      .then((response) => {
        // console.log("shawn response",response)
        // console.log("shawn response.punchInRecord",response.punchInRecord)
        let last = response.punchInRecord.slice(-1)[0];
        // console.log("test last", last);
        setTodayRecord(last);
      })
      .catch((err) => {
        // console.log(err);
      });
  };
  const punchIn = (_action, _time) => {
    let account = userInformation.user.account;
    let loginCode = "123:456:789";
    var punchInData = [account, loginCode, _time, _action];
    // console.log("1120 test todayRecord", todayRecord);
    // 判斷是否今天有打卡紀錄
    if (todayRecord) {
      // 上班未打過卡 或 下班未打過卡
      if (
        (_action == "簽到" && todayRecord[3] == "") ||
        (_action == "簽退" && todayRecord[4] == "")
      ) {
        // 帶入當日SN
        punchInData.splice(0, 0, todayRecord[0]);
        // 上傳
        setComingRecord(punchInData);
      } else {
        // 已打過簽到或簽退卡，修正打卡內容
        punchInData.splice(0, 0, todayRecord[0]);
        console.log(
          "1122 punchInData.splice(0, 0, todayRecord[0]);",
          punchInData.splice(0, 0, todayRecord[0])
        );
        console.log("1206 punchInData",punchInData)
        Alert.alert(`${_action}已打過卡\n是否重新${_action}`, null, [
          {
            text: "確定",
            // 確認上傳(覆蓋)
            onPress: () => setComingRecord(punchInData),
            style: "cancel",
          },
          {
            text: "取消",
            onPress: () => console.log("取消"),
            style: "cancel",
          },
        ]);
      }
    } else {
      // 當日第一次打卡，新增空字串，API會新增新SN
      punchInData.splice(0, 0, "");
      console.log("新增新SN");
      setComingRecord(punchInData);
    }
  };
  // const ipAlert = async () => {
  //   const ip = await Network.getIpAddressAsync();
  //   console.log("ip",ip);
  //   setIpAddress(ip);

  // };
  // async function IPAddressValidation() {
  //   // Network.getMacAddressAsync()
  //   //   .then((macAddress) => {
  //   //     console.log(macAddress);
  //   //   })
  //   //   .catch((error) => console.log(error));
  //   // Get Local IP
  //   const ip = await Network.getIpAddressAsync();
  //   console.log("ipAddress", ip);
  //   // const res = await axios.get('https://geolocation-db.com/json/')
  //   // let ip = res.data.IPv4;
  //   setIpAddress(ip);
  //   console.log(
  //     "Config.COMPANY_IP_ADDRES",
  //     process.env.EXPO_PUBLIC_COMPANY_IP_ADDRESS
  //   );
  //   console.log("test rip", ip);
  //   if (ip.includes("192.168.31")) {
  //     console.log("your ip address is at", ip);
  //     setIPAddressValidation(true);
  //   } else {
  //     console.log("your ip address is wrong.please connect to company wifi.");
  //     setIPAddressValidation(false);
  //   }
  // }

  const showComingPunchAlert = () => {
    console.log("calling showComingPunchAlert");
    console.log("test 11222 todayRecord ",todayRecord )
    // if (IpAddressValidation) {
      // console.log("ipAddress", ipAddress);
      // console.log(
      //   "Config.COMPANY_IP_ADDRESS",
      //   process.env.EXPO_PUBLIC_COMPANY_IP_ADDRESS
      // );
      let now = new Date();
      let nowDateTime = strToDate("", now);
      // console.log("nowDateTime", nowDateTime);
      let nowTime = strToDate("time", now);
      Alert.alert(`現在時間:${nowTime}`, null, [
        {
          text: "簽到",
          onPress: () => punchIn("簽到", nowDateTime),
          style: "cancel",
        },
        // {
        //   text: "簽退",
        //   onPress: () => punchIn("簽退", nowDateTime),
        //   style: "destructive",
        // },
        {
          text: "取消",
          onPress: () => console.log("取消"),
          style: "cancel",
        },
      ]);
    // } else {
    //   Alert.alert(`請連到公司內網進行簽到`);
    // }
  };
  const showLeavingPunchAlert = () => {
    console.log("calling showLeavingPunchAlert");
    // if (IpAddressValidation) {
      // console.log("ipAddress", ipAddress);
      // console.log(
      //   "Config.COMPANY_IP_ADDRESS",
      //   process.env.EXPO_PUBLIC_COMPANY_IP_ADDRESS
      // );
      let now = new Date();
      let nowDateTime = strToDate("", now);
      let nowTime = strToDate("time", now);
      Alert.alert(`現在時間:${nowTime}`, null, [
        // {
        //   text: "簽到",
        //   onPress: () => punchIn("簽到", nowDateTime),
        //   style: "cancel",
        // },
        {
          text: "簽退",
          onPress: () => punchIn("簽退", nowDateTime),
          style: "destructive",
        },
        {
          text: "取消",
          onPress: () => console.log("取消"),
          style: "cancel",
        },
      ]);
    // } else {
    //   Alert.alert(`請連到公司內網進行簽退`);
    // }
  };
  function updateLocalTime() {
    let now = new Date();
    let nowTime = strToDate("time", now);
    let timeParts = nowTime.split(":");

    let hours = timeParts[0]; // "14"
    let minutes = timeParts[1]; // "55"
    let seconds = timeParts[2];
    setLocalTime(nowTime);
    setMins(minutes);
    setHours(hours);
    setSecs(seconds);

    // console.log("Hours:", hours);
    // console.log("Minutes:", minutes);
    // console.log("Seconds", seconds);
    // console.log("nowTime", nowTime);
  }
  useEffect(() => {
    updateLocalTime();
    lastRecord();

  }, [_localtime]);

  useEffect(() => {
    login();
    // }, [ipAddress]);
  }, []);

  return (
    <UpperGreenLayout>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.upperContainerNew}>
          {/* <AntDesign
            style={styles.bellIcon}
            name="bells"
            size={24}
            color="white"
          /> */}
          <View style={styles.nameDateCont}>
            <Text style={styles.nameText}>
              Hello {userInformation.user?.account} 😊
            </Text>
            <Text style={styles.dateText}>
              {strToDate("date", new Date())} {strToDate("day", new Date())}
            </Text>
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>現在時間</Text>
            <View style={styles.timeDigitsContainer}>
              <View style={styles.timeCont}>
                <Text style={styles.timeDigits}>{_hours}</Text>
                <Text style={styles.timeDivider}>:</Text>
                <Text style={styles.timeDigits}>{_mins}</Text>
                <Text style={styles.timeDivider}>:</Text>
                <Text style={styles.timeDigits}>{_secs}</Text>
              </View>
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  title="打卡"
                  style={{
                    ...styles.buttons,
                    // backgroundColor: registerForComingbtn
                    //   ? "#6aad2b66"
                    //   : "#BDD8A4",
                    backgroundColor: "#BDD8A4",
                  }}
                  onPress={() => showComingPunchAlert()}
                >
                  <Text style={styles.btnText}>上班</Text>
                </TouchableOpacity>
                {/* below is the disabled button, show this bg if disabled */}
                <TouchableOpacity
                  title="打卡"
                  style={{
                    ...styles.buttons,
                    // backgroundColor: registerForLeavingbtn
                    //   ? "#6aad2b66"
                    //   : "#BDD8A4",
                    backgroundColor: "#BDD8A4",
                  }}
                  onPress={() => showLeavingPunchAlert()}
                >
                  <Text style={styles.btnText}>下班</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.bottomCont}>
          <View style={styles.activityIconTextCont}>
            <View style={styles.iconWrapper}>
              <Image
                style={{
                  height: 21,
                  width: 21,
                }}
                source={require("../../../assets/activity.png")}
              />
            </View>
            <Text style={styles.actText}>功能</Text>
          </View>
          <ScrollView
            style={{
              marginBottom: tabBarHeight,
            }}
          >
            {/* {data.map((item, index) => ( */}
            <ActivityCard
              img={require("../../../assets/activity1.png")}
              heading={"請假單"}
              description={"Leave-taking application"}
              onPress={() => navigation.navigate("LeaveApplication")} // replace with your target screen name
            />
            {/* <ActivityCard
              img={require("../../../assets/activity2.png")}
              heading={"補打卡申請"}
              description={"Correct the time card"}
            /> */}
            <ActivityCard
              img={require("../../../assets/activity3.png")}
              heading={"加班單"}
              description={"Overtime application"}
              onPress={() => navigation.navigate("AddSickLeaveApplication")}
            />
            {/* ))} */}
          </ScrollView>
        </View>
      </SafeAreaView>
    </UpperGreenLayout>
  );
};

export default HomeScreenNew;

const styles = StyleSheet.create({
  bellIcon: {
    position: "absolute",
    right: 32,
  },
  nameText: {
    fontFamily: "bold",
    fontSize: 20,
    color: "white",
    marginBottom: 8,
  },
  dateText: {
    fontFamily: "medium",
    fontSize: 15,
    color: "#ffffff7d",
    marginBottom: 20,
  },
  timeContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 36,
    backgroundColor: "white",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  timeText: {
    fontFamily: "medium",
    fontSize: 15,
    color: "#D7D7D7",
    marginBottom: 4,
  },

  timeDivider: {
    marginHorizontal: 20,
    fontFamily: "bold",
    fontSize: 36,
  },
  timeDigits: {
    fontFamily: "bold",
    fontSize: 36,
  },
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 30,
    alignItems: "center",
  },
  timeCont: {
    flexDirection: "row",
    backgroundColor: "#acacac1a",
    paddingVertical: 7,
    borderRadius: 9,
    justifyContent: "center",
    marginBottom: 16,
  },
  buttons: {
    borderRadius: 9,
    backgroundColor: "red",
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    fontFamily: "bold",
    fontSize: 15,
    paddingVertical: 10,
    color: "white",
  },

  iconWrapper: {
    backgroundColor: "#00a65029",
    padding: 4,
    borderRadius: 7,
  },
  activityIconTextCont: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 20,
    marginLeft: 13,
  },
  actText: {
    fontFamily: "medium",
    fontSize: 15,
    color: "#343434",
  },
  upperContainerNew: {
    position: "relative",
    paddingHorizontal: 19,
  },
  nameDateCont: {
    paddingTop: 60,
    marginLeft: 13,
  },
  bottomCont: {
    paddingHorizontal: 19,
    paddingTop: 20,
    flex: 1,
  },
  contentContainer: {
    paddingVertical: 10,
  },
});

// not working for some reason, will fix later
const data = [
  {
    img: require("../../../assets/activity1.png"),
    heading: "請假單",
    description: "Leave-taking application",
  },
  {
    img: require("../../../assets/activity2.png"),
    heading: "補打卡申請",
    description: "Correct the time card",
  },
  {
    img: require("../../../assets/activity3.png"),
    heading: "加班單",
    description: "Overtime application",
  },
  {
    img: require("../../../assets/activity3.png"),
    heading: "加班單",
    description: "Overtime application",
  },
  {
    img: require("../../../assets/activity3.png"),
    heading: "加班單",
    description: "Overtime application",
  },
  {
    img: require("../../../assets/activity3.png"),
    heading: "加班單",
    description: "Overtime application",
  },
];
