// JavaScript to Handle Hamburger Toggle
const hamburgerBtn = document.getElementById('hamburgerBtn');
const menuList = document.getElementById('menuList');
const menuLinks = document.querySelectorAll('.menu-list a');

// Toggle dropdown menu
hamburgerBtn.addEventListener('click', () => {
    menuList.classList.toggle('active');
});

// Close menu when an item is clicked and allow normal navigation
menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        menuList.classList.remove('active');
    });
});

// Close menu when clicking outside
window.addEventListener('click', (e) => {
    if (!hamburgerBtn.contains(e.target) && !menuList.contains(e.target)) {
        menuList.classList.remove('active');
    }
});