import { Stack } from 'expo-router';

export default function HomeStack() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="room_select" />
      <Stack.Screen name="room/[room_id]" />
      <Stack.Screen name="room/[room_id]/result" />
    </Stack>
  );
}
