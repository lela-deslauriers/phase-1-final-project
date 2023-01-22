let aboutDisplayed = false;

document.addEventListener("DOMContentLoaded", () => {
    const aboutButton = document.querySelector('#about-me-btn');
    const aboutContainer = document.querySelector('.container');
    
    aboutButton.addEventListener('click', () => {
        aboutDisplayed = !aboutDisplayed;
        if (aboutDisplayed) {
            aboutContainer.style.display = "block";
        } else {
            aboutContainer.style.display = "none";
        }
    })


});
