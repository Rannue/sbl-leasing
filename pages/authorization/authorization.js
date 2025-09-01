const body = document.querySelector("body");

// TECHNICAL_SUPPORT_FORM

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
