// Переключение табов личного кабинета

const content = document.getElementById("content");
const tabs = document.querySelectorAll(".personal-profile__nav-item");

const personal = document.getElementById("personal-content");
const contacts = document.getElementById("contacts-content");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const type = tab.dataset.type;

    tabs.forEach((t) => t.classList.remove("active"));

    tab.classList.add("active");

    switch (type) {
      case "personal":
        personal.style.display = "flex";
        contacts.style.display = "none";
        break;

      case "contacts":
        personal.style.display = "none";
        contacts.style.display = "flex";
        break;

      case "settings":
        content.innerHTML = `
            <h2>Настройки</h2>
            <p>Раздел для изменения пароля, темы и других параметров.</p>
          `;
        break;
    }
  });
});

// Редактирование Email

const viewMode = document.querySelector(".view-mode");
const editMode = document.querySelector(".edit-mode");
const editBtn = document.getElementById("personal-profile__edit-btn");
const cancelBtn = document.getElementById("personal-profile__cancel-btn");
const saveBtn = document.getElementById("personal-profile__save-btn");

const emailText = document.getElementById("email-text");
const emailInput = document.getElementById("email-input");

editBtn.addEventListener("click", () => {
  viewMode.style.display = "none";
  editMode.style.display = "flex";
  emailInput.value = emailText.innerText.trim();
});

cancelBtn.addEventListener("click", () => {
  viewMode.style.display = "flex";
  editMode.style.display = "none";
});

saveBtn.addEventListener("click", () => {
  viewMode.style.display = "flex";
  editMode.style.display = "none";
  emailText.innerText = emailInput.value.trim();
});
