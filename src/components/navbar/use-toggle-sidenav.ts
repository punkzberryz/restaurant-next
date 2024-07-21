import { create } from "zustand";
interface UseToggleSideNavState {
  isExpanded: boolean;
  setIsExpanded: (isExpanded: boolean) => void;
}
export const useToggleSideNav = create<UseToggleSideNavState>((set) => ({
  isExpanded: true,
  setIsExpanded: (isExpanded) => set({ isExpanded }),
}));
