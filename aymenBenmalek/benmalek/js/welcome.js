// Welcome Screen Logic
let hasExplored = false;

document.getElementById('exploreBtn').addEventListener('click', function() {
    if (hasExplored) return;
    hasExplored = true;

    const welcomeScreen = document.getElementById('welcome');
    const caveTransition = document.getElementById('caveTransition');
    const navButtons = document.querySelector('.nav-buttons');
    const sectionIndicator = document.querySelector('.section-indicator');

    // Hide welcome screen
    welcomeScreen.classList.add('descending');
    caveTransition.classList.add('active');

    // // Start cave transition animation
    // setTimeout(() => {
    //     caveTransition.classList.add('active');
    // }, 500);

    // After animation completes
    setTimeout(() => {
        // Remove welcome screen
        welcomeScreen.style.display = 'none';

        // Enable body scroll
        document.body.classList.add('exploring');

        // Show navigation
        navButtons.classList.add('active');
        sectionIndicator.classList.add('active');

        // Remove cave transition
        caveTransition.classList.remove('active');
        setTimeout(() => {
            caveTransition.style.display = 'none';
        }, 500);

        // Show first section
        showSection(0);
    }, 3000);
});