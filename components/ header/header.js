const userNameElement = document.getElementById("user-name");
const firstLetterElement = document.getElementById("header__user-first-letter");

if (userNameElement && firstLetterElement) {
  const fullName = userNameElement.textContent.trim();
  const firstLetter = fullName.split("").find((char) => char !== " ");
  if (firstLetter) {
    firstLetterElement.textContent = firstLetter;
  }
}

//

// function setElementHeight() {
//   const headerBottom = document.querySelector(".header__bottom");
//   const headerTop = document.querySelector(".header__top");

//   headerBottom.removeAttribute("height"); // удаляет атрибут height|

//   if (headerBottom && headerTop) {
//     if (window.innerWidth < 960) {
//       const windowHeight = window.innerHeight;
//       console.log(windowHeight);
//       const headerHeight = headerTop.offsetHeight;

//       headerBottom.style.height = `calc(100vh - ${headerHeight + 36}px)`;
//     } else {
//       headerBottom.removeAttribute("height"); // удаляет атрибут height|
//     }
//   }
// }

// setElementHeight();

// window.addEventListener("load", setElementHeight); // при загрузке страницы
// window.addEventListener("resize", setElementHeight); // при изменении размеров окна
