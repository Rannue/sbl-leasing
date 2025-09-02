// Управление модальным окном уведомлений
class NotificationsModal {
  constructor() {
    this.modal = document.getElementById("notifications-modal");
    this.overlay = document.getElementById("notifications-overlay");
    this.openBtn = document.getElementById("notifications-btn");
    this.closeBtn = document.getElementById("close-notifications");
    this.markAllReadBtn = document.getElementById("mark-all-read");
    this.clearAllBtn = document.getElementById("clear-all-notifications");

    this.init();
  }

  init() {
    // Привязка событий
    this.bindEvents();
  }

  bindEvents() {
    // Открытие модального окна
    if (this.openBtn) {
      this.openBtn.addEventListener("click", () => this.openModal());
    }

    // Закрытие модального окна
    if (this.closeBtn) {
      this.closeBtn.addEventListener("click", () => this.closeModal());
    }

    // Закрытие по клику на overlay
    if (this.overlay) {
      this.overlay.addEventListener("click", () => this.closeModal());
    }

    // Закрытие по клавише Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isModalOpen()) {
        this.closeModal();
      }
    });

    // Отметить все как прочитанные
    if (this.markAllReadBtn) {
      this.markAllReadBtn.addEventListener("click", () => this.markAllAsRead());
    }

    // Очистить все уведомления
    if (this.clearAllBtn) {
      this.clearAllBtn.addEventListener("click", () =>
        this.clearAllNotifications()
      );
    }

    // Клик по уведомлению для отметки как прочитанное
    this.bindNotificationClicks();
  }

  bindNotificationClicks() {
    const notifications = document.querySelectorAll(".notification-item");
    notifications.forEach((notification) => {
      notification.addEventListener("click", () => {
        this.markNotificationAsRead(notification);
      });
    });
  }

  openModal() {
    if (this.modal && this.overlay) {
      // Предотвращаем скролл body
      document.body.style.overflow = "hidden";

      // Показываем overlay
      this.overlay.classList.add("active");

      // Показываем модальное окно с небольшой задержкой для плавности
      setTimeout(() => {
        this.modal.classList.add("active");
      }, 50);

      // Фокус на модальном окне для accessibility
      this.modal.focus();

      // Событие открытия модального окна
      this.dispatchEvent("notificationsModal:opened");
    }
  }

  closeModal() {
    if (this.modal && this.overlay) {
      // Скрываем модальное окно
      this.modal.classList.remove("active");

      // Скрываем overlay с задержкой
      setTimeout(() => {
        this.overlay.classList.remove("active");
        // Возвращаем скролл body
        document.body.style.overflow = "";
      }, 300);

      // Событие закрытия модального окна
      this.dispatchEvent("notificationsModal:closed");
    }
  }

  isModalOpen() {
    return this.modal && this.modal.classList.contains("active");
  }

  markNotificationAsRead(notification) {
    if (
      notification &&
      notification.classList.contains("notification-item--unread")
    ) {
      notification.classList.remove("notification-item--unread");

      // Анимация для плавного перехода
      notification.style.transition = "all 0.3s ease";

      // Обновление счетчика непрочитанных (если есть)
      this.updateUnreadCount();

      // Событие отметки уведомления как прочитанного
      this.dispatchEvent("notification:read", {
        notification: notification,
      });
    }
  }

  markAllAsRead() {
    const unreadNotifications = document.querySelectorAll(
      ".notification-item--unread"
    );

    unreadNotifications.forEach((notification, index) => {
      // Добавляем небольшую задержку для каждого уведомления
      setTimeout(() => {
        this.markNotificationAsRead(notification);
      }, index * 100);
    });

    // Показываем уведомление об успехе
    this.showToast("Все уведомления отмечены как прочитанные");

    // Событие отметки всех как прочитанных
    this.dispatchEvent("notifications:allRead");
  }

  clearAllNotifications() {
    // Показываем подтверждение
    if (confirm("Вы уверены, что хотите удалить все уведомления?")) {
      const notificationsList = document.querySelector(".notifications-list");

      if (notificationsList) {
        // Анимация исчезновения
        notificationsList.style.transition = "opacity 0.3s ease";
        notificationsList.style.opacity = "0";

        setTimeout(() => {
          notificationsList.innerHTML = `
            <div class="notifications-empty">
              <div class="notifications-empty__icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <path d="M24 4C12.95 4 4 12.95 4 24C4 35.05 12.95 44 24 44C35.05 44 44 35.05 44 24C44 12.95 35.05 4 24 4ZM24 40C15.16 40 8 32.84 8 24C8 15.16 15.16 8 24 8C32.84 8 40 15.16 40 24C40 32.84 32.84 40 24 40Z" fill="var(--color-gray400)"/>
                  <path d="M22 22H26V26H22V22ZM22 14H26V18H22V14Z" fill="var(--color-gray400)"/>
                </svg>
              </div>
              <div class="notifications-empty__title">Нет уведомлений</div>
              <div class="notifications-empty__description">Все уведомления удалены</div>
            </div>
          `;
          notificationsList.style.opacity = "1";
        }, 300);
      }

      // Обновление счетчика
      this.updateUnreadCount();

      // Показываем уведомление об успехе
      this.showToast("Все уведомления удалены");

      // Событие очистки всех уведомлений
      this.dispatchEvent("notifications:cleared");
    }
  }

  updateUnreadCount() {
    const unreadCount = document.querySelectorAll(
      ".notification-item--unread"
    ).length;

    // Обновление счетчика в UI (если есть элемент счетчика)
    const countElement = document.querySelector(".notifications-count");
    if (countElement) {
      if (unreadCount > 0) {
        countElement.textContent = unreadCount;
        countElement.style.display = "block";
      } else {
        countElement.style.display = "none";
      }
    }

    // Событие обновления счетчика
    this.dispatchEvent("notifications:countUpdated", {
      count: unreadCount,
    });
  }

  showToast(message) {
    // Простое toast уведомление
    const toast = document.createElement("div");
    toast.className = "toast-notification";
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: var(--color-primary);
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      z-index: 9999;
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.3s ease;
    `;

    document.body.appendChild(toast);

    // Показываем toast
    setTimeout(() => {
      toast.style.opacity = "1";
      toast.style.transform = "translateY(0)";
    }, 100);

    // Скрываем toast через 3 секунды
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(20px)";

      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 3000);
  }

  dispatchEvent(eventName, detail = {}) {
    const event = new CustomEvent(eventName, { detail });
    document.dispatchEvent(event);
  }

  // Публичные методы для внешнего использования
  open() {
    this.openModal();
  }

  close() {
    this.closeModal();
  }

  addNotification(notification) {
    const notificationsList = document.querySelector(".notifications-list");
    const emptyState = document.querySelector(".notifications-empty");

    if (emptyState) {
      emptyState.remove();
    }

    if (notificationsList) {
      const notificationElement = this.createNotificationElement(notification);
      notificationsList.insertBefore(
        notificationElement,
        notificationsList.firstChild
      );

      // Привязываем события к новому уведомлению
      notificationElement.addEventListener("click", () => {
        this.markNotificationAsRead(notificationElement);
      });

      // Обновляем счетчик
      this.updateUnreadCount();
    }
  }

  createNotificationElement(notification) {
    const div = document.createElement("div");
    div.className = `notification-item ${
      notification.unread ? "notification-item--unread" : ""
    }`;

    div.innerHTML = `
      <div class="notification-item__header">
        <div class="notification-item__title">${notification.title}</div>
        <div class="notification-item__time">${notification.time}</div>
      </div>
      <div class="notification-item__content">
        ${notification.content}
      </div>
    `;

    return div;
  }
}

// Стили для пустого состояния
const emptyStateStyles = `
.notifications-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
}

.notifications-empty__icon {
  margin-bottom: 16px;
  opacity: 0.6;
}

.notifications-empty__title {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-gray);
  margin-bottom: 8px;
}

.notifications-empty__description {
  font-size: 14px;
  color: var(--color-gray400);
}
`;

// Добавляем стили в head
const styleSheet = document.createElement("style");
styleSheet.textContent = emptyStateStyles;
document.head.appendChild(styleSheet);

// Инициализация при загрузке DOM
document.addEventListener("DOMContentLoaded", () => {
  window.notificationsModal = new NotificationsModal();

  // Обновляем счетчик при загрузке страницы
  window.notificationsModal.updateUnreadCount();
});

// Экспорт для использования в других модулях (если нужно)
if (typeof module !== "undefined" && module.exports) {
  module.exports = NotificationsModal;
}
