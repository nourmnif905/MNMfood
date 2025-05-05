// Sample reservations data
const sampleReservations = [
  {
    id: 1,
    firstName: 'Mohamed',
    lastName: 'Ben Ali',
    email: 'mohamed@example.com',
    phone: '+216 93458712',
    date: '2025-05-10',
    time: '19:30',
    people: 4
  },
  {
    id: 2,
    firstName: 'Sonia',
    lastName: 'Tarhouni',
    email: 'sonia@example.com',
    phone: '+216 27896541',
    date: '2025-05-12',
    time: '20:00',
    people: 2
  },
  {
    id: 3,
    firstName: 'Karim',
    lastName: 'Maatoug',
    email: 'karim@example.com',
    phone: '+216 58741236',
    date: '2025-05-15',
    time: '21:00',
    people: 6
  },
  {
    id: 4,
    firstName: 'Leila',
    lastName: 'Gharbi',
    email: 'leila@example.com',
    phone: '+216 96325874',
    date: '2025-05-17',
    time: '18:45',
    people: 3
  },
  {
    id: 5,
    firstName: 'Ahmed',
    lastName: 'Zouari',
    email: 'ahmed@example.com',
    phone: '+216 21547896',
    date: '2025-05-20',
    time: '20:30',
    people: 5
  }
];

document.addEventListener('DOMContentLoaded', () => {
  // Reservations search functionality
  const searchInput = document.getElementById('reservation-search');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const searchTerm = searchInput.value.toLowerCase();
      filterReservations(searchTerm);
    });
  }
  
  // Date filter functionality
  const dateFilter = document.getElementById('date-filter');
  if (dateFilter) {
    dateFilter.addEventListener('change', () => {
      const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
      filterReservations(searchTerm);
    });
  }
  
  // Reset filters button
  const resetButton = document.getElementById('reset-filters');
  if (resetButton) {
    resetButton.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      if (dateFilter) dateFilter.value = '';
      loadReservations();
    });
  }
});

// Function to load reservations
function loadReservations() {
  const reservationsTable = document.getElementById('reservations-table');
  if (!reservationsTable) return;
  
  const tableBody = reservationsTable.querySelector('tbody');
  
  // Clear existing rows
  tableBody.innerHTML = '';
  
  // Get reservations from localStorage or use sample data if none exists
  let reservations = JSON.parse(localStorage.getItem('reservations'));
  if (!reservations || reservations.length === 0) {
    reservations = sampleReservations;
    localStorage.setItem('reservations', JSON.stringify(reservations));
  }
  
  // Create table rows
  reservations.forEach(reservation => {
    const row = document.createElement('tr');
    
    // Format date from YYYY-MM-DD to DD/MM/YYYY
    const dateParts = reservation.date.split('-');
    const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
    
    row.innerHTML = `
      <td>${reservation.lastName}</td>
      <td>${reservation.firstName}</td>
      <td>${reservation.email}</td>
      <td>${reservation.phone}</td>
      <td>${formattedDate}</td>
      <td>${reservation.time}</td>
      <td>${reservation.people}</td>
      <td>
        <div class="action-buttons">
          <button class="action-btn small" title="Confirmer" data-id="${reservation.id}" data-action="confirm">
            <i data-feather="check"></i>
          </button>
          <button class="delete-btn small" title="Annuler" data-id="${reservation.id}" data-action="delete">
            <i data-feather="x"></i>
          </button>
        </div>
      </td>
    `;
    
    tableBody.appendChild(row);
  });
  
  // Initialize Feather icons
  feather.replace();
  
  // Add event listeners for action buttons
  const actionButtons = document.querySelectorAll('.action-buttons button');
  actionButtons.forEach(button => {
    button.addEventListener('click', () => {
      const reservationId = parseInt(button.dataset.id);
      const action = button.dataset.action;
      
      if (action === 'confirm') {
        confirmReservation(reservationId);
      } else if (action === 'delete') {
        deleteReservation(reservationId);
      }
    });
  });
  
  // Add CSS for small buttons
  const style = document.createElement('style');
  style.textContent = `
    .action-buttons {
      display: flex;
      gap: 8px;
    }
    
    .action-btn.small, .delete-btn.small {
      padding: 6px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `;
  document.head.appendChild(style);
}

