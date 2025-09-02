const FAQInfoBlock = document.querySelectorAll(".faq__question");
FAQInfoBlock.forEach((item) => {
  item.addEventListener("click", () => {
    const answer = item.nextElementSibling;
    const plusIcon = item.querySelector(".faq__icon-plus");
    const minusIcon = item.querySelector(".faq__icon-minus");

    console.log(answer);
    if (answer.classList.contains("open")) {
      // Закрываем ответ
      answer.classList.remove("open");
      // Показываем плюс, скрываем минус
      plusIcon.style.display = "block";
      minusIcon.style.display = "none";
    } else {
      // Открываем ответ
      answer.classList.add("open");
      // Скрываем плюс, показываем минус
      plusIcon.style.display = "none";
      minusIcon.style.display = "block";
    }
  });
});
