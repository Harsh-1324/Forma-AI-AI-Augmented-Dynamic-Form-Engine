import { create } from "zustand";

export const useAIStore = create((set) => ({
  isExtracting: false,
  lastRawText: "",
  error: null,

  startExtraction: (text) => set({ isExtracting: true, lastRawText: text, error: null }),
  finishExtraction: () => set({ isExtracting: false, error: null }),
  setError: (error) => set({ isExtracting: false, error }),
}));
