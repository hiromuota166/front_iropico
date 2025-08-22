import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import { Colors } from "@/constants/Colors";

type TabKey = "create" | "join";
type Option = { key: TabKey; label: string };

type Props = {
  value: TabKey;
  onChange: (next: TabKey) => void;
  options?: Option[];
  style?: ViewStyle;
};

const DEFAULT_OPTIONS: Option[] = [
  { key: "create", label: "新規作成" },
  { key: "join", label: "参加" },
];

export default function SegmentedTabs({ value, onChange, options = DEFAULT_OPTIONS, style }: Props) {
  return (
    <View style={[styles.segment, style]}>
      {options.map((opt) => {
        const active = value === opt.key;
        return (
          <TouchableOpacity
            key={opt.key}
            style={[styles.segmentBtn, active && styles.segmentBtnActive]}
            onPress={() => onChange(opt.key)}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
          >
            <Text style={[styles.segmentText, active && styles.segmentTextActive]}>
              {opt.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  segment: {
    flexDirection: "row",
    backgroundColor: Colors.orderCardBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 4,
    marginBottom: 12,
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: "center",
  },
  segmentBtnActive: {
    backgroundColor: Colors.border,
    elevation: 2,
  },
  segmentText: { color: Colors.inputPlaceholder, fontWeight: "600" },
  segmentTextActive: { color: Colors.textTitle },
});
