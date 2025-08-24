type start = {
  type: "start";
  ok: boolean;
  round: number;
  color: {
    h: number;
    s: number;
    v: number;
  };
};

type end = {
  type: "game_ended";
  ok: boolean;
};

type next = {
  type: "next";
  ok: boolean;
  round: number;
  color: {
    h: number;
    s: number;
    v: number;
  };
};

type submit = {
  type: "submit";
  ok: boolean;
  round: number;
  userId: number;
  score: number;
  ranking: {
    userId: number;
    name: string;
    score: number;
  }[];
};

type Color = {
  h: number;
  s: number;
  v: number;
};

export type WsMessage = start | end | next | submit | Color;
