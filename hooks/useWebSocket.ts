import { useColorStore, useRankingStore } from "@/store/useStore";
import { useCallback, useEffect, useRef, useState } from "react";

const WS_BASE_URL = process.env.EXPO_PUBLIC_WS_URL || "ws://172.16.1.117:3000";

// 新しい型定義を追加
export type WebSocketMessage = {
  type?: string;
  ok?: boolean;
  round?: number;
  color?: { h: number; s: number; v: number };
  ranking?: { userId: number; name: string; score: number }[];
};

// onMessageCallbackは引数としてWebSocketMessageを受け取ります
export const useWebSocket = (
  onMessageCallback?: (message: WebSocketMessage) => void
) => {
  const setRanking = useRankingStore((state) => state.setRanking);
  const setColor = useColorStore((state) => state.setColor);
  const [isConnected, setIsConnected] = useState(false);
  const [goGame, setGoGame] = useState(false);
  const ws = useRef<WebSocket | null>(null);

  const connect = useCallback(
    (endpoint: string) => {
      if (ws.current) {
        ws.current.close();
      }

      const newWs = new WebSocket(`${WS_BASE_URL}${endpoint}`);

      newWs.onopen = () => {
        console.log("WebSocket connected");
        setIsConnected(true);
      };

      newWs.onmessage = (event) => {
        console.log("event.data:", event.data);
        // if (event.data.type === "start") {
        //   // ゲーム開始の処理
        // } else if (event.data.type === "game_ended") {
        //   // ゲーム終了の処理
        // } else if (event.data.type === "next") {
        //   // メッセージ受信の処理
        // } else if (event.data.type === "submit") {
        //   // メッセージ送信の処理
        // }
        try {
          const data: WebSocketMessage = JSON.parse(event.data);

          if (data.type === "start") {
            if (data.color) {
              setColor(data.color);
            }
            setGoGame(true);
          } else if (data.type === "game_ended") {
          } else if (data.type === "next") {
          } else if (data.type === "submit") {
            if (data.ranking) {
              setRanking(data.ranking);
            }
          }
        } catch (err) {
          console.error("Invalid WS message:", err);
        }
      };

      newWs.onclose = () => {
        console.log("WebSocket disconnected");
        setIsConnected(false);
      };

      newWs.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      ws.current = newWs;
    },
    [onMessageCallback] // コールバック関数を依存配列に追加
  );

  const disconnect = useCallback(() => {
    if (ws.current) {
      ws.current.close();
      ws.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return { isConnected, goGame, connect, disconnect };
};
function setColor(color: { h: number; s: number; v: number }) {
  throw new Error("Function not implemented.");
}
