import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const PRIMARY = "#5ED3C6";

type NavKey = "form" | "history" | "guide" | "logout";

type Props = {
  active?: NavKey;
};

export default function NavBarPatient({ active }: Props) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const go = (key: NavKey) => {
    switch (key) {
      case "form":
        navigation.navigate("PatientForm");
        break;
      case "history":
        navigation.navigate("PatientHistory");
        break;
      case "guide":
        navigation.navigate("EmotionGuide");
        break;
      case "logout":
        navigation.reset({ index: 0, routes: [{ name: "Login" }] });
        break;
    }
  };

  const tint = (key: NavKey) => (active === key ? PRIMARY : "#8A8F93");

  return (
    <View style={styles.wrapper} pointerEvents="box-none">
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.item}
          onPress={() => go("form")}
          activeOpacity={0.8}
          hitSlop={{ top: 8, bottom: 8, left: 12, right: 12 }}
        >
          <AntDesign name="form" size={24} color={tint("form")} />
          <Text style={[styles.label, { color: tint("form") }]}>Form</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.item}
          onPress={() => go("history")}
          activeOpacity={0.8}
          hitSlop={{ top: 8, bottom: 8, left: 12, right: 12 }}
        >
          <MaterialCommunityIcons
            name="view-dashboard-edit-outline"
            size={24}
            color={tint("history")}
          />
          <Text style={[styles.label, { color: tint("history") }]}>
            Histórico
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.item}
          onPress={() => go("guide")}
          activeOpacity={0.8}
          hitSlop={{ top: 8, bottom: 8, left: 12, right: 12 }}
        >
          <MaterialCommunityIcons
            name="cards-outline"
            size={24}
            color={tint("guide")}
          />
          <Text style={[styles.label, { color: tint("guide") }]}>Guia</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.item}
          onPress={() => go("logout")}
          activeOpacity={0.8}
          hitSlop={{ top: 8, bottom: 8, left: 12, right: 12 }}
        >
          <MaterialIcons name="logout" size={24} color={tint("logout")} />
          <Text style={[styles.label, { color: tint("logout") }]}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  container: {
    marginHorizontal: 12,
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    borderWidth: 1,
    borderColor: "#E7EFF1",
    // sombra leve
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 10,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  item: {
    flex: 1,
    alignItems: "center",
    gap: 2,
  },
  label: {
    fontSize: 11,
    fontWeight: "700",
  },
});
