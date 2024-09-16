document.addEventListener('DOMContentLoaded', function() {
  const menuButtons = document.querySelectorAll('.menu-btn');
  const submenuLinks = document.querySelectorAll('.submenu a');
  const videoPlayer = document.getElementById('video-player');
  const readingContents = document.querySelectorAll('.reading-content');

  menuButtons.forEach(button => {
      button.addEventListener('click', function() {
          const submenu = this.nextElementSibling;

          if (submenu.classList.contains('submenu-active')) {
              submenu.classList.remove('submenu-active');
          } else {
              submenu.classList.add('submenu-active');
          }
      });
  });

  submenuLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default link behavior
        const contentType = this.getAttribute('data-type');

        // Hide all reading sections before displaying the correct one
        readingContents.forEach(content => content.style.display = 'none');
        videoPlayer.style.display = 'none'; // Hide video as well

        if (contentType === 'video') {
            const videoSrc = this.getAttribute('data-video');
            videoPlayer.src = videoSrc;
            videoPlayer.style.display = 'block'; // Show video
            videoPlayer.play();
        } else if (contentType === 'text') {
            const readingId = this.getAttribute('data-reading'); // Get the reading ID
            document.getElementById(readingId).style.display = 'block'; // Show the selected reading section
        }
    });
});
});