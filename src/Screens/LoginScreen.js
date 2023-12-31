import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  useWindowDimensions,
} from "react-native";

// // for redux
import { useMappedState, useDispatch } from "redux-react-hook";
import { LoginInformation } from "../redux/action";

import { fetchData } from "../api/postUserData";

export default function LoginScreen(props) {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [loginText, setLoginText] = useState("");
  const [visible, setVisible] = useState(false);

  const nowBasicStyle = useMappedState((state) => state.basicStyle);
  // const userInformation = useMappedState(state => state.userInformation)
  const disPatch = useDispatch();

  const login = async () => {
    var feedback;
    try {
      // 帳號或密碼不得空白
      if (account != "" && password != "") {
        let fetchAPI = {
          doing: "LOGIN",
          account: account,
          password: password,
          loginCode: "",
        };
        // 插入loadging 動畫
        setVisible(true);
        // 找到userInformation
        await fetchData(fetchAPI)
          .then((response) => {
            if (response.state == "success") {
              console.log("login btn response", response);
              disPatch(LoginInformation(response));
              console.log("登入");

              props.navigation.push("IndexScreen");//進入index screen
            } else {
              feedback = "帳號或密碼輸入錯誤";
            }
            // 取消loadging 動畫
            setVisible(false);
          })
          .catch((err) => {
            console.log("login error", err);
          });
      } else {
        feedback = "請輸入帳號或密碼";
      }
      setLoginText(feedback);
    } catch (err) {
      console.log(err);
    }
  };
  const { width } = useWindowDimensions();
  console.log(width);
  return (
    <View
      style={[
        { backgroundColor: nowBasicStyle.backgroundColor },
        styles.container,
      ]}
    >
      <View
        style={[
          styles.Home_Logo,
          {
            backgroundColor: nowBasicStyle.backgroundColor,
            borderWidth: 1,
            alignItems: "center",
            justifyContent: "center",
          },
        ]}
      >
        <Text
          style={{
            color: nowBasicStyle.fontColor,
            fontSize: 24,
            fontWeight: 700,
          }}
        >
          ZombieClub 打卡系統 ❤️
        </Text>
      </View>
      <Image
        style={{ width: 120, height: 120 }}
        source={{
          uri: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWQ5czUzd2p1YjRvMzRwaWVheTZpMWswd215ZGx5YXpiN20zODJtdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/hKAfPUuIvIu8rILnrs/giphy.gif",
        }}
      ></Image>
      <Text style={[styles.loginText, { color: "red" }]}>{loginText}</Text>
      <TextInput
        style={styles.Home_Account_Input}
        placeholder="帳號"
        placeholderTextColor="#fff"
        keyboardType={"numeric"}
        onChangeText={(text) => setAccount(text)}
        value={account}
        maxLength={4}
      ></TextInput>
      <TextInput
        style={styles.Home_Account_Input}
        placeholder="密碼"
        placeholderTextColor="#fff"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
      ></TextInput>
      <TouchableOpacity style={styles.Home_singIn} onPress={() => login()}>
        <Text style={{ fontSize: 15, color: "#fff" }}>登入</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          // setVisible(!visible);
        }}
      >
        <View
          style={{
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={{
              height: 100,
              width: 100,
              backgroundColor: "rgba(152, 152, 152, 0.8)",
              borderRadius: 15,
            }}
            source={require("../../img/loading.gif")}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  Home_Logo: {
    width: "80%",
    height: "15%",
    borderColor: "black",
    resizeMode: "contain",
    marginBottom: "15%",
    marginTop: "30%",
  },
  Home_Account_Input: {
    marginBottom: 5,
    backgroundColor: "#E4E5f0",
    width: "70%",
    height: "8%",
    alignItems: "center",
    borderRadius: 5,
    fontSize: 15,
    paddingLeft: 10,
  },
  Home_singIn: {
    width: "70%",
    height: "8%",
    backgroundColor: "#5882E0",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: "5%",
  },
  loginText: {
    padding: 10,
  },
});