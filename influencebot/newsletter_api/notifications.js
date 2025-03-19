// Notification System
export const showNotification = (message, type = 'success', consentText = '') => {
  // Remove any existing notifications
  const existingNotif = document.querySelector('.newsletter-notification');
  if (existingNotif) existingNotif.remove();

  // Create notification container
  const notification = document.createElement('div');
  notification.className = `newsletter-notification ${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <p>${message}</p>
      ${consentText ? `<small class="consent-info">${consentText}</small>` : ''}
      <button class="close-notification">&times;</button>
    </div>
  `;

  // Add close functionality
  const closeButton = notification.querySelector('.close-notification');
  closeButton.addEventListener('click', () => {
    notification.remove();
  });

  // Automatically remove after 5 seconds
  document.body.appendChild(notification);
  setTimeout(() => {
    if (document.body.contains(notification)) {
      notification.remove();
    }
  }, 5000);
};