// Function to filter reservations
function filterReservations(searchTerm) {
  const reservationsTable = document.getElementById('reservations-table');
  if (!reservationsTable) return;
  
  const tableBody = reservationsTable.querySelector('tbody');
  const dateFilter = document.getElementById('date-filter');
  const dateValue = dateFilter ? dateFilter.value : '';
  
  // Clear existing rows
  tableBody.innerHTML = '';
  
  // Get reservations from localStorage
  let reservations = JSON.parse(localStorage.getItem('reservations')) || sampleReservations;
  
  // Filter based on search term and date
  const filteredReservations = reservations.filter(reservation => {
    const matchesSearch = !searchTerm || 
                         reservation.firstName.toLowerCase().includes(searchTerm) ||
                         reservation.lastName.toLowerCase().includes(searchTerm) ||
                         reservation.email.toLowerCase().includes(searchTerm) ||
                         reservation.phone.includes(searchTerm);
                         
    const matchesDate = !dateValue || reservation.date === dateValue;
    
    return matchesSearch && matchesDate;
  });
  
  // If no results found
  if (filteredReservations.length === 0) {
    const emptyRow = document.createElement('tr');
    emptyRow.innerHTML = `
      <td colspan="8" class="text-center">Aucune réservation trouvée</td>
    `;
    tableBody.appendChild(emptyRow);
    return;
  }
  
  // Create table rows for filtered results
  filteredReservations.forEach(reservation => {
    const row = document.createElement('tr');
    
    // Format date from YYYY-MM-DD to DD/MM/YYYY
    const dateParts = reservation.date.split('-');
    const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
    
    row.innerHTML = `
      <td>${reservation.lastName}</td>
      <td>${reservation.firstName}</td>
      <td>${reservation.email}</td>
      <td>${reservation.phone}</td>
      <td>${formattedDate}</td>
      <td>${reservation.time}</td>
      <td>${reservation.people}</td>
      <td>
        <div class="action-buttons">
          <button class="action-btn small" title="Confirmer" data-id="${reservation.id}" data-action="confirm">
            <i data-feather="check"></i>
          </button>
          <button class="delete-btn small" title="Annuler" data-id="${reservation.id}" data-action="delete">
            <i data-feather="x"></i>
          </button>
        </div>
      </td>
    `;
    
    tableBody.appendChild(row);
  });
  
  // Initialize Feather icons
  feather.replace();
  
  // Re-add event listeners
  const actionButtons = document.querySelectorAll('.action-buttons button');
  actionButtons.forEach(button => {
    button.addEventListener('click', () => {
      const reservationId = parseInt(button.dataset.id);
      const action = button.dataset.action;
      
      if (action === 'confirm') {
        confirmReservation(reservationId);
      } else if (action === 'delete') {
        deleteReservation(reservationId);
      }
    });
  });
}

// Function to confirm a reservation
function confirmReservation(reservationId) {
  showToast('Réservation confirmée avec succès!', 'success');
  
  // In a real application, you would update the status in the database
  // For now, we'll just indicate success
}

// Function to delete a reservation
function deleteReservation(reservationId) {
  let reservations = JSON.parse(localStorage.getItem('reservations')) || sampleReservations;
  
  // Filter out the item to delete
  reservations = reservations.filter(reservation => reservation.id !== reservationId);
  
  // Save updated array back to localStorage
  localStorage.setItem('reservations', JSON.stringify(reservations));
  
  // Show success message
  showToast('Réservation annulée avec succès!', 'success');
  
  // Reload reservations display
  loadReservations();
}