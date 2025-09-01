const FAQInfoBlock = document.querySelectorAll(".faq__question");
FAQInfoBlock.forEach((item) => {
  item.addEventListener("click", () => {
    const answer = item.nextElementSibling;
    console.log(answer);
    if (answer.classList.contains("open")) {
      answer.classList.remove("open");
    } else {
      answer.classList.add("open");
    }
  });
});
