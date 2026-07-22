const contactData = {
  email: 'moseleygj@gmail.com',
  phone: '+1-'
};

// Global reference tracker to manage overlapping quick clicks cleanly
let toastTimeout; 

function triggerToastNotification(message) {
  const toast = document.getElementById('copyToast');
  // Set dynamic text depending on what was copied
  toast.textContent = `⎘ ${message}`;
  
  // Clear any active timer if user clicks multiple buttons quickly
  clearTimeout(toastTimeout);
  
  // SLIDE UP: Brings the div into view instantly
  toast.style.transform = 'translateY(0)';
  
  // SLIDE DOWN: Hides the div after 2 seconds
  toastTimeout = setTimeout(() => {
    toast.style.transform = 'translateY(100%)';
  }, 2000);
}

function handleCopy(event, textToCopy, successMsg) {
  // Prevent default page refresh action
  event.preventDefault(); 

  navigator.clipboard.writeText(textToCopy)
    .then(() => {
      // Trigger the custom sticky bottom notification
      triggerToastNotification(successMsg);
    })
    .catch(err => {
      console.error('Failed to copy text: ', err);
    });
}

// Event bindings targeted directly to your HTML element IDs
document.getElementById('email').addEventListener('click', (e) => {
  handleCopy(e, contactData.email, 'Email copied!');
});

document.getElementById('phone').addEventListener('click', (e) => {
  handleCopy(e, contactData.phone, 'Phone number copied!');
});

/*Display My Behind the Screen Section */
document.getElementById('toggle-beyond-btn').addEventListener('click', function() {
  const btsSection = document.getElementById('BTS');
  
  // Toggle the active class on the button itself (for the arrow rotation)
  this.classList.toggle('active');

  // Toggle display between block and none
  if (btsSection.style.display === 'none' || btsSection.style.display === '') {
    btsSection.style.display = 'block';
    
    // Smoothly scroll down to the revealed BTS div
    setTimeout(() => {
      btsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  } else {
    btsSection.style.display = 'none';
  }
});

//in progress section
    function moveSlide(btn, direction) {
        const gallery = btn.parentElement;
        const images = gallery.querySelectorAll('img');
        let index = Array.from(images).findIndex(img => img.classList.contains('active'));
        images[index].classList.remove('active');
        index = (index + direction + images.length) % images.length;
        images[index].classList.add('active');
    }




    /**Secret sauce **/

    const art = `
      ( Hello, Stranger. I see you're 👀looking at my secret sauce... Take what you like, Enjoy! -Gordon Moseley)
     o
    .
 ^__^
 (👀\\_______
 (__)\\       )\\/\\
     ||----w |
     ||     ||
`;

    console.log(art);