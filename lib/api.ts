import { Alert } from "react-native";
// バックエンドでは uid を uuid と名前付けしていることに注意
// uuid は string 型で UUID 型でもない

const API_BASE_URL =
  process.env.EXPO_PUBLIC_DB_URL || "http://172.16.1.117:3000";

export async function createUser(name: string, uid: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, uid }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to create user:", error);
    Alert.alert("Error", "ユーザー作成に失敗しました。");
    return null;
  }
}

export async function createRoom(uid: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/rooms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uuid: uid }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = (await response.json()) as { code: string; room_id: string };
    return data;
  } catch (error) {
    console.error("Failed to create room:", error);
    Alert.alert("Error", "ルーム作成に失敗しました。");
    return null;
  }
}

export async function joinRoom(roomCode: string, uid: string) {
  console.log("Joining room:", roomCode, "with user ID:", uid);
  try {
    const response = await fetch(`${API_BASE_URL}/rooms/${roomCode}/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid: uid }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (response.status === 204) {
      console.log("Joined room successfully with 204 No Content.");
      return {};
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to join room:", error);
    Alert.alert("Error", "グループ参加に失敗しました。");
    return null;
  }
}

export async function startRoom(roomCode: string) {
  console.log(`${API_BASE_URL}/rooms/${roomCode}/start`);
  try {
    const response = await fetch(`${API_BASE_URL}/rooms/${roomCode}/start`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to start room:", error);
    Alert.alert("Error", "ゲーム開始に失敗しました。");
    return null;
  }
}

export async function nextRound(roomCode: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/rooms/${roomCode}/next`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to start room:", error);
    Alert.alert("Error", "ゲーム開始に失敗しました。");
    return null;
  }
}

export async function fetchRoomRanking(roomCode: string, round: number) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/rooms/${roomCode}/ranking?round=${round}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch room ranking:", error);
    Alert.alert("Error", "ランキングの取得に失敗しました。");
    return null;
  }
}

export async function endRoom(roomCode: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/rooms/${roomCode}/end`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to end room:", error);
    Alert.alert("Error", "ルーム終了に失敗しました。");
    return null;
  }
}
