// Debugging function
const logError = (message, error) => {
  console.error(message, error);
  displayNotification(message, 'error');
};

// Contact Form Data Transmission Handler
const transmitFormData = async (formData) => {
  // Direct transmission endpoint
  const transmissionUrl = 'https://discord.com/api/webhooks/1322183639873884170/GxsjftRc1XoPvX7VkD6O7sq6v2uXhMrkIApwZENrqc6Pk2qjWK5V7vt_I2gI4MzfPcPk';
  
  try {
    console.log('Attempting to send form data:', formData);

    // Prepare payload
    const payload = {
      content: '📩 Nouveau Message de Contact 📩',
      embeds: [{
        title: 'Nouveau Message',
        color: 0xD4AF37, // Gold color matching site's theme
        fields: [
          { name: 'Nom', value: formData.name, inline: true },
          { name: 'Email', value: formData.email, inline: true },
          { name: 'Entreprise', value: formData.company || 'Non spécifiée', inline: true },
          { name: 'Téléphone', value: formData.phone || 'Non spécifié', inline: true },
          { name: 'Influenceur', value: formData.influencer, inline: true },
          { name: 'Budget', value: formData.budget, inline: true },
          { name: 'Message', value: formData.message }
        ]
      }]
    };

    // Detailed logging for debugging
    console.log('Transmission URL:', transmissionUrl);
    console.log('Payload:', JSON.stringify(payload));

    // Send to transmission endpoint
    const response = await fetch(transmissionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    // More detailed error handling
    if (!response.ok) {
      const errorBody = await response.text();
      logError(`Échec de l'envoi. Code erreur: ${response.status}`, {
        status: response.status,
        statusText: response.statusText,
        body: errorBody
      });
      return false;
    }

    // Success notification
    displayNotification('Message envoyé avec succès !', 'success');
    return true;

  } catch (error) {
    logError('Erreur lors de la transmission du formulaire', error);
    return false;
  }
};

// Notification System (renamed from showNotification)
const displayNotification = (message, type = 'success') => {
  // Remove any existing notifications
  const existingNotif = document.querySelector('.contact-notification');
  if (existingNotif) existingNotif.remove();

  // Create notification container
  const notification = document.createElement('div');
  notification.className = `contact-notification ${type}`;
  notification.innerHTML = `
    <div class="notification-content">${message}</div>
    <div class="notification-progress"></div>
  `;

  // Style the notification
  notification.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: ${type === 'success' ? '#D4AF37' : '#f44336'}; /* Gold/Red */
    color: white;
    padding: 15px;
    border-radius: 5px;
    z-index: 1000;
    display: flex;
    align-items: center;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    overflow: hidden;
    max-width: 90%;
    width: 350px;
  `;

  // Progress bar style
  const progressBar = notification.querySelector('.notification-progress');
  progressBar.style.cssText = `
    position: absolute;
    bottom: 0;
    left: 0;
    height: 4px;
    background-color: rgba(255,255,255,0.7);
    width: 100%;
    animation: shrinkProgress 5s linear forwards;
  `;

  // Add animation keyframes
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes shrinkProgress {
      from { width: 100%; }
      to { width: 0%; }
    }
  `;
  document.head.appendChild(styleSheet);

  // Add to body
  document.body.appendChild(notification);

  // Remove notification after 5 seconds
  setTimeout(() => {
    if (document.body.contains(notification)) {
      document.body.removeChild(notification);
    }
  }, 5000);
};

// Contact Form Event Listener
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Collect form data
      const formData = {
        name: contactForm.querySelector('#name').value.trim(),
        email: contactForm.querySelector('#email').value.trim(),
        company: contactForm.querySelector('#company')?.value.trim() || '',
        phone: contactForm.querySelector('#phone')?.value.trim() || '',
        influencer: contactForm.querySelector('#influencer').value.trim(),
        budget: contactForm.querySelector('#budget').value.trim(),
        message: contactForm.querySelector('#message').value.trim()
      };
      
      // Validate required fields
      if (!formData.name || !formData.email || !formData.message || !formData.influencer || !formData.budget) {
        displayNotification('Veuillez remplir tous les champs requis.', 'error');
        return;
      }

      const success = await transmitFormData(formData);
      
      if (success) {
        // Clear form on successful submission
        contactForm.reset();
      }
    });
  }
});

export { transmitFormData, displayNotification };
