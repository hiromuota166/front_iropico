import { Button } from "@/components/Button/Button";
import { Colors } from "@/constants/Colors";
import React from "react";
import { Keyboard, Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

type Props = {
  code: string;
  onChangeCode: (text: string) => void;
  onJoin: () => void;
};

export default function JoinGroupCard({ code, onChangeCode, onJoin }: Props) {
  const handleBackgroundPress = () => {
    if (Platform.OS === "web") {
      return;
    }
    Keyboard.dismiss();
  };
  return (
    <Pressable onPress={handleBackgroundPress}>
      <View style={styles.body}>
        <View style={styles.textBox}>
          <Text style={styles.sharp}>＃</Text>
          <Text style={styles.title}>グループに参加</Text>
          <Text style={styles.desc}>友達から受け取ったコードを入力してください</Text>
        </View>

        <TextInput
          value={code}
          onChangeText={onChangeCode}
          placeholder="グループコードを入力…"
          placeholderTextColor={Colors.inputPlaceholder}
          style={styles.input}
        />
        <Button onPress={onJoin} text="参加する" disabled={!code.trim()} />
      </View>
    </Pressable>
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
    gap: 4,
  },

  sharp: {
    fontSize: 50,
    fontWeight: "700",
    color: Colors.plusButton ?? Colors.textContent,
  },

  title: {
    fontSize: 20,
    fontWeight: "500",
    color: Colors.textTitle,
    textAlign: "center",
  },

  desc: {
    fontSize: 15,
    fontWeight: "400",
    color: Colors.textContent,
    textAlign: "center",
    marginTop: 2,
  },

  input: {
    backgroundColor: Colors.inputBackground,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: Colors.textBlack,
    textAlign: "center",
  },
});
