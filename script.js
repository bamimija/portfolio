const form = document.querySelector("#contact-form");
const formStatus = document.querySelector(".form-status");
const year = document.querySelector("#year");
const projectCards = document.querySelectorAll(".project-card[data-project]");
const projectModal = document.querySelector("#project-modal");
const projectDialog = projectModal.querySelector(".project-dialog");
const closeProjectButton = projectModal.querySelector(".project-modal-close");
let lastFocusedCard = null;

const projects = {
  lumio: {
    type: "Fintech · 2024",
    name: "Lumio 금융 경험 리디자인",
    description: "복잡한 금융 정보를 한눈에 이해하고 일상적인 자산 관리를 쉽게 할 수 있도록 구성한 금융 서비스입니다. (예시 설명)",
    role: "사용자 흐름 설계, 화면 구조 및 UI 디자인",
    technologies: ["Figma", "사용자 인터뷰", "프로토타이핑"],
    outcome: "예시 목표: 핵심 작업 완료 시간을 30% 줄이고 서비스 만족도를 높였습니다."
  },
  mori: {
    type: "Wellness · 2023",
    name: "Mori 하루 루틴 앱",
    description: "작은 습관을 꾸준히 이어갈 수 있도록 개인의 일과에 맞춘 루틴과 진행 상황을 제공하는 웰니스 앱입니다. (예시 설명)",
    role: "사용자 조사, 루틴 생성 경험 및 모바일 UI 디자인",
    technologies: ["Figma", "사용성 테스트", "디자인 시스템"],
    outcome: "예시 목표: 루틴 완주율을 높이고 첫 루틴 설정 시간을 줄였습니다."
  },
  ondo: {
    type: "Travel · 2023",
    name: "Ondo Studio 여행 경험",
    description: "주말 여행을 간편하게 계획하고 지역의 새로운 장소를 발견하도록 돕는 여행 서비스입니다. (예시 설명)",
    role: "서비스 콘셉트 기획, 정보 구조 및 반응형 UI 디자인",
    technologies: ["Figma", "여정 지도", "반응형 프로토타입"],
    outcome: "예시 목표: 여행 일정 작성 단계를 간소화하고 장소 저장 참여를 높였습니다."
  }
};

year.textContent = new Date().getFullYear();

// 카드에 해당하는 프로젝트 정보를 채우고 모달을 엽니다.
function openProjectDetails(projectId, card) {
  const project = projects[projectId];
  if (!project) {
    throw new Error(`Unknown project: ${projectId}`);
  }

  lastFocusedCard = card;
  projectModal.querySelector("#project-modal-type").textContent = project.type;
  projectModal.querySelector("#project-modal-title").textContent = project.name;
  projectModal.querySelector("#project-modal-description").textContent = project.description;
  projectModal.querySelector("#project-modal-role").textContent = project.role;
  projectModal.querySelector("#project-modal-outcome").textContent = project.outcome;

  const technologyList = projectModal.querySelector("#project-modal-technologies");
  technologyList.replaceChildren();
  project.technologies.forEach((technology) => {
    const item = document.createElement("li");
    item.textContent = technology;
    technologyList.append(item);
  });

  projectModal.hidden = false;
  document.body.classList.add("project-modal-open");
  closeProjectButton.focus();
}

// 모달을 닫고 열기 전 카드로 키보드 포커스를 돌려보냅니다.
function closeProjectDetails() {
  if (projectModal.hidden) {
    return;
  }

  projectModal.hidden = true;
  document.body.classList.remove("project-modal-open");
  if (lastFocusedCard) {
    lastFocusedCard.focus();
  }
}

// ESC로 닫고 Tab 포커스가 모달 밖으로 나가지 않게 합니다.
function handleProjectModalKeydown(event) {
  if (event.key === "Escape") {
    event.preventDefault();
    closeProjectDetails();
  } else if (event.key === "Tab") {
    event.preventDefault();
    closeProjectButton.focus();
  }
}

projectCards.forEach((card) => {
  card.addEventListener("click", () => {
    openProjectDetails(card.dataset.project, card);
  });
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProjectDetails(card.dataset.project, card);
    }
  });
});

closeProjectButton.addEventListener("click", closeProjectDetails);
projectModal.addEventListener("click", (event) => {
  if (event.target === projectModal) {
    closeProjectDetails();
  }
});
projectDialog.addEventListener("keydown", handleProjectModalKeydown);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  formStatus.textContent = "메시지가 준비되었습니다. 곧 답변드릴게요!";
  form.reset();
});
