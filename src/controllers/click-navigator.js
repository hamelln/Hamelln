"use strict";

import scrollToSection from "../handlers/section-scroller.js";

const navigateWithScroll = () => {
  const homeLogo = document.querySelector(".header__logo");
  const tabs = document.querySelectorAll(".header-nav-list__item");
  const [aboutLink, projectLink, contactLink] = tabs;
  const navToProject = document.querySelector(".about__nav");

  homeLogo.addEventListener("click", () => {
    scrollToSection("home");
  });
  aboutLink.addEventListener("click", () => {
    scrollToSection("about");
  });
  projectLink.addEventListener("click", () => {
    scrollToSection("project");
  });
  contactLink.addEventListener("click", () => {
    scrollToSection("contact");
  });
  navToProject.addEventListener("click", () => {
    scrollToSection("project");
  });

  homeLogo.addEventListener("keydown", ({ key }) => {
    if (key === "Enter") scrollToSection("home", true);
  });
  aboutLink.addEventListener("keydown", ({ key }) => {
    if (key === "Enter") scrollToSection("about", true);
  });
  projectLink.addEventListener("keydown", ({ key }) => {
    if (key === "Enter") scrollToSection("project", true);
  });
  contactLink.addEventListener("keydown", ({ key }) => {
    if (key === "Enter") scrollToSection("contact", true);
  });
  navToProject.addEventListener("keydown", ({ key }) => {
    if (key === "Enter") scrollToSection("project", true);
  });
};

export default navigateWithScroll;
