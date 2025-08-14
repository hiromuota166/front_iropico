import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

type Props = {
  uri: string;
  children?: React.ReactNode;
};

export const ImagePreview: React.FC<Props> = ({ uri, children }) => {
  return (
    <View style={styles.wrap}>
      <Image source={{ uri }} style={styles.photo} />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: { flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' },
  photo: { width: '90%', height: '70%', resizeMode: 'contain', marginBottom: 20 },
});
