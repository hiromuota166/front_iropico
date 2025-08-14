import { Feather } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import { useTakePhoto } from '../../hooks/useTakePhoto';
import { Card } from '../Card/Card';

type Props = {
  onCaptured: (args: { previewUri: string; base64: string }) => void;
};

export const CameraCapture: React.FC<Props> = ({ onCaptured }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const { camRef, takeAndPrepare } = useTakePhoto();

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.msg}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  async function handleShoot() {
    const prepared = await takeAndPrepare();
    if (prepared) {
      onCaptured({ previewUri: prepared.previewUri, base64: prepared.base64 });
    }
  }

  return (
    <CameraView style={styles.camera} ref={camRef}>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.captureBtn} onPress={handleShoot}>
          <Card>
            <Feather name="camera" size={24} color="#008cff" />
          </Card>
        </TouchableOpacity>
      </View>
    </CameraView>
  );
};

const styles = StyleSheet.create({
  camera: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  msg: { textAlign: 'center', paddingBottom: 10 },
  buttonRow: { flex: 1, flexDirection: 'row', margin: 64, backgroundColor: 'transparent' },
  captureBtn: { flex: 1, alignSelf: 'flex-end', alignItems: 'center' },
});
