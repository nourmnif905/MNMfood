// Sample contact messages data
const sampleContacts = [
  {
    id: 1,
    name: 'Amal Belhaj',
    email: 'amal@example.com',
    message: 'Bonjour, je voudrais savoir si vous proposez des menus végétariens? Merci d\'avance pour votre réponse.',
    date: '2025-05-02'
  },
  {
    id: 2,
    name: 'Youssef Trabelsi',
    email: 'youssef@example.com',
    message: 'Est-ce que vous acceptez les réservations pour les événements privés? Je souhaite organiser une fête d\'anniversaire pour environ 20 personnes.',
    date: '2025-05-04'
  },
  {
    id: 3,
    name: 'Nadia Mekni',
    email: 'nadia@example.com',
    message: 'Félicitations pour votre excellent service! Le repas était délicieux et le personnel très attentionné. Je reviendrai bientôt avec mes amis.',
    date: '2025-05-05'
  },
  {
    id: 4,
    name: 'Slim Fehri',
    email: 'slim@example.com',
    message: 'Pouvez-vous me donner plus d\'informations sur vos plats signatures? Je suis curieux de découvrir les spécialités de votre chef.',
    date: '2025-05-06'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  // Contacts functionality could be extended here
  // For example, adding a form to manually add contacts, etc.
});

// Function to load contacts
function loadContacts() {
  const contactCards = document.querySelector('.contact-cards');
  if (!contactCards) return;
  
  // Clear existing cards
  contactCards.innerHTML = '';
  
  // Get contacts from localStorage or use sample data if none exists
  let contacts = JSON.parse(localStorage.getItem('contacts'));
  if (!contacts || contacts.length === 0) {
    contacts = sampleContacts;
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }
  
  // Create contact cards
  contacts.forEach(contact => {
    // Format date from YYYY-MM-DD to DD/MM/YYYY
    const dateParts = contact.date.split('-');
    const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
    
    const contactCard = document.createElement('div');
    contactCard.className = 'contact-card';
    contactCard.innerHTML = `
      <div class="contact-header">
        <div class="contact-info">
          <div class="contact-name">${contact.name}</div>
          <div class="contact-email">${contact.email}</div>
        </div>
        <div class="contact-date">${formattedDate}</div>
      </div>
      <div class="contact-message">${contact.message}</div>
      <div class="contact-actions">
        <button class="action-btn reply-btn" data-id="${contact.id}">
          <i data-feather="mail"></i> Répondre
        </button>
        <button class="delete-btn" data-id="${contact.id}">
          <i data-feather="trash"></i> Supprimer
        </button>
      </div>
    `;
    
    contactCards.appendChild(contactCard);
  });
  
  // Initialize Feather icons
  feather.replace();
  
  // Add event listeners for reply and delete buttons
  const replyButtons = document.querySelectorAll('.reply-btn');
  replyButtons.forEach(button => {
    button.addEventListener('click', () => {
      const contactId = parseInt(button.dataset.id);
      replyToContact(contactId);
    });
  });
  
  const deleteButtons = document.querySelectorAll('.contact-actions .delete-btn');
  deleteButtons.forEach(button => {
    button.addEventListener('click', () => {
      const contactId = parseInt(button.dataset.id);
      deleteContact(contactId);
    });
  });
}

// Function to reply to a contact
function replyToContact(contactId) {
  const contacts = JSON.parse(localStorage.getItem('contacts')) || sampleContacts;
  const contact = contacts.find(c => c.id === contactId);
  
  if (!contact) return;
  
  // In a real application, you would open an email client or a form
  // For this demo, we'll just show a toast message
  showToast(`Envoi d'une réponse à ${contact.email}`, 'success');
  
  // You could also open a modal with a reply form here
}

// Function to delete a contact
function deleteContact(contactId) {
  let contacts = JSON.parse(localStorage.getItem('contacts')) || sampleContacts;
  
  // Filter out the contact to delete
  contacts = contacts.filter(contact => contact.id !== contactId);
  
  // Save updated array back to localStorage
  localStorage.setItem('contacts', JSON.stringify(contacts));
  
  // Show success message
  showToast('Message supprimé avec succès!', 'success');
  
  // Reload contacts display
  loadContacts();
}