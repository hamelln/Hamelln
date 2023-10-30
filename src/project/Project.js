"use strict";

import addKeyboardController from "../controllers/keyboard-controller.js";
import { addFocus } from "../handlers/focus-handler.js";
import { play, stop } from "../handlers/sound-handler.js";
import Spec from "./Spec.js";
import Loading from "./Loading.js";
import createElement from "../handlers/element-creater.js";
import renderSelection from "./index.js";
import { saveFocusedElement } from "../handlers/focus-saver.js";

const createInfoBox = (projectTitle, backgroundImage, infoItems) => {
  const projectBox = createElement("div", { class: "project-box" });
  const projectTitleElement = createElement("div", {
    class: "project-box__title",
  });
  const projectTitleText = createElement("h2", {
    textContent: projectTitle,
  });
  const infoBox = createElement("ul", { class: "project-box__info" });
  const projectImage = createElement("img", {
    class: "project__image",
    src: backgroundImage,
    alt: "project image",
  });
  projectTitleElement.appendChild(projectTitleText);
  infoItems.map((info) => info && infoBox.appendChild(info));
  return { projectBox, projectTitleElement, infoBox, projectImage };
};

const createInfoItems = (siteUrl, codeUrl, docsUrl, spec, title, render) => {
  const openLink = (url, name) => {
    saveFocusedElement(name);
    window.open(url, "_blank");
  };

  const onClose = (title) => {
    Loading("Thank you!");
    setTimeout(() => {
      renderSelection(title);
    }, 1000);
  };

  const homepageItem =
    siteUrl && createInfoLinkItem("homepage", openLink, siteUrl, "homepage");
  const codeItem =
    codeUrl && createInfoLinkItem("code", openLink, codeUrl, "code");
  const featureItem = createInfoItem("docs", openLink, docsUrl, "docs");
  const specItem = createInfoItem("spec", Spec, spec, render);
  const exitItem = createInfoItem("exit", onClose, title, bgm);
  return [homepageItem, codeItem, featureItem, specItem, exitItem];
};

const createInfoItem = (content, callback, ...args) => {
  const DESCRIPTION_MAP = new Map([
    ["homepage", "홈페이지로 이동"],
    ["code", "GitHub으로 이동"],
    ["docs", "프로젝트 문서 페이지"],
    ["spec", "프로젝트 스펙 확인"],
    ["exit", "화면을 종료합니다"],
  ]);
  const projectDescription = document.querySelector(".project__describe");
  const handleClickAndEnter = (callback, ...args) => {
    stop(bgm);
    callback(...args);
  };
  const displayDescription = () => {
    projectDescription.textContent = DESCRIPTION_MAP.get(content);
  };
  const removeDescription = () => {
    projectDescription.textContent = "";
  };

  return createElement("li", {
    class: "project-box__info__item focusable",
    lastFocused: content,
    textContent: content,
    tabIndex: 0,
    onClick: [handleClickAndEnter, callback, ...args],
    onEnter: [handleClickAndEnter, callback, ...args],
    onFocus: [displayDescription],
    onBlur: [removeDescription],
  });
};

const createInfoLinkItem = (content, callback, ...args) => {
  const li = createInfoItem(content, callback, ...args);
  const anchor = document.createElement("a");
  li.appendChild(anchor);
  return li;
};

const findPrevFocusItem = (className, textContent) => {
  const items = Array.from(document.querySelectorAll(className));
  return items.find((item) => item.textContent.trim() === textContent);
};

const focusPrevItem = (infoBox, className, textContent) => {
  const focusItem = className
    ? findPrevFocusItem(className, textContent)
    : infoBox.firstChild;
  addFocus(focusItem);
};

const renderContent = (parent, elements) => {
  const { projectBox, projectTitleElement, infoBox, projectImage } = elements;
  parent.innerHTML = "";
  projectBox.appendChild(projectTitleElement);
  projectBox.appendChild(infoBox);
  parent.appendChild(projectBox);
  parent.appendChild(projectImage);
};

export default function Project({
  title,
  siteUrl,
  codeUrl,
  docsUrl,
  backgroundImage,
  spec,
}) {
  const render = (className, textContent) => {
    const bgm = document.querySelector("#bgm");
    const parent = document.querySelector(".project-content");
    const infoItems = createInfoItems(
      siteUrl,
      codeUrl,
      docsUrl,
      spec,
      title,
      render
    );
    const elements = createInfoBox(title, backgroundImage, infoItems);
    parent.innerHTML = "";
    renderContent(parent, elements);
    play(bgm);
    focusPrevItem(elements.infoBox, className, textContent);
    addKeyboardController();
  };

  render();
}
