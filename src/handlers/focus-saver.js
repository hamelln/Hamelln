"use strict";

import { addFocus } from "./focus-handler.js";

export const saveFocusedElement = (name) => {
  sessionStorage.setItem("lastFocused", name);
};

export const restoreFocus = () => {
  const lastFocusedName = sessionStorage.getItem("lastFocused");
  if (lastFocusedName) {
    const element = document.querySelector(
      `[lastFocused="${lastFocusedName}"]`
    );
    if (element) {
      addFocus(element);
      sessionStorage.removeItem("lastFocused");
    }
  }
};
