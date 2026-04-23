class GameEngine {
    constructor() {
        this.player = null;
        this.combat = null;
    }

    init() {
        console.log("Initializing Game Engine...");
        this.player = new window.Player();
        this.combat = new window.CombatEngine();

        // Initial Render
        if (window.UIRenderer) {
            window.UIRenderer.init(this);
            window.UIRenderer.renderAll();
        }
    }
}

window.GameEngine = new GameEngine();
