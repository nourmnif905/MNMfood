document.addEventListener('DOMContentLoaded', () => {
  // Contact info form submission
  const contactInfoForm = document.getElementById('contact-info-form');
  if (contactInfoForm) {
    contactInfoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form data
      const address = document.getElementById('address').value;
      const phone = document.getElementById('phone').value;
      const email = document.getElementById('email').value;
      
      // In a real application, you would send this data to a server
      // For now, we'll just show a success message
      showToast('Les coordonnées ont été mises à jour avec succès!', 'success');
      
      // Save to localStorage for demo purposes
      const contactInfo = { address, phone, email };
      localStorage.setItem('contactInfo', JSON.stringify(contactInfo));
    });
  }
  
  // Site settings form submission
  const siteSettingsForm = document.getElementById('site-settings-form');
  if (siteSettingsForm) {
    siteSettingsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form data
      const siteName = document.getElementById('site-name').value;
      const openingHours = document.getElementById('opening-hours').value;
      const themeColor = document.getElementById('theme-color').value;
      
      // Update primary color in the CSS variables
      document.documentElement.style.setProperty('--primary-color', themeColor);
      document.documentElement.style.setProperty('--primary-dark', adjustColor(themeColor, -20));
      document.documentElement.style.setProperty('--primary-light', adjustColor(themeColor, 20));
      
      // In a real application, you would send this data to a server
      // For now, we'll just show a success message
      showToast('Les paramètres du site ont été mis à jour avec succès!', 'success');
      
      // Save to localStorage for demo purposes
      const siteSettings = { siteName, openingHours, themeColor };
      localStorage.setItem('siteSettings', JSON.stringify(siteSettings));
      
      // Update page title
      document.title = `${siteName} | Admin Dashboard`;
    });
  }
  
  // Load saved data from localStorage if available
  loadSavedConfig();
});

// Function to load saved configuration
function loadSavedConfig() {
  // Load contact info
  const savedContactInfo = localStorage.getItem('contactInfo');
  if (savedContactInfo) {
    const { address, phone, email } = JSON.parse(savedContactInfo);
    
    const addressInput = document.getElementById('address');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    
    if (addressInput) addressInput.value = address;
    if (phoneInput) phoneInput.value = phone;
    if (emailInput) emailInput.value = email;
  }
  
  // Load site settings
  const savedSiteSettings = localStorage.getItem('siteSettings');
  if (savedSiteSettings) {
    const { siteName, openingHours, themeColor } = JSON.parse(savedSiteSettings);
    
    const siteNameInput = document.getElementById('site-name');
    const openingHoursInput = document.getElementById('opening-hours');
    const themeColorInput = document.getElementById('theme-color');
    
    if (siteNameInput) siteNameInput.value = siteName;
    if (openingHoursInput) openingHoursInput.value = openingHours;
    if (themeColorInput) themeColorInput.value = themeColor;
    
    // Update CSS variables
    document.documentElement.style.setProperty('--primary-color', themeColor);
    document.documentElement.style.setProperty('--primary-dark', adjustColor(themeColor, -20));
    document.documentElement.style.setProperty('--primary-light', adjustColor(themeColor, 20));
    
    // Update page title
    document.title = `${siteName} | Admin Dashboard`;
  }
}

// Function to adjust color brightness
function adjustColor(color, amount) {
  return '#' + color.replace(/^#/, '').replace(/../g, color => 
    ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2)
  );
}