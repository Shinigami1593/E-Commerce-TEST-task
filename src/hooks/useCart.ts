"use client";

import { useEffect } from "react";
import { useStore } from "zustand";
import { cartStore } from "@/store/cartStore";

let hasStartedHydration = false;

export function useCart() {
  useEffect(() => {
    if (!hasStartedHydration) {
      hasStartedHydration = true;
      void cartStore.persist.rehydrate();
    }
  }, []);

  return useStore(cartStore);
}