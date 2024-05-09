import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState, useEffect,useCallback } from "react";
import UpperGreenLayout from "../components/UpperGreenLayout";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import CheckInRecordCard from "../components/CheckInRecordCard";
import { fetchData } from "../api/postUserData";
import { useMappedState } from "redux-react-hook";
import Spinner from "react-native-loading-spinner-overlay";
import { useFocusEffect } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const CheckInRecords = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [loadingVisible, setLoadingVisible] = useState(false);
  const [record, setRecord] = useState([]);
  const tabBarHeight = useBottomTabBarHeight();
  const [isLoading, setIsLoading] = useState(true);

  const userInformation = useMappedState((state) => state.userInformation);

  // useEffect(() => {
  //   actionRecord("SELECT", userInformation.user.account);
  //   toggleLoading();
  // }, []);

  useFocusEffect(
    useCallback(() => {
      // Code to run when the screen is focused
      actionRecord("SELECT", userInformation.user.account);
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

  const actionRecord = (...factors) => {
    switch (factors[0]) {
      case "SELECT":
        var fetchJson = {
          doing: "SELECT",
          action: "DEFULT",
          account: factors[1],
          interval: ["", ""],
        };
        break;
      case "REVISE":
        let account = userInformation.user.account;
        let sn = factors[1][0];
        var fetchJson = {
          doing: "REVISE",
          record: [sn, account],
        };
        break;
      case "補":
        // 待設計
        break;
    }
    // call api
    fetchData(fetchJson)
      .then((response) => {
        console.log("1204 checkin sick response", response.punchInRecord);
        if (factors[0] == "SELECT") {
          console.log(
            "1204 checkin response.punchInRecord.reverse()",
            response.punchInRecord.reverse()
          );
          setRecord(response.punchInRecord.reverse());
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

  // const parsedData = record.reduce((acc, [id, , , fourth, fifth]) => {
  //   acc[id] = { fourth, fifth };
  //   return acc;
  // }, {});

  return (
    <UpperGreenLayout>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.pageWrapper}>
          <View style={styles.upperBar}>
            <Text style={styles.upperBarText}>打卡紀錄</Text>
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
              {record.map(([id, , , fourth, fifth]) => (
                <CheckInRecordCard key={id} fourth={fourth} fifth={fifth} />
              ))}
              {/* <CheckInRecordCard />
              <CheckInRecordCard />
              <CheckInRecordCard />
              <CheckInRecordCard />
              <CheckInRecordCard />
              <CheckInRecordCard /> */}
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

export default CheckInRecords;

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

// import { StatusBar } from "expo-status-bar";
// import React, { useState, useEffect } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   Button,
//   FlatList,
//   TouchableHighlight,
//   Alert,
//   Modal,
//   TextInput,
//   Image,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// // import { Overlay } from 'react-native-elements';

// import { useMappedState } from "redux-react-hook";

// // for API
// import { fetchData } from "../api/postUserData";
// import { strToDate } from "../api/strToDate";

// export default function HomeScreen(props) {
//   /**
//    * 0 sn
//    * 1 員工編號
//    * 2 登錄碼
//    * 3 time(上班)
//    * 4 time(下班)
//    */
//   const nowBasicStyle = useMappedState((state) => state.basicStyle);
//   const userInformation = useMappedState((state) => state.userInformation);
//   const [changeVisible, setChangeVisible] = useState(false);
//   const [loadingVisible, setLoadingVisible] = useState(false);
//   const [inputSignIn, setInputSignIn] = useState();

//   const [changeSignInConut, setChangeSignInConut] = useState([
//     "",
//     strToDate("date", new Date()),
//     0,
//   ]);
//   const [record, setRecord] = useState("");

//   useEffect(() => {
//     toggleLoading();
//     actionRecord("SELECT", userInformation.user.account);
//   }, []);

//   const actionRecord = (...factors) => {
//     switch (factors[0]) {
//       case "SELECT":
//         var fetchJson = {
//           doing: "SELECT",
//           action: "DEFULT",
//           account: factors[1],
//           interval: ["", ""],
//         };
//         break;
//       case "REVISE":
//         let account = userInformation.user.account;
//         let sn = factors[1][0];
//         var fetchJson = {
//           doing: "REVISE",
//           record: [sn, account],
//         };
//         break;
//       case "補":
//         // 待設計
//         break;
//     }
//     // call api
//     fetchData(fetchJson)
//       .then((response) => {
//         if (factors[0] == "SELECT") {
//           setRecord(response.punchInRecord.reverse());
//         } else if (factors[0] == "REVISE") {
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const changeSignIn = (cases) => {
//     console.log("test cases", cases);
//     let changeDate = strToDate("date", cases[3] ? cases[3] : cases[4]);
//     let sn = cases[0];
//     if (changeDate == changeSignInConut[1]) {
//       setChangeSignInConut([sn, changeDate, changeSignInConut[2] + 1]);
//       // 連續點擊五次進入
//       if (changeSignInConut[2] + 1 == 5) {
//         // Count 歸零
//         setChangeSignInConut([sn, changeDate, 0]);
//         Alert.alert(
//           "您正在執行  上/下班簽到交換",
//           "注意當日只能執行一次，超過請至系統申請",
//           [
//             {
//               text: "Cancel",
//               onPress: () => console.log("Cancel Pressed"),
//               style: "cancel",
//             },
//             {
//               text: "OK",
//               onPress: () => {
//                 if (cases[5] == 1) {
//                   Alert.alert(`${changeDate} 已申請過交換`);
//                 } else {
//                   // 顯示inputDate
//                   setChangeVisible(!changeVisible);
//                 }
//               },
//             },
//           ]
//         );
//       }
//     } else {
//       setChangeSignInConut([sn, changeDate, 0]);
//     }
//   };

//   // // 送出交換
//   const changeRecord = () => {
//     let changeDate = changeSignInConut[1].replace(/\//g, "");
//     if (inputSignIn == changeDate) {
//       // 關閉inputDate
//       setChangeVisible(!changeVisible);
//       // 開啟lonading
//       toggleLoading();
//       actionRecord("REVISE", changeSignInConut);
//       // 重新載入打卡紀錄
//       setTimeout(function () {
//         actionRecord("SELECT", userInformation.user.account);
//       }, 1000);
//       // 清除input
//       setInputSignIn("");
//     } else {
//       Alert.alert("輸入錯誤，請確認日期");
//     }
//   };
//   const toggleLoading = () => {
//     setLoadingVisible(!loadingVisible);
//     setTimeout(function () {
//       setLoadingVisible(false);
//     }, 2500);
//   };

//   const isErrorRecord = (_on, _off) => {
//     var color = "";
//     if (_on != "" && _off != "") {
//       color = _on >= _off ? "red" : "#ABABAB";
//     } else {
//       color = "red";
//     }
//     return color;
//   };

//   const rederPunchIn = (cases) => {
//     console.log("cases",cases)
//     return (
//       <TouchableHighlight
//         underlayColor={"#ABABAB"}
//         onPress={() => changeSignIn(cases)}
//         style={{ height: 100, alignItems: "center", justifyContent: "center" }}
//       >
//         <View
//           style={{
//             height: 90,
//             borderWidth: 2,
//             borderRadius: 10,
//             borderColor: isErrorRecord(cases[3], cases[4]),
//             flexDirection: "row",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <View
//             style={[
//               { width: "30%", justifyContent: "center", alignItems: "center" },
//             ]}
//           >
//             <Text
//               style={{
//                 fontSize: 20,
//                 margin: 5,
//                 color: nowBasicStyle.fontColor,
//               }}
//             >
//               {strToDate("date", cases[3] ? cases[3] : cases[4])}
//             </Text>
//             <Text style={{ fontSize: 20, color: nowBasicStyle.fontColor }}>
//               {strToDate("day", cases[3] ? cases[3] : cases[4])}
//             </Text>
//           </View>
//           <View style={[{ width: "30%", alignItems: "center" }]}>
//             <Text style={{ margin: 10, fontSize: 22, color: "#3781BF" }}>
//               簽到
//             </Text>
//             <Text style={{ fontSize: 22, color: nowBasicStyle.fontColor }}>
//               {strToDate("time", cases[3])}
//             </Text>
//           </View>
//           <View style={[{ width: "30%", alignItems: "center" }]}>
//             <Text
//               style={{
//                 margin: 10,
//                 fontSize: 22,
//                 color: nowBasicStyle.fontColor,
//               }}
//             >
//               簽退
//             </Text>
//             <Text style={{ fontSize: 22, color: nowBasicStyle.fontColor }}>
//               {strToDate("time", cases[4])}
//             </Text>
//           </View>
//         </View>
//       </TouchableHighlight>
//     );
//   };

//   return (
//     <View
//       style={[
//         styles.container,
//         { backgroundColor: nowBasicStyle.backgroundColor },
//       ]}
//     >
//       <Text style={{ color: nowBasicStyle.fontColor }}>最近30次打卡</Text>
//       {/* loading畫面 */}
//       <Modal animationType="slide" transparent={true} visible={loadingVisible}>
//         {/* <View style={{ height: '80%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
//           <Image style={{ height: 100, width: 100, backgroundColor: 'rgba(152, 152, 152, 0.8)', borderRadius: 15 }} source={require('../../../img/loading.gif')} />
//         </View> */}
//       </Modal>

//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={changeVisible}
//         onRequestClose={() => {
//           Alert.alert("Modal has been closed.");
//           setChangeVisible(!changeVisible);
//         }}
//       >
//         <View
//           style={{
//             alignItems: "center",
//             justifyContent: "center",
//             width: "100%",
//             height: "100%",
//             backgroundColor: "rgba(52, 52, 52, 0.8)",
//           }}
//         >
//           <View
//             style={{
//               width: 300,
//               justifyContent: "center",
//               alignItems: "center",
//               backgroundColor: "#fff",
//               borderRadius: 10,
//               borderWidth: 1,
//             }}
//           >
//             <TouchableHighlight
//               style={{ alignSelf: "flex-end", margin: 5 }}
//               onPress={() => setChangeVisible(!changeVisible)}
//             >
//               <Ionicons name={"close"} size={35} color={"red"} />
//             </TouchableHighlight>
//             <Text style={{ height: 40, fontSize: 20 }}>
//               請輸入交換上下班簽到日期
//             </Text>
//             <Text style={{ fontSize: 15, color: "#909090" }}>
//               範例:20211020
//             </Text>
//             <TextInput
//               style={styles.Home_Account_Input}
//               placeholder="帳號"
//               keyboardType={"numeric"}
//               onChangeText={(text) => setInputSignIn(text)}
//               value={inputSignIn}
//               maxLength={8}
//             ></TextInput>
//             <View style={{ flexDirection: "row", marginTop: 10 }}>
//               <TouchableHighlight
//                 style={[styles.signIn_Button, { borderRightWidth: 1 }]}
//                 onPress={() => setChangeVisible(!changeVisible)}
//               >
//                 <Text style={{ fontSize: 20, color: "#4787BF" }}>取消</Text>
//               </TouchableHighlight>
//               <TouchableHighlight
//                 style={[styles.signIn_Button, { borderLeftWidth: 1 }]}
//                 onPress={() => changeRecord()}
//               >
//                 <Text style={{ fontSize: 20, color: "#4787BF" }}>送出</Text>
//               </TouchableHighlight>
//             </View>
//           </View>
//         </View>
//       </Modal>

//       <FlatList
//         data={record}
//         renderItem={(cases) => rederPunchIn(cases.item)}
//         keyExtractor={(cases) => String(cases[0])}
//         style={{ width: "95%" }}
//       />
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // backgroundColor: '#fff',
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   _border: {
//     borderWidth: 1,
//   },
//   modalView: {
//     margin: 20,
//     backgroundColor: "white",
//     borderRadius: 20,
//     padding: 35,
//     alignItems: "center",
//     height: 200,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   openButton: {
//     backgroundColor: "#F194FF",
//     borderRadius: 20,
//     padding: 10,
//     elevation: 2,
//   },
//   textStyle: {
//     color: "white",
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   modalText: {
//     marginBottom: 15,
//     textAlign: "center",
//   },
//   Home_Account_Input: {
//     marginBottom: 5,
//     backgroundColor: "#E4E5f0",
//     width: "90%",
//     height: 40,
//     alignItems: "center",
//     borderRadius: 5,
//     fontSize: 15,
//     paddingLeft: 10,
//   },
//   signIn_Button: {
//     flex: 1,
//     height: 50,
//     justifyContent: "center",
//     alignItems: "center",
//     borderTopWidth: 2,
//     borderColor: "#B4B4B4",
//   },
// });
