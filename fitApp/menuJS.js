/**  <!-- JavaScript to Handle Hamburger Toggle --> **/
        const hamburgerBtn = document.getElementById('hamburgerBtn');
        const menuList = document.getElementById('menuList');
        const menuLinks = document.querySelectorAll('.menu-list a');
        const sectionTitle = document.getElementById('sectionTitle');

        // Toggle dropdown menu
        hamburgerBtn.addEventListener('click', () => {
            menuList.classList.toggle('active');
        });

        // Close menu and update text when an item is clicked
        menuLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                menuList.classList.remove('active');
                sectionTitle.textContent = link.textContent.trim();
            });
        });

        // Close menu when clicking outside
        window.addEventListener('click', (e) => {
            if (!hamburgerBtn.contains(e.target) && !menuList.contains(e.target)) {
                menuList.classList.remove('active');
            }
        });
