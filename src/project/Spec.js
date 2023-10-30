"use strict";

import createElement from "../handlers/element-creater.js";
import addKeyboardController from "../controllers/keyboard-controller.js";
import { play, stop } from "../handlers/sound-handler.js";

const SPEC_BGM = document.getElementById("spec-sound");

const animateText = (specDescription, descriptionTemplate) => {
  let currentText = ``;
  let index = 0;
  let charIndex = 0;
  const MAX_LENGTH = descriptionTemplate.length;

  const isHTMLCode = (text) => text[0] === "<";
  const printAtOnce = (text) => {
    currentText += text;
    specDescription.innerHTML = currentText;
    index++;
  };
  const printPerChar = (text) => {
    if (charIndex < text.length) {
      currentText += text[charIndex];
      specDescription.innerHTML = currentText;
      charIndex++;
    } else {
      charIndex = 0;
      index++;
    }
  };
  const animate = () => {
    if (index >= MAX_LENGTH) return;
    const text = descriptionTemplate[index];
    (isHTMLCode(text) ? printAtOnce : printPerChar)(text);
    requestAnimationFrame(animate);
  };
  requestAnimationFrame(animate);
};

const getDescriptionTemplate = ({ startDay, endDay, member, skill, role }) => {
  const skillSentence = skill.reduce((str, skill) => str + ", " + skill);

  return [
    `<span class="project-content__spec__box__skill">`,
    member,
    `</span>`,
    `인이 작업했습니다.`,
    `<br />`,
    `<span class="project-content__spec__box__skill">`,
    startDay,
    `</span>`,
    `부터 `,
    `<span class="project-content__spec__box__skill">`,
    endDay,
    `</span>`,
    `${endDay === "현재" ? "까지 진행중이에요." : "까지 진행했어요."}`,
    `<br />`,
    `이 프로젝트에 사용된 기술은 `,
    `<span class="project-content__spec__box__skill">`,
    skillSentence,
    `</span>`,
    `입니다.`,
    `<br />`,
    `저는 `,
    `<span class="project-content__spec__box__skill">`,
    role,
    `</span>`,
    `를 담당했습니다.`,
  ];
};

const render = ({
  parent,
  characterImage,
  descriptionTemplate,
  backToProjectTitle,
}) => {
  const quitSpec = (SPEC_BGM) => {
    stop(SPEC_BGM);
    backToProjectTitle(".project-box__info__item", "spec");
  };

  const specBox = createElement("div", { class: "project-content__spec" });
  const characterFigure = createElement("figure", {
    class: "project-content__spec__character",
  });
  const character = createElement("img", {
    class: "project-content__spec__character__image",
    src: characterImage,
    alt: "project character image",
  });
  const specInnerBox = createElement("div", {
    class: "project-content__spec__box",
  });
  const descriptionBox = createElement("div", {
    class: "project-content__spec__describe__box",
  });
  const specDescription = createElement("p", {
    class: "project-content__spec__box__describe",
  });
  const specEnterButton = createElement("p", {
    class: "project-content__spec__box__Enter focusable",
    tabIndex: 0,
    textContent: "Enter",
    onClick: [quitSpec, SPEC_BGM],
    onEnter: [quitSpec, SPEC_BGM],
  });

  parent.innerHTML = "";
  characterFigure.appendChild(character);
  descriptionBox.appendChild(specDescription);
  descriptionBox.appendChild(specEnterButton);
  specInnerBox.appendChild(descriptionBox);
  specBox.appendChild(characterFigure);
  specBox.appendChild(specInnerBox);
  parent.appendChild(specBox);
  animateText(specDescription, descriptionTemplate);
  addKeyboardController();
  specEnterButton.focus();
};

export default function Spec(spec, backToProjectTitle) {
  const parent = document.querySelector(".project-content");
  const descriptionTemplate = getDescriptionTemplate(spec);
  const { characterImage } = spec;
  play(SPEC_BGM);

  render({
    parent,
    characterImage,
    descriptionTemplate,
    backToProjectTitle,
  });
}
