import { create } from "zustand";
import { LinkType } from "@/types/types";

interface LinksState {
  linksData: LinkType[];
  setLinksData: (links: LinkType[]) => void;
  addLink: (link: LinkType) => void;
  removeLink: (id: number) => void;
}

export const useLinksStore = create<LinksState>((set) => ({
  linksData: [],
  setLinksData: (links) => set({ linksData: links }),
  addLink: (link) =>
    set((state) => ({ linksData: [...state.linksData, link] })),
  removeLink: (id) =>
    set((state) => ({
      linksData: state.linksData.filter((link) => link.id !== id),
    })),
}));
