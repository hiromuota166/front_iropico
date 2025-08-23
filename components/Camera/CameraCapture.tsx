import React from 'react';
import { StyleSheet, Text, View, Button as RNButton } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useTakePhoto } from '@/hooks/useTakePhoto';

export type CameraCaptureResult = { previewUri: string; base64: string } | null;

export type CameraCaptureHandle = {
  shoot: () => Promise<CameraCaptureResult>;
};

export const CameraCapture = React.forwardRef<CameraCaptureHandle, {}>((_, ref) => {
  const [permission, requestPermission] = useCameraPermissions();
  const { camRef, takeAndPrepare } = useTakePhoto();

  const shoot = React.useCallback(async (): Promise<CameraCaptureResult> => {
    const prepared = await takeAndPrepare();
    if (!prepared) return null;
    return { previewUri: prepared.previewUri, base64: prepared.base64 };
  }, [takeAndPrepare]);

  React.useImperativeHandle(ref, () => ({ shoot }), [shoot]);

  if (!permission) return <View style={styles.center} />;

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.msg}>We need your permission to show the camera</Text>
        <RNButton onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return <CameraView style={styles.camera} ref={camRef} />;
});

CameraCapture.displayName = 'CameraCapture';

const styles = StyleSheet.create({
  camera: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  msg: { textAlign: 'center', paddingBottom: 10 },
});
