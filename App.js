import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Switch, Button, Image } from "react-native";

import activities from "./assets/activities.json";

import * as serviceWorkerRegistration from "./src/serviceWorkerRegistration";

const colour_pink = "#f768ff";
const colour_seafoam_green = "#59ff6f";
const colour_green = "#00c91a";

const App = () => {
  const [isEnabled_allowOvernight, setIsEnabled_allowOvernight] =
    useState(false);
  const toggleSwitch_allowOvernight = () =>
    setIsEnabled_allowOvernight((previousState) => !previousState);
  const [isEnabled_allowPlanned, setIsEnabled_allowPlanned] = useState(false);
  const toggleSwitch_allowPlanned = () =>
    setIsEnabled_allowPlanned((previousState) => !previousState);

  const [dice_img, setDice_img] = React.useState(require("./assets/dice.png"));

  const [myText, setMyText] = React.useState(
    "Roll Dice and find out what we will do today 💕"
  );

  const [path, setPath] = React.useState(["items"]);

  const buildpath = (depth) => {
    var tmp = activities;
    for (let i = 0; i < path.length - depth; i++) {
      tmp = tmp[path[i]];
    }
    return tmp;
  };

  const get_random = (goDeeper, allow_overnight, allow_planned) => {
    roll_animation();
    var elements = buildpath(goDeeper ? 0 : 2);
    var elems = [];
    if (elements) {
      elements.forEach((element) => {
        if (
          (allow_overnight || element["overnight"] != "true") &&
          (allow_planned || element["planning"] != "true")
        ) {
          elems.push(element);
        }
      });
      let num = Math.floor(Math.random() * elems.length);
      if (!goDeeper) {
        const copyArr = [...path];
        copyArr.pop();
        copyArr.pop();
        copyArr.push(num);
        copyArr.push("items");
        setPath(copyArr);
      } else {
        setPath([...path, num, "items"]);
      }
      return elems[num];
    }
  };

  const roll_animation = () => {
    setDice_img(require("./assets/dice.gif"));
    setTimeout(() => {
      setDice_img(require("./assets/dice.png"));
    }, 1000);
  };

  const roll = () => {
    var item = get_random(
      true,
      isEnabled_allowOvernight,
      isEnabled_allowPlanned
    );
    setTimeout(() => {
      if (item) {
        setMyText(item["title"]);
      } else {
        setMyText("No more ideas below here ☹️");
      }
    }, 1000);
  };

  const try_again = () => {
    let deeper = false;
    if (path.length <= 1) {
      deeper = true;
    }
    var item = get_random(
      deeper,
      isEnabled_allowOvernight,
      isEnabled_allowPlanned
    );
    setTimeout(() => {
      if (item) {
        setMyText(item["title"]);
      } else {
        setMyText("No more ideas below here ☹️");
      }
    }, 1000);
  };

  const restart = () => {
    setMyText("Roll Dice and find out what we will do today 💕");
    setPath(["items"]);
  };

  return (
    <View style={styles.container}>
      <View className="App">
        <Text
          style={{
            color: colour_pink,
            fontSize: 25,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Seek & Spread{"\n"}Love & Joy
        </Text>
        <Text>
          {"\n"}
          {"\n"}
          {"\n"}
        </Text>
        <Text
          style={{
            color: colour_pink,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          I love you CC ❤️
        </Text>
        <Text>
          {"\n"}
          {"\n"}
        </Text>

        <View
          className="switch"
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            height: 30,
          }}
        >
          <Text
            style={{
              textAlignVertical: "center",
            }}
          >
            Allow Overnight Activities 🌙
          </Text>
          <Switch
            trackColor={{ false: "#767577", true: colour_seafoam_green }}
            thumbColor={isEnabled_allowOvernight ? colour_green : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch_allowOvernight}
            value={isEnabled_allowOvernight}
          />
        </View>
        <View
          className="switch"
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            height: 30,
          }}
        >
          <Text
            style={{
              textAlignVertical: "center",
            }}
          >
            Include Planned Activities 📅
          </Text>
          <Switch
            trackColor={{ false: "#767577", true: colour_seafoam_green }}
            thumbColor={isEnabled_allowPlanned ? colour_green : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch_allowPlanned}
            value={isEnabled_allowPlanned}
          />
        </View>
        <Text>{"\n"}</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Button
            color={colour_pink}
            title="Roll Dice 🎲"
            onPress={() => roll()}
          />
          <Button
            color={colour_pink}
            title="Try Again 🤷‍♀️"
            onPress={() => try_again()}
          />
        </View>
        <Text>{"\n"}</Text>
        <View
          style={{
            width: 300,
            textAlign: "center",
          }}
        >
          <Image
            style={{ width: 50, height: 50, alignSelf: "center" }}
            source={dice_img}
          />
          <Text
            style={{
              fontSize: 14,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {myText}
          </Text>
        </View>
        <Text>{"\n"}</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Button
            color={colour_pink}
            title="Restart 🔄"
            onPress={() => restart()}
          />
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;

serviceWorkerRegistration.register();
