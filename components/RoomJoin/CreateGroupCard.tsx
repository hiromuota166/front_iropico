import { Button } from "@/components/Button/Button";
import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  onCreate: () => void;
  disabled: boolean;
};

export default function CreateGroupCard({ onCreate, disabled = false }: Props) {
  return (
    <View style={styles.body}>
      <View style={styles.textBox}>
        <Text style={styles.plus}>＋</Text>
        <Text style={styles.title}>新しいグループを作成</Text>
        <Text style={styles.desc}>あなたがホストとなってゲームを開始できます</Text>
      </View>

      <Button onPress={onCreate} disabled={disabled} text="＋   グループを作成" />
    </View>
  );
}

const styles = StyleSheet.create({
  body: { gap: 12, padding: 12 },

  textBox: {
    backgroundColor: Colors.orderCardBackground,
    borderRadius: 8,
    paddingVertical: 20,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  plus: {
    fontSize: 50,
    fontWeight: "700",
    color: Colors.plusButton,
    paddingHorizontal: 12,
  },

  title: {
    fontSize: 20,
    fontWeight: "500",
    color: Colors.textTitle,
    textAlign: "center",
  },
  desc: {
    fontSize: 16,
    fontWeight: "400",
    color: Colors.textContent,
    textAlign: "center",
    marginTop: 4,
  },
});
