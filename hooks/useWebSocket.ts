import { useCallback, useEffect, useRef, useState } from "react";

const WS_BASE_URL = process.env.EXPO_PUBLIC_WS_URL || "ws://172.16.5.7:3000";

export const useWebSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const ws = useRef<WebSocket | null>(null);

  const connect = useCallback((endpoint: string) => {
    if (ws.current) {
      ws.current.close();
    }

    const newWs = new WebSocket(`${WS_BASE_URL}${endpoint}`);

    newWs.onopen = () => {
      console.log("WebSocket connected");
      setIsConnected(true);
    };

    newWs.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    newWs.onclose = () => {
      console.log("WebSocket disconnected");
      setIsConnected(false);
    };

    newWs.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.current = newWs;
  }, []);

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

  return { isConnected, messages, connect, disconnect };
};
