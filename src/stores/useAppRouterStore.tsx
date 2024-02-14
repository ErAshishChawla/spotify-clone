import { create } from "zustand";

interface useAppRouterStore {
  currentRoute: string | null;
  currentRouteIndex: number;
  routeStack: string[];
  isForwardAllowed: boolean;
  isBackwardAllowed: boolean;

  pushRoute: (route: string) => void;
  replaceRoute: (route: string) => void;
  forward: () => void;
  backward: () => void;
}

export const useAppRouterStore = create<useAppRouterStore>((set) => {
  return {
    currentRoute: null,
    currentRouteIndex: -1,
    routeStack: [],
    isForwardAllowed: false,
    isBackwardAllowed: false,

    pushRoute: (route: string) =>
      set((state) => ({
        ...state,
        currentRoute: route,
        currentRouteIndex: state.currentRouteIndex + 1,
        routeStack: [...state.routeStack, route],
        isForwardAllowed: false,
        isBackwardAllowed: state.currentRouteIndex + 1 > 0,
      })),

    replaceRoute: (route: string) =>
      set((state) => ({
        ...state,
        currentRoute: route,
        routeStack: [
          ...state.routeStack.slice(0, state.currentRouteIndex),
          route,
        ],
        isForwardAllowed: false,
        isBackwardAllowed: state.currentRouteIndex > 0,
      })),

    forward: () =>
      set((state) => ({
        ...state,
        currentRouteIndex: state.currentRouteIndex + 1,
        currentRoute: state.routeStack[state.currentRouteIndex + 1],
        isForwardAllowed:
          state.currentRouteIndex + 1 < state.routeStack.length - 1,
        isBackwardAllowed: state.currentRouteIndex + 1 > 0,
      })),

    backward: () =>
      set((state) => ({
        ...state,
        currentRouteIndex: state.currentRouteIndex - 1,
        currentRoute: state.routeStack[state.currentRouteIndex - 1],
        isForwardAllowed:
          state.currentRouteIndex - 1 < state.routeStack.length - 1,
        isBackwardAllowed: state.currentRouteIndex - 1 > 0,
      })),
  };
});
