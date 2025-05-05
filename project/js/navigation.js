document.addEventListener('DOMContentLoaded', () => {
  // Navigation functionality
  const sidebarItems = document.querySelectorAll('.sidebar-menu li');
  const sections = document.querySelectorAll('.content-section');
  const quickButtons = document.querySelectorAll('.quick-btn');
  const toggleSidebarBtn = document.getElementById('toggle-sidebar');
  const sidebar = document.querySelector('.sidebar');

  // Function to navigate to a section
  function navigateTo(targetId) {
    // Hide all sections
    sections.forEach(section => {
      section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.classList.add('active');
    }
    
    // Update active state in sidebar
    sidebarItems.forEach(item => {
      if (item.dataset.target === targetId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
    
    // On mobile, close sidebar after navigation
    if (window.innerWidth <= 768) {
      sidebar.classList.remove('active');
    }
  }

  // Sidebar navigation
  sidebarItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetId = item.dataset.target;
      navigateTo(targetId);
    });
  });
  
  // Quick access buttons navigation
  quickButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.dataset.target;
      navigateTo(targetId);
    });
  });

  // Toggle sidebar on mobile
  toggleSidebarBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
  });

  // Close sidebar when clicking outside on mobile
  document.addEventListener('click', (event) => {
    if (window.innerWidth <= 768) {
      const isClickInside = sidebar.contains(event.target) || 
                           toggleSidebarBtn.contains(event.target);
                           
      if (!isClickInside && sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
      }
    }
  });
  
  // Responsive handling
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      sidebar.classList.remove('active');
    }
  });
});