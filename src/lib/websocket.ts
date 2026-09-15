"use client";

import { Client } from "@stomp/stompjs";

export function createGpsWebSocketClient(onLocationReceived: (data: any) => void) {
  const wsUrl = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8080/ws-bus/websocket";
  const client = new Client({
    brokerURL: wsUrl,
    connectHeaders: {},
    debug: function (str) {
      // console.log("STOMP Debug:", str);
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
  });

  client.onConnect = (frame) => {
    // Subscribe to real-time bus locations topic
    client.subscribe("/topic/bus-locations", (message) => {
      try {
        const payload = JSON.parse(message.body);
        onLocationReceived(payload);
      } catch (e) {
        console.error("Error parsing WebSocket GPS payload:", e);
      }
    });
  };

  client.onStompError = (frame) => {
    console.warn("STOMP WebSocket error:", frame.headers["message"]);
  };

  return client;
}
