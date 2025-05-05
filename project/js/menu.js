// Sample menu items data
const sampleMenuItems = [
  {
    id: 1,
    name: 'Couscous Royal',
    price: 25,
    category: 'plat',
    description: 'Couscous traditionnel avec agneau, poulet, merguez, légumes de saison et pois chiches.',
    image: 'https://images.pexels.com/photos/5409010/pexels-photo-5409010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 2,
    name: 'Salade Tunisienne',
    price: 12,
    category: 'entree',
    description: 'Tomates, concombres, poivrons, oignons, olives, thon et œufs, assaisonnés à l\'huile d\'olive et au citron.',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 3,
    name: 'Baklava',
    price: 8,
    category: 'dessert',
    description: 'Pâtisserie traditionnelle à base de pâte filo, de noix et de sirop de miel.',
    image: 'https://images.pexels.com/photos/5946642/pexels-photo-5946642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 4,
    name: 'Tajine aux Pruneaux',
    price: 22,
    category: 'plat',
    description: 'Tajine d\'agneau aux pruneaux et amandes, parfumé aux épices orientales.',
    image: 'https://images.pexels.com/photos/6419736/pexels-photo-6419736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 5,
    name: 'Thé à la Menthe',
    price: 4,
    category: 'boisson',
    description: 'Thé vert à la menthe fraîche et au sucre, servi dans un verre traditionnel.',
    image: 'https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 6,
    name: 'Brick à l\'Œuf',
    price: 7,
    category: 'entree',
    description: 'Feuille de brick croustillante garnie d\'un œuf, de thon, de câpres et de persil.',
    image: 'https://images.pexels.com/photos/9397950/pexels-photo-9397950.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  // Menu management functionality
  const addMenuForm = document.getElementById('add-menu-form');
  if (addMenuForm) {
    addMenuForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form data
      const name = document.getElementById('menu-name').value;
      const price = document.getElementById('menu-price').value;
      const category = document.getElementById('menu-category').value;
      const description = document.getElementById('menu-description').value;
      const imageUrl = document.getElementById('menu-image').value || 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
      
      // Validate
      if (!name || !price) {
        showToast('Veuillez remplir tous les champs obligatoires', 'error');
        return;
      }
      
      // Create new menu item
      const newMenuItem = {
        id: Date.now(), // Unique ID based on timestamp
        name,
        price: parseFloat(price),
        category,
        description,
        image: imageUrl
      };
      
      // Get existing menu items
      let menuItems = JSON.parse(localStorage.getItem('menuItems')) || [];
      
      // Add new item
      menuItems.push(newMenuItem);
      
      // Save to localStorage
      localStorage.setItem('menuItems', JSON.stringify(menuItems));
      
      // Show success message
      showToast('Élément ajouté au menu avec succès!', 'success');
      
      // Reset form
      addMenuForm.reset();
      
      // Reload menu items display
      loadMenuItems();
    });
  }
  
  // Handle file upload preview
  const menuImageUpload = document.getElementById('menu-image-upload');
  const menuImageInput = document.getElementById('menu-image');
  
  if (menuImageUpload && menuImageInput) {
    menuImageUpload.addEventListener('change', function() {
      if (this.files && this.files[0]) {
        // In a real app, you would upload the file to a server and get back a URL
        // For this demo, we'll just pretend and use a placeholder
        menuImageInput.value = 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
        showToast('Image téléchargée (simulation)', 'success');
      }
    });
  }
});

// Function to load menu items
function loadMenuItems() {
  const menuItemsList = document.querySelector('.menu-items-list');
  if (!menuItemsList) return;
  
  // Clear existing items
  menuItemsList.innerHTML = '';
  
  // Get items from localStorage or use sample data if none exists
  let menuItems = JSON.parse(localStorage.getItem('menuItems'));
  if (!menuItems || menuItems.length === 0) {
    menuItems = sampleMenuItems;
    localStorage.setItem('menuItems', JSON.stringify(menuItems));
  }
  
  // Create menu item cards
  menuItems.forEach(item => {
    const categoryLabels = {
      entree: 'Entrée',
      plat: 'Plat Principal',
      dessert: 'Dessert',
      boisson: 'Boisson'
    };
    
    const itemCard = document.createElement('div');
    itemCard.className = 'menu-item-card';
    itemCard.innerHTML = `
      <div class="menu-item-image" style="background-image: url('${item.image}')"></div>
      <div class="menu-item-details">
        <div class="menu-item-header">
          <h3>${item.name}</h3>
          <span class="menu-item-price">${item.price.toFixed(2)} DT</span>
        </div>
        <div class="menu-item-category">${categoryLabels[item.category] || item.category}</div>
        <div class="menu-item-description">${item.description}</div>
        <div class="menu-actions">
          <button class="action-btn edit-menu-btn" data-id="${item.id}">
            <i data-feather="edit"></i> Modifier
          </button>
          <button class="delete-btn delete-menu-btn" data-id="${item.id}">
            <i data-feather="trash"></i> Supprimer
          </button>
        </div>
      </div>
    `;
    
    menuItemsList.appendChild(itemCard);
  });
  
  // Initialize Feather icons
  feather.replace();
  
  // Add event listeners for edit and delete buttons
  const deleteButtons = document.querySelectorAll('.delete-menu-btn');
  deleteButtons.forEach(button => {
    button.addEventListener('click', () => {
      const itemId = parseInt(button.dataset.id);
      deleteMenuItem(itemId);
    });
  });
}

// Function to delete a menu item
function deleteMenuItem(itemId) {
  let menuItems = JSON.parse(localStorage.getItem('menuItems')) || [];
  
  // Filter out the item to delete
  menuItems = menuItems.filter(item => item.id !== itemId);
  
  // Save updated array back to localStorage
  localStorage.setItem('menuItems', JSON.stringify(menuItems));
  
  // Show success message
  showToast('Élément supprimé du menu avec succès!', 'success');
  
  // Reload menu items display
  loadMenuItems();
}