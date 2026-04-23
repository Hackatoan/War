class CombatEngine {
    constructor() {
        this.logs = [];
    }

    log(msg, type = "normal") {
        this.logs.push({ msg, type });
        if (window.UIRenderer) {
            window.UIRenderer.renderBattleLog(this.logs);
        }
    }

    clearLogs() {
        this.logs = [];
        if (window.UIRenderer) {
            window.UIRenderer.renderBattleLog(this.logs);
        }
    }

    startBattle(player, monsterId) {
        this.clearLogs();
        if (!window.GameData || !window.GameData.Monsters[monsterId]) {
            this.log("Error: Monster not found.");
            return;
        }

        const team = player.getAliveTeam();
        if (team.length === 0) {
            this.log("Your team is wiped out! Rest at base first.", "log-damage");
            return;
        }

        // Create monster instance
        const monster = JSON.parse(JSON.stringify(window.GameData.Monsters[monsterId]));
        this.log(`Battle started against ${monster.name}!`, "log-victory");

        // Simple Auto-Battle Logic for MVP
        let turn = 1;
        while (team.some(h => h.baseStats.hp > 0) && monster.baseStats.hp > 0 && turn < 20) {
            this.log(`--- Turn ${turn} ---`);

            // Player attacks
            for (let hero of team) {
                if (hero.baseStats.hp <= 0) continue;
                if (monster.baseStats.hp <= 0) break;

                // Simple damage formula
                let damage = Math.max(1, hero.baseStats.atk - monster.baseStats.def);
                monster.baseStats.hp -= damage;
                this.log(`${hero.name} attacks ${monster.name} for ${damage} damage.`, "log-attack");
            }

            // Monster attacks
            if (monster.baseStats.hp > 0) {
                // Pick random alive hero
                let aliveHeroes = team.filter(h => h.baseStats.hp > 0);
                if (aliveHeroes.length > 0) {
                    let target = aliveHeroes[Math.floor(Math.random() * aliveHeroes.length)];
                    let damage = Math.max(1, monster.baseStats.atk - target.baseStats.def);
                    target.baseStats.hp -= damage;
                    this.log(`${monster.name} attacks ${target.name} for ${damage} damage.`, "log-damage");

                    if (target.baseStats.hp <= 0) {
                        this.log(`${target.name} has fallen!`, "log-damage");
                    }
                }
            }
            turn++;
        }

        // Battle Resolution
        if (monster.baseStats.hp <= 0) {
            this.log(`You defeated the ${monster.name}!`, "log-victory");

            // Rewards
            let rewards = monster.rewards;
            player.addGold(rewards.gold);
            this.log(`Found ${rewards.gold} Gold.`, "log-victory");

            // Item drop
            if (Math.random() < rewards.itemDropChance && rewards.dropPool.length > 0) {
                let droppedItem = rewards.dropPool[Math.floor(Math.random() * rewards.dropPool.length)];
                player.addItem(droppedItem);
                let itemName = window.GameData.Items[droppedItem].name;
                this.log(`Enemy dropped: ${itemName}!`, "log-victory");
            }
        } else if (team.every(h => h.baseStats.hp <= 0)) {
            this.log(`Your team was defeated...`, "log-damage");
        } else {
            this.log(`Battle dragged on too long. You fled.`);
        }

        // Update UI
        if (window.UIRenderer) {
            window.UIRenderer.renderStats();
            window.UIRenderer.renderTeam();
        }
    }
}

window.CombatEngine = CombatEngine;
