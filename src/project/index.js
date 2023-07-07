const setupOfProjectSkillTextChange = () => {
  const projects = new Map();
  projects.set("COFFEEN", {
    uuid: "95000cc1-beb9-4c77-8812-13a8be2d5a16",
    skills: "Next.js React TypeScript",
    member: 1,
    period: "6개월",
  });
  projects.set("반려in", {
    uuid: "6bb4b7ce-a576-423c-96d1-95fc5f376f35",
    skills: "HTML CSS JavaScript",
    member: 6,
    period: "2주",
  });
  projects.set("Modak", {
    uuid: "2d36e029-2d89-48a0-a919-7ad06030fe9b",
    skills: "Next.js React TypeScript Redux",
    member: 5,
    period: "1개월",
  });

  const selectSound = document.getElementById("select-sound");
  const skills = document.querySelector(".project__skills");
  const projectItems = document.querySelectorAll(
    ".project-content__selection__item"
  );

  const playSound = (sound) => {
    sound.currentTime = 0;
    sound.play();
  };

  const changeProjectSkill = (project) => {
    const projectTitle = project.textContent.trim();
    const skillText = projects.get(projectTitle)["skills"];
    skills.textContent = skillText;
  };

  const isMobileDevice = /Mobi/i.test(navigator.userAgent);
  const soundEvent = isMobileDevice ? "touchstart" : "focus";

  projectItems.forEach((project) => {
    project.addEventListener(soundEvent, () => {
      playSound(selectSound);
      changeProjectSkill(project);
      if (isMobileDevice) project.focus();
    });
    project.addEventListener("blur", () => {
      skills.textContent = "";
    });
  });
};

export default setupOfProjectSkillTextChange;
