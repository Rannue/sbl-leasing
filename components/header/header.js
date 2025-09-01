// Функция для инициализации элементов пользователя
function initializeUserElements() {
  const userNameElement = document.getElementById("user-name");
  const firstLetterElement = document.getElementById(
    "header__user-first-letter"
  );

  if (userNameElement && firstLetterElement) {
    const fullName = userNameElement.textContent.trim();
    const firstLetter = fullName.split("").find((char) => char !== " ");
    if (firstLetter) {
      firstLetterElement.textContent = firstLetter;
    }
  }
}

// Функция для управления активными элементами навигации
function initializeNavigation() {
  const currentPath = window.location.pathname;
  const navItems = document.querySelectorAll(".header__nav-item");

  // Убираем active класс со всех элементов навигации
  navItems.forEach((item) => {
    item.classList.remove("active");
  });

  // Определяем активную страницу и устанавливаем соответствующий класс
  if (
    currentPath.includes("/index.html") ||
    currentPath.endsWith("/sbl-leasing/") ||
    currentPath.endsWith("/sbl-leasing") ||
    (currentPath.includes("/sbl-leasing") && !currentPath.includes("/pages/"))
  ) {
    // Главная страница - активируем "Договоры"
    const contractsNav = document.getElementById("nav-contracts");
    if (contractsNav) {
      contractsNav.classList.add("active");
    }
  } else if (currentPath.includes("/pages/faq/")) {
    // Страница FAQ
    const faqNav = document.getElementById("nav-faq");
    if (faqNav) {
      faqNav.classList.add("active");
    }
  } else if (currentPath.includes("/pages/personal_account/")) {
    // Страница профиля - все элементы навигации неактивны (ничего не делаем)
    console.log("На странице профиля - навигация неактивна");
  }
  // Для остальных страниц можно добавить дополнительную логику

  // Добавляем обработчики кликов для навигационных элементов
  addNavigationClickHandlers();
}

// Функция для добавления обработчиков кликов на навигационные элементы
function addNavigationClickHandlers() {
  const currentPath = window.location.pathname;

  // Обработчик для "Договоры" (главная страница)
  const contractsNav = document.getElementById("nav-contracts");
  if (contractsNav) {
    contractsNav.addEventListener("click", () => {
      let homePath;
      if (currentPath.includes("/pages/")) {
        homePath = "../../index.html";
      } else {
        homePath = "./index.html";
      }
      window.location.href = homePath;
    });
  }

  // Обработчик для "Онлайн - заявки" (пока перенаправляем на главную)
  const applicationsNav = document.getElementById("nav-applications");
  if (applicationsNav) {
    applicationsNav.addEventListener("click", () => {
      // TODO: Добавить переход на страницу онлайн-заявок когда она будет создана
      console.log("Переход на страницу онлайн-заявок (пока не реализована)");
    });
  }

  // Обработчик для "Уведомления" (пока перенаправляем на главную)
  const notificationsNav = document.getElementById("nav-notifications");
  if (notificationsNav) {
    notificationsNav.addEventListener("click", () => {
      // TODO: Добавить переход на страницу уведомлений когда она будет создана
      console.log("Переход на страницу уведомлений (пока не реализована)");
    });
  }

  // FAQ уже имеет href в HTML, поэтому дополнительного обработчика не требуется
}

// Функция для инициализации навигации профиля
function initializeProfileNavigation() {
  const profileLinkBtn = document.getElementById("profile-link-btn");

  if (profileLinkBtn) {
    profileLinkBtn.addEventListener("click", () => {
      // Определяем путь к странице профиля в зависимости от текущего расположения
      const currentPath = window.location.pathname;
      let profilePath;

      if (currentPath.includes("/pages/personal_account/")) {
        // Если мы уже на странице профиля, ничего не делаем
        return;
      } else if (currentPath.includes("/pages/")) {
        // Если мы на другой странице в папке pages
        profilePath = "../personal_account/personal-account.html";
      } else {
        // Если мы на главной странице (index.html)
        profilePath = "./pages/personal_account/personal-account.html";
      }

      window.location.href = profilePath;
    });
  }
}

// Функция для инициализации мобильного меню
function initializeMobileMenu() {
  const burgerBTN = document.getElementById("burger-btn");
  const closeBTN = document.getElementById("header__close-btn");
  const menu = document.getElementById("menu");

  // Проверяем, что все элементы существуют
  if (!burgerBTN || !closeBTN || !menu) {
    console.warn("Элементы мобильного меню не найдены");
    return;
  }

  // Функция для открытия меню
  const openMenu = () => {
    menu.style.display = "flex";
    document.body.style.overflow = "hidden"; // Блокируем скролл страницы

    // Небольшая задержка для корректной анимации
    setTimeout(() => {
      menu.classList.add("menu-open");
    }, 10);
  };

  // Функция для закрытия меню
  const closeMenu = () => {
    menu.classList.remove("menu-open");
    document.body.style.overflow = ""; // Восстанавливаем скролл страницы

    // Скрываем меню после завершения анимации
    setTimeout(() => {
      if (!menu.classList.contains("menu-open")) {
        menu.style.display = "none";
      }
    }, 300); // Время должно совпадать с transition в CSS
  };

  // Обработчик открытия меню
  burgerBTN.addEventListener("click", openMenu);

  // Обработчик закрытия меню
  closeBTN.addEventListener("click", closeMenu);

  // Закрытие меню при клике на фон (опционально)
  menu.addEventListener("click", (e) => {
    if (e.target === menu) {
      closeMenu();
    }
  });

  // Закрытие меню при нажатии Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("menu-open")) {
      closeMenu();
    }
  });
}

// Инициализация когда DOM готов
function initializeHeader() {
  initializeUserElements();
  initializeNavigation();
  initializeProfileNavigation();
  initializeMobileMenu();
}

// Делаем функцию доступной глобально
window.initializeHeader = initializeHeader;

// Если DOM уже загружен, инициализируем сразу
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeHeader);
} else {
  initializeHeader();
}
