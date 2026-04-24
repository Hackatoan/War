// Main Application Logic

document.addEventListener('DOMContentLoaded', () => {
    // --- UI Elements ---
    const loginScreen = document.getElementById('login-screen');
    const gameScreen = document.getElementById('game-screen');

    const btnLoginGoogle = document.getElementById('btn-login-google');
    const btnLoginEmail = document.getElementById('btn-login-email');
    const btnLogout = document.getElementById('btn-logout');

    const navButtons = document.querySelectorAll('.nav-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    // --- State ---
    let isLoggedIn = false;

    // --- Authentication (Mock) ---
    function login(method) {
        console.log(`Logging in via ${method}...`);
        isLoggedIn = true;

        // Hide login, show game
        loginScreen.classList.add('hidden');
        gameScreen.classList.remove('hidden');

        // Initialize Game Engine (will be called here later)
        if (window.GameEngine) {
            window.GameEngine.init();
        }
    }

    function logout() {
        console.log("Logging out...");
        isLoggedIn = false;

        // Hide game, show login
        gameScreen.classList.add('hidden');
        loginScreen.classList.remove('hidden');
    }

    // --- Navigation ---
    function switchTab(targetTabId) {
        // Update nav buttons
        navButtons.forEach(btn => {
            if (btn.dataset.tab === targetTabId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Update tab content
        tabContents.forEach(tab => {
            if (tab.id === targetTabId) {
                tab.classList.remove('hidden');
            } else {
                tab.classList.add('hidden');
            }
        });

        // Trigger render update if renderer exists
        if (window.UIRenderer) {
            window.UIRenderer.renderTab(targetTabId);
        }
    }

    // --- Event Listeners ---
    btnLoginGoogle.addEventListener('click', () => login('Google'));
    btnLoginEmail.addEventListener('click', () => login('Email'));
    btnLogout.addEventListener('click', logout);

    navButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            switchTab(e.target.dataset.tab);
        });
    });

    console.log("App initialized.");
});
