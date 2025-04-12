const navItems = document.querySelectorAll('.nav-item');
const content = document.getElementById('content');

// Tab content simulation
const tabContent = {
  home: "<h1>Home</h1><p>This is the home screen.</p>",
  search: "<h1>Search</h1><p>Find people and content here.</p>",
  reels: "<h1>Reels</h1><p>Watch short videos.</p>",
  shop: "<h1>Shop</h1><p>Explore trending products.</p>",
  profile: "<h1>Profile</h1><p>Your profile details.</p>"
};

navItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();

    // Remove 'active' from all
    navItems.forEach(nav => nav.classList.remove('active'));

    // Add 'active' to clicked
    item.classList.add('active');

    // Load corresponding content
    const tab = item.getAttribute('data-tab');

    window.location.href = `${tab}.html`;
  });
});

