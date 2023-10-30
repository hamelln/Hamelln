"use strict";

import addClickAndEnterHandler from "../handlers/click-enter-handler.js";
import addKeyboardController from "../controllers/keyboard-controller.js";
import {
  addBlurHandler,
  addFocus,
  addFocusHandler,
  removeFocus,
} from "../handlers/focus-handler.js";
import { play } from "../handlers/sound-handler.js";
import Project from "./Project.js";
import Loading from "./Loading.js";
import createElement from "../handlers/element-creater.js";

const createSelectionBox = (selectionList) => {
  const selectionBox = createElement("div", {
    class: "project-content__selection",
  });

  selectionBox.appendChild(selectionList);
  return selectionBox;
};

const createProjectList = (data) => {
  const projectTitles = Object.keys(data);
  const projectList = createElement("ul", {
    class: "project-content__selection__list",
  });

  projectTitles.map((projectTitle) => {
    const projectItem = createElement("li", {
      class: "project-content__selection__item focusable",
      tabIndex: 0,
      textContent: projectTitle,
    });
    projectList.appendChild(projectItem);
  });
  return projectList;
};

const createProjectFigure = () => {
  const figure = createElement("figure", {
    class: "project-content__overview",
  });
  const projectImgBox = createElement("div", {
    class: "project-content__overview__image-box",
  });
  const projectImg = createElement("img", {
    class: "project-content__overview__image",
  });
  const projectSkill = createElement("ul", {
    class: "project-content__overview__skill",
  });
  projectImgBox.appendChild(projectImg);
  figure.appendChild(projectImgBox);
  figure.appendChild(projectSkill);
  return figure;
};

const addEventProjectItem = (project, data) => {
  const projectTitle = project.textContent.trim();
  const projectData = data[projectTitle];
  const projectSkillArray = projectData.skillOverview;
  const selectSound = document.querySelector("#project-sound");
  const startSound = document.querySelector("#game-start");
  const describe = document.querySelector(".project__describe");
  const projectSkillList = document.querySelector(
    ".project-content__overview__skill"
  );

  const setProjectImage = (projectTitle) => {
    const oldImg = document.querySelector(".project-content__overview__image");
    const parent = oldImg.parentNode;
    const newImg = createElement("img", {
      class: "project-content__overview__image",
      src: data[projectTitle].backgroundImage,
      alt: `${projectTitle} image`,
    });
    parent.replaceChild(newImg, oldImg);
  };

  const clearProjectImage = () => {
    const imgBox = document.querySelector(
      ".project-content__overview__image-box"
    );
    const oldImg = document.querySelector(".project-content__overview__image");
    const parent = oldImg.parentNode;
    const newImg = oldImg.cloneNode();
    imgBox.classList.add("blink");
    parent.replaceChild(newImg, oldImg);
    newImg.src = "";
    newImg.alt = "";
  };

  const startProject = () => {
    play(startSound);
    Loading("Hamelln");
    setTimeout(() => {
      Project(projectData);
    }, 1000);
  };

  const handleFocus = () => {
    describe.textContent = projectData.describe;
    const projectSince = createElement("li", {
      class: "project-content__overview__skill__item since",
      textContent: projectData.since,
    });
    projectSkillList.appendChild(projectSince);

    projectSkillArray.map((skill) => {
      const projectSkillItem = createElement("li", {
        class: "project-content__overview__skill__item",
        textContent: skill,
      });
      projectSkillList.appendChild(projectSkillItem);
      setProjectImage(projectTitle);
    });

    play(selectSound);
  };

  const handleBlur = () => {
    describe.textContent = "";
    projectSkillList.innerHTML = "";
    clearProjectImage();
  };
  const handleHover = () => {
    removeFocus(document.activeElement);
    handleFocus();
  };
  //? 마우스 모드: 다른 곳에 focus 아이템이 있으면 focus 제거하고 이벤트만 실행
  project.addEventListener("mouseover", handleHover);
  project.addEventListener("mouseout", handleBlur);
  //? 키보드 모드: focusing도 처리해서 자동 스크롤 조절 기능 주입
  addFocusHandler(project)(handleFocus);
  addBlurHandler(project)(handleBlur);
  addClickAndEnterHandler(project)(startProject);
};

const findPrevFocusItem = (className, textContent) => {
  const items = Array.from(document.querySelectorAll(className));
  return items.find((item) => item.textContent.trim() === textContent);
};

const focusPrevItem = (projectTitle) => {
  if (!projectTitle) return;
  const focusedItem = findPrevFocusItem(
    ".project-content__selection__item",
    projectTitle
  );
  addFocus(focusedItem);
};

const render = (parent, projectTitle, data) => {
  const selectionList = createProjectList(data);
  const selectionBox = createSelectionBox(selectionList);
  const projectFigure = createProjectFigure();

  parent.innerHTML = "";
  parent.appendChild(selectionBox);
  parent.appendChild(projectFigure);

  selectionList.childNodes.forEach((project) => {
    addEventProjectItem(project, data);
  });

  addKeyboardController();
  focusPrevItem(projectTitle);
};

export default async function Selection(title = undefined) {
  const data = await (await fetch("src/data/project.json")).json();
  const parent = document.querySelector(".project-content");
  render(parent, title, data);
}
