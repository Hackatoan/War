class Player {
    constructor() {
        this.gold = 250; // Starting gold
        this.inventory = {}; // item_id: count
        this.team = []; // Array of hero objects

        // Give starting hero
        this.addHero("warrior_recruit");
        this.addItem("potion_health", 3);
    }

    addHero(heroId) {
        if (window.GameData && window.GameData.Heroes[heroId]) {
            // Deep copy to allow individual leveling/damage
            const heroData = JSON.parse(JSON.stringify(window.GameData.Heroes[heroId]));
            // Add unique ID for instance
            heroData.instanceId = 'hero_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
            this.team.push(heroData);
            return true;
        }
        return false;
    }

    addItem(itemId, amount = 1) {
        if (this.inventory[itemId]) {
            this.inventory[itemId] += amount;
        } else {
            this.inventory[itemId] = amount;
        }
    }

    removeItem(itemId, amount = 1) {
        if (this.inventory[itemId] && this.inventory[itemId] >= amount) {
            this.inventory[itemId] -= amount;
            if (this.inventory[itemId] === 0) {
                delete this.inventory[itemId];
            }
            return true;
        }
        return false;
    }

    addGold(amount) {
        this.gold += amount;
    }

    spendGold(amount) {
        if (this.gold >= amount) {
            this.gold -= amount;
            return true;
        }
        return false;
    }

    getAliveTeam() {
        return this.team.filter(hero => hero.baseStats.hp > 0);
    }
}

window.Player = Player;
