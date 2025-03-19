// Newsletter Signup Handler
const newsletterSignup = async (email) => {
  const webhookUrl = 'https://discord.com/api/webhooks/1322021846299971654/kE21IaKkKJqgbVdps3blGQAG5KXxdfYkPFha7WcdT93WPUlXdvrnnzbyOetcrJnw11-W';
  
  try {
    // Validate email
    if (!email || !email.includes('@')) {
      showNotification('Email invalide', 'error');
      return false;
    }

    // Send to Discord webhook
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: `📧 Nouveau signup Newsletter 📧\n\`${email}\``
      })
    });

    if (response.ok) {
      // Success notification with consent text
      showNotification(
        `${email} enregistré avec succès`, 
        'success', 
        `En vous inscrivant, vous acceptez notre <a href="legal.html#politique-confidentialite" class="consent-link">politique de confidentialité</a> et nos <a href="legal.html#conditions-generales" class="consent-link">conditions générales</a>.`
      );
      return true;
    } else {
      showNotification('Échec de l\'inscription. Réessayez.', 'error');
      return false;
    }
  } catch (error) {
    console.error('Erreur d\'inscription newsletter:', error);
    showNotification('Erreur réseau. Réessayez.', 'error');
    return false;
  }
};

// Notification System
const showNotification = (message, type = 'success', consentText = '') => {
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
    </div>
  `;

  // Add to body and auto-remove after 5 seconds
  document.body.appendChild(notification);
  setTimeout(() => {
    if (document.body.contains(notification)) {
      notification.remove();
    }
  }, 5000);
};

// Footer Form Event Listener
document.addEventListener('DOMContentLoaded', () => {
  const footerForm = document.querySelector('.newsletter-form');
  if (footerForm) {
    footerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const emailInput = footerForm.querySelector('input[type="email"]');
      const email = emailInput.value.trim();
      
      const success = await newsletterSignup(email);
      if (success) {
        emailInput.value = ''; // Clear input on successful signup
      }
    });
  }
});

export { newsletterSignup, showNotification };
