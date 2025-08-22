import { Colors } from '@/constants/Colors';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BackgroundBlue from '../BackgroundBlue';

type ExplainCardProps = {
  title: string;
  text: string[];
};

export default function ExplainCard({ title, text }: ExplainCardProps) {
  return (
    <BackgroundBlue style={styles.background}>
      <Text style={styles.explainTitle}>{title}</Text>
      <View style={styles.container}>
        {text.map((item) => (
          <Text key={item} style={styles.explainText}>・{item}</Text>
        ))}
      </View>
    </BackgroundBlue>
  );
}

const styles = StyleSheet.create({
  explainTitle: {
    fontSize: 16,
    color: Colors.textTitle,
  },
  explainText: {
    fontSize: 14,
    color: Colors.textContent,
  },
  background: {
    width: '100%',
    gap: 10,
  },
  container: {
    gap: 4,
  },
});