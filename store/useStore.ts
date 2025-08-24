import { create } from "zustand";

interface ColorState {
  color: {
    h: number;
    s: number;
    v: number;
  } | null;
  setColor: (newColor: { h: number; s: number; v: number }) => void;
  clearColor: () => void;
}

interface RankingState {
  ranking: {
    userId: number;
    name: string;
    score: number;
  }[];
  setRanking: (newRanking: RankingState["ranking"]) => void;
  clearRanking: () => void;
}

interface GroupCode {
  code: string;
  room_id?: number;
}

interface Name {
  userName: string;
  setUserName: (newName: string) => void;
}

interface Score {
  score: number | null;
  avgHex: string | null;
  setScore: (newScore: number | null) => void;
  setAvgHex: (newAvgHex: string | null) => void;
}

export const useColorStore = create<ColorState>((set) => ({
  color: null,

  setColor: (newColor) => set({ color: newColor }),
  clearColor: () => set({ color: null }),
}));

export const useRankingStore = create<RankingState>((set) => ({
  ranking: [],
  setRanking: (newRanking) => set({ ranking: newRanking }),
  clearRanking: () => set({ ranking: [] }),
}));

export const useGroupCodeStore = create<GroupCode>((set) => ({
  code: "",
  room_id: 0,
}));

export const useNameStore = create<Name>((set) => ({
  userName: "",
  setUserName: (newName: string) => set({ userName: newName }),
}));

export const useScoreStore = create<Score>((set) => ({
  score: null,
  avgHex: null,
  setScore: (newScore: number | null) => set({ score: newScore }),
  setAvgHex: (newAvgHex: string | null) => set({ avgHex: newAvgHex }),
}));
