"use strict";

import { addFocus, removeFocus } from "./focus-handler.js";

const moveToNextFocus = (event) => {
  const focusableArray = Array.from(document.querySelectorAll(".focusable"));
  const currentIndex = focusableArray.findIndex(
    (element) => element === document.activeElement
  );
  let nextIndex = 0;

  event.preventDefault();

  switch (event.key) {
    case "ArrowUp":
      nextIndex = currentIndex - 1;
      break;
    case "ArrowDown":
      nextIndex = currentIndex + 1;
      break;
    case "ArrowLeft":
      nextIndex = currentIndex - 1;
      break;
    case "ArrowRight":
      nextIndex = currentIndex + 1;
      break;
    case "Tab":
      nextIndex = currentIndex + 1;
      break;
    default:
      return;
  }

  if (nextIndex < 0) nextIndex = focusableArray.length - 1;
  else if (nextIndex >= focusableArray.length) nextIndex = 0;

  const prevElement = focusableArray[currentIndex];
  const nextElement = focusableArray[nextIndex];
  removeFocus(prevElement);
  addFocus(nextElement);
};

export default moveToNextFocus;
