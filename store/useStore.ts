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
