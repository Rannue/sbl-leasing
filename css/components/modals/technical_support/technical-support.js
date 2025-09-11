// Функционал для модального окна технической поддержки
document.addEventListener("DOMContentLoaded", function () {
  const feedbackSelect = document.getElementById("feedback-format");
  const contactContainer = document.getElementById("contact-input-container");
  const contactInput = document.getElementById("contact-info");
  const contactLabel = document.getElementById("contact-label");

  // Обработчик изменения выбора формата обратной связи
  if (feedbackSelect) {
    feedbackSelect.addEventListener("change", function () {
      const selectedValue = this.value;

      if (selectedValue === "phone") {
        // Показываем инпут для телефона
        contactContainer.style.display = "block";
        contactContainer.classList.add("fade-in");
        contactLabel.textContent = "Мобильный телефон*";
        contactInput.type = "tel";
        contactInput.placeholder = "+375 (XX) XXX-XX-XX";
        contactInput.required = true;
        contactInput.value = "";

        // Добавляем маску для телефона
        contactInput.addEventListener("input", formatPhoneNumber);
      } else if (selectedValue === "email") {
        // Показываем инпут для email
        contactContainer.style.display = "block";
        contactContainer.classList.add("fade-in");
        contactLabel.textContent = "Электронная почта*";
        contactInput.type = "email";
        contactInput.placeholder = "example@mail.com";
        contactInput.required = true;
        contactInput.value = "";

        // Убираем маску телефона если была
        contactInput.removeEventListener("input", formatPhoneNumber);
      } else {
        // Скрываем инпут если ничего не выбрано
        contactContainer.style.display = "none";
        contactContainer.classList.remove("fade-in");
        contactInput.required = false;
        contactInput.value = "";
        contactInput.removeEventListener("input", formatPhoneNumber);
      }
    });
  }

  // Функция для форматирования номера телефона
  function formatPhoneNumber(e) {
    let value = e.target.value.replace(/\D/g, "");

    // Ограничиваем до 12 цифр (375 + 9 цифр)
    if (value.length > 12) {
      value = value.slice(0, 12);
    }

    // Форматируем номер
    if (value.length >= 3) {
      if (value.startsWith("375")) {
        // Белорусский номер
        if (value.length <= 5) {
          value = "+375 (" + value.slice(3);
        } else if (value.length <= 8) {
          value = "+375 (" + value.slice(3, 5) + ") " + value.slice(5);
        } else if (value.length <= 10) {
          value =
            "+375 (" +
            value.slice(3, 5) +
            ") " +
            value.slice(5, 8) +
            "-" +
            value.slice(8);
        } else {
          value =
            "+375 (" +
            value.slice(3, 5) +
            ") " +
            value.slice(5, 8) +
            "-" +
            value.slice(8, 10) +
            "-" +
            value.slice(10);
        }
      } else {
        // Если не начинается с 375, добавляем +375
        value = "375" + value;
        if (value.length <= 5) {
          value = "+375 (" + value.slice(3);
        } else if (value.length <= 8) {
          value = "+375 (" + value.slice(3, 5) + ") " + value.slice(5);
        } else if (value.length <= 10) {
          value =
            "+375 (" +
            value.slice(3, 5) +
            ") " +
            value.slice(5, 8) +
            "-" +
            value.slice(8);
        } else {
          value =
            "+375 (" +
            value.slice(3, 5) +
            ") " +
            value.slice(5, 8) +
            "-" +
            value.slice(8, 10) +
            "-" +
            value.slice(10);
        }
      }
    } else if (value.length > 0) {
      value = "+375 (" + value;
    }

    e.target.value = value;
  }

  // Обработчик отправки формы
  const form = document.getElementById("technical-support");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Здесь можно добавить логику отправки формы
      console.log("Форма отправлена");

      // Пример валидации
      const feedbackFormat = feedbackSelect.value;
      const contactInfo = contactInput.value;

      if (feedbackFormat && !contactInfo) {
        alert("Пожалуйста, заполните контактную информацию");
        return;
      }

      // Здесь будет AJAX запрос или другая логика отправки
      alert("Ваше обращение отправлено!");
    });
  }
});
