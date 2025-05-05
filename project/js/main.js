// Initialize feather icons
document.addEventListener('DOMContentLoaded', () => {
  feather.replace();
  
  // Initialize data
  loadAllData();
});

// Function to load all data
function loadAllData() {
  loadMenuItems();
  loadReservations();
  loadContacts();
}

// Toast notification function
function showToast(message, type = 'success') {
  // Create toast element
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <div class="toast-content">
      <i data-feather="${type === 'success' ? 'check-circle' : 'alert-circle'}"></i>
      <span>${message}</span>
    </div>
    <button class="toast-close">
      <i data-feather="x"></i>
    </button>
  `;
  
  // Append to body
  document.body.appendChild(toast);
  
  // Replace feather icons
  feather.replace();
  
  // Add close functionality
  const closeBtn = toast.querySelector('.toast-close');
  closeBtn.addEventListener('click', () => {
    toast.classList.add('toast-hiding');
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  });
  
  // Auto close after 3 seconds
  setTimeout(() => {
    if (document.body.contains(toast)) {
      toast.classList.add('toast-hiding');
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 300);
    }
  }, 3000);
  
  // Show with animation
  setTimeout(() => {
    toast.classList.add('toast-visible');
  }, 10);
}

// Add CSS for toast
const style = document.createElement('style');
style.textContent = `
  .toast {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 300px;
    transform: translateY(100px);
    opacity: 0;
    transition: all 0.3s ease;
    z-index: 1000;
  }
  
  .toast.success {
    border-left: 4px solid var(--success-color);
  }
  
  .toast.error {
    border-left: 4px solid var(--danger-color);
  }
  
  .toast-content {
    display: flex;
    align-items: center;
  }
  
  .toast-content i {
    margin-right: 12px;
  }
  
  .toast.success .toast-content i {
    color: var(--success-color);
  }
  
  .toast.error .toast-content i {
    color: var(--danger-color);
  }
  
  .toast-close {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--text-light);
  }
  
  .toast-visible {
    transform: translateY(0);
    opacity: 1;
  }
  
  .toast-hiding {
    transform: translateY(10px);
    opacity: 0;
  }
`;
document.head.appendChild(style);