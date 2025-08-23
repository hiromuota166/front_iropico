import React from "react";
import { View, StyleSheet } from "react-native";
import ColorPaletteIcon from "@/components/Icon/ColorPaletteIcon"; // ← あなたの定義したアイコン

export default function IconOnlyScreen() {
  return (
    <View style={styles.container}>
      <ColorPaletteIcon />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // 縦中央
    alignItems: "center",     // 横中央
    backgroundColor: "#ffffff", // 背景色は好きな色に
  },
});
