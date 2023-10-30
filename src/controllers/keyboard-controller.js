"use strict";

import { addFocus, removeFocus } from "../handlers/focus-handler.js";
import moveToNextFocus from "../handlers/keyboard-handler.js";
import isMobile from "../handlers/mobile-recognizer.js";
import scrollToSection from "../handlers/section-scroller.js";

const addKeyboardController = () => {
  if (isMobile()) return;

  const focusableElements = document.querySelectorAll(".focusable");

  focusableElements.forEach((element) => {
    //? 마우스 클릭 땐 포커스 이벤트 방지
    const preventFocusOnClick = (e) => {
      e.preventDefault();
    };
    const handleFocus = (e) => {
      const sectionId = e.target.closest("section")?.id;
      sectionId && scrollToSection(sectionId);
      addFocus(element);
    };
    const handleBlur = () => {
      removeFocus(element);
    };
    const handleHover = () => {
      removeFocus(document.activeElement);
    };

    element.removeEventListener("mousedown", preventFocusOnClick);
    element.removeEventListener("focus", handleFocus);
    element.removeEventListener("blur", handleBlur);
    element.removeEventListener("keydown", moveToNextFocus);
    element.removeEventListener("mouseover", handleHover);

    element.addEventListener("mousedown", preventFocusOnClick);
    element.addEventListener("mouseover", handleHover);
    element.addEventListener("focus", handleFocus);
    element.addEventListener("blur", handleBlur);
    element.addEventListener("keydown", moveToNextFocus);
  });
};

export default addKeyboardController;
