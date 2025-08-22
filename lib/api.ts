import { Alert } from "react-native";

const API_BASE_URL = process.env.EXPO_PUBLIC_DB_URL || "http://localhost:3000";

export async function createRoom(hostUserId: number) {
  try {
    const response = await fetch(`${API_BASE_URL}/rooms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ host_user_id: hostUserId }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to create room:", error);
    Alert.alert("Error", "ルーム作成に失敗しました。");
    return null;
  }
}
