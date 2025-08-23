import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

type Props = {
  onPress: () => void;
};

export default function ShutterButton({ onPress }: Props) {
  return (
    <TouchableOpacity style={styles.shutter} onPress={onPress}>
      <Feather name="camera" size={28} color="#008cff" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  shutter: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: "#fff",
    borderWidth: 4,
    borderColor: "#333",
    alignItems: "center",
    justifyContent: "center",
  },
});
