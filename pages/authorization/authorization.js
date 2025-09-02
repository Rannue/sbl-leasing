const body = document.querySelector("body");

// Маска для ввода номера телефона

const phoneInput = document.querySelector('input[name="phone"]');
if (phoneInput) {
  phoneInput.value = "";

  phoneInput.addEventListener("focus", (e) => {
    if (e.target.value === "") {
      e.target.value = "+375 ";
    }
  });

  phoneInput.addEventListener("input", (e) => {
    let value = e.target.value;

    // Удаляем все кроме цифр
    let numbers = value.replace(/\D/g, "");

    // Если пользователь удалил весь текст, возвращаем +375
    if (numbers.length === 0) {
      e.target.value = "+375 ";
      return;
    }

    // Если начинается не с 375, принудительно добавляем
    if (!numbers.startsWith("375")) {
      numbers = "375" + numbers.replace(/^375/, "");
    }

    // Форматируем номер
    let formattedValue = "+375";
    if (numbers.length > 3) {
      formattedValue += " " + numbers.substring(3, 5);
    }
    if (numbers.length > 5) {
      formattedValue += " " + numbers.substring(5, 8);
    }
    if (numbers.length > 8) {
      formattedValue += " " + numbers.substring(8, 10);
    }
    if (numbers.length > 10) {
      formattedValue += " " + numbers.substring(10, 12);
    }

    e.target.value = formattedValue;
  });

  phoneInput.addEventListener("keydown", (e) => {
    // Запрещаем удаление префикса +375
    if (
      (e.key === "Backspace" || e.key === "Delete") &&
      e.target.selectionStart <= 5 &&
      e.target.selectionEnd <= 5
    ) {
      e.preventDefault();
    }
  });

  // Запрещаем установку курсора раньше префикса +375
  phoneInput.addEventListener("click", (e) => {
    if (e.target.selectionStart < 5) {
      e.target.setSelectionRange(5, 5);
    }
  });

  phoneInput.addEventListener("keyup", (e) => {
    if (e.target.selectionStart < 5) {
      e.target.setSelectionRange(5, 5);
    }
  });

  phoneInput.addEventListener("select", (e) => {
    if (e.target.selectionStart < 5) {
      e.target.setSelectionRange(5, 5);
    }
  });
}

// FORM SUBMISSION HANDLER
const authForm = document.querySelector(".authorization__fields");
if (authForm) {
  authForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // Переход на главную страницу
    window.location.href = "../../index.html";
  });
}

// TECHNICAL_SUPPORT_FORMт

const openTechnicalSupportFormButton = document.getElementById(
  "technical-support__form-btn"
);

openTechnicalSupportFormButton.addEventListener("click", (e) => {
  console.log("Кнопка нажата!");
  e.preventDefault();
  document.body.insertAdjacentHTML(
    "afterbegin",
    `<div class="overlay"></div>
    <div id="technical-support__form" class="modal">
  <form class="modal__form" id="technical-support">
    <div class="modal__header">
      <h4 class="modal__title">Обращение в техническую поддержку</h4>
      <svg
        class="svg-icon"
        id="close-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          d="M17.4697 5.46967C17.7626 5.17678 18.2373 5.17678 18.5302 5.46967C18.8231 5.76256 18.8231 6.23732 18.5302 6.53022L6.53022 18.5302C6.23732 18.8231 5.76256 18.8231 5.46967 18.5302C5.17678 18.2373 5.17678 17.7626 5.46967 17.4697L17.4697 5.46967Z"
          fill="#B4B4B4"
        />
        <path
          d="M5.46967 5.46967C5.76256 5.17678 6.23732 5.17678 6.53022 5.46967L18.5302 17.4697L18.582 17.5263C18.8223 17.8209 18.8048 18.2556 18.5302 18.5302C18.2556 18.8048 17.8209 18.8223 17.5263 18.582L17.4697 18.5302L5.46967 6.53022C5.17678 6.23732 5.17678 5.76256 5.46967 5.46967Z"
          fill="#B4B4B4"
        />
      </svg>
    </div>
    <div class="modal__main">
      <label class="modal__label" for="name">
        ФИО*
        <input
          class="input input--small"
          type="text"
          id="name"
          name="user_name"
          required
        />
      </label>

      <label class="modal__label" for="feedback-format">
        Формат обратной связи*
        <select class="select select--small" name="feedback-format" required>
          <option value="designer">item1</option>
          <option value="developer">item2</option>
          <option value="manager">item3</option>
        </select>
      </label>

      <label class="modal__label" for="message">
        Сообщение о проблеме
        <textarea
          rows="8"
          class="textarea textarea--small"
          name="message"
          id="message"
          required
        ></textarea>
      </label>
    </div>
    <div class="modal__footer">
      <div class="modal__actions">
        <button class="btn btn--small btn--secondary">Отмена</button>
        <button class="btn btn--small btn--primary">Отправить</button>
      </div>
    </div>
  </form>
    </div>`
  );

  const closeTechnicalSupportFormButton = document.getElementById("close-icon");
  if (closeTechnicalSupportFormButton) {
    closeTechnicalSupportFormButton.addEventListener("click", (e) => {
      console.log("Кнопка закрытияя");
      const modal = document.getElementById("technical-support__form");
      const overlay = document.querySelector(".overlay");
      if (modal) modal.remove();
      if (overlay) overlay.remove();
    });
  }
});
