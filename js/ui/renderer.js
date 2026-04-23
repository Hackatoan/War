class UIRenderer {
    constructor() {
        this.game = null;
        this.elements = {
            gold: document.getElementById('stat-gold'),
            inventoryList: document.getElementById('inventory-list'),
            teamList: document.getElementById('team-list'),
            monsterList: document.getElementById('monster-list'),
            storeList: document.getElementById('store-list'),
            battleLog: document.getElementById('battle-log')
        };
    }

    init(gameEngine) {
        this.game = gameEngine;
    }

    renderAll() {
        this.renderStats();
        this.renderBase();
        this.renderTeam();
        this.renderBattleTab();
        this.renderStore();
    }

    renderTab(tabId) {
        if (!this.game) return;
        switch(tabId) {
            case 'tab-base': this.renderBase(); break;
            case 'tab-team': this.renderTeam(); break;
            case 'tab-battle': this.renderBattleTab(); break;
            case 'tab-store': this.renderStore(); break;
        }
        this.renderStats();
    }

    renderStats() {
        if (!this.game || !this.game.player) return;
        this.elements.gold.textContent = `Gold: ${this.game.player.gold}`;
    }

    renderBase() {
        if (!this.game || !this.game.player) return;

        let invHtml = '<div class="card-list">';
        invHtml += '<h4>Inventory</h4>';

        const inventory = this.game.player.inventory;
        let hasItems = false;

        for (const [itemId, count] of Object.entries(inventory)) {
            const itemDef = window.GameData.Items[itemId];
            if (itemDef) {
                hasItems = true;
                invHtml += `
                    <div class="card">
                        <div class="card-info">
                            <h4>${itemDef.name} x${count}</h4>
                            <p>${itemDef.description}</p>
                        </div>
                    </div>
                `;
            }
        }

        if (!hasItems) {
            invHtml += '<p>Your inventory is empty.</p>';
        }

        invHtml += '</div>';
        this.elements.inventoryList.innerHTML = invHtml;
    }

    renderTeam() {
        if (!this.game || !this.game.player) return;

        let teamHtml = '<div class="card-list">';
        const team = this.game.player.team;

        if (team.length === 0) {
            teamHtml += '<p>You have no heroes. Visit the store!</p>';
        } else {
            team.forEach(hero => {
                const hpPercent = Math.max(0, (hero.baseStats.hp / hero.baseStats.maxHp) * 100);
                const isDead = hero.baseStats.hp <= 0;
                teamHtml += `
                    <div class="card" style="${isDead ? 'opacity: 0.5;' : ''}">
                        <div class="card-info" style="width: 100%">
                            <h4>${hero.name} <small>(${hero.class})</small></h4>
                            <p>HP: ${hero.baseStats.hp}/${hero.baseStats.maxHp} | ATK: ${hero.baseStats.atk} | DEF: ${hero.baseStats.def}</p>
                            <div style="background-color: #333; height: 5px; width: 100%; margin-top: 5px;">
                                <div style="background-color: ${isDead ? '#c0392b' : '#4cd137'}; height: 100%; width: ${hpPercent}%"></div>
                            </div>
                        </div>
                    </div>
                `;
            });
        }
        teamHtml += '</div>';
        this.elements.teamList.innerHTML = teamHtml;
    }

    renderBattleTab() {
        if (!this.game) return;

        let monsterHtml = '<div class="card-list">';
        const monsters = window.GameData.Monsters;

        for (const [monsterId, monsterDef] of Object.entries(monsters)) {
            monsterHtml += `
                <div class="card">
                    <div class="card-info">
                        <h4>${monsterDef.name} <small>(Lvl ${monsterDef.level})</small></h4>
                        <p>HP: ${monsterDef.baseStats.maxHp} | ATK: ${monsterDef.baseStats.atk}</p>
                    </div>
                    <button class="btn secondary small" onclick="window.GameEngine.combat.startBattle(window.GameEngine.player, '${monsterId}')">Fight</button>
                </div>
            `;
        }
        monsterHtml += '</div>';
        this.elements.monsterList.innerHTML = monsterHtml;
    }

    renderBattleLog(logs) {
        if (logs.length > 0) {
            this.elements.battleLog.classList.remove('hidden');
            let logHtml = '';
            logs.forEach(log => {
                logHtml += `<div class="log-entry ${log.type}">${log.msg}</div>`;
            });
            this.elements.battleLog.innerHTML = logHtml;
            // Auto scroll to bottom
            this.elements.battleLog.scrollTop = this.elements.battleLog.scrollHeight;
        } else {
            this.elements.battleLog.classList.add('hidden');
            this.elements.battleLog.innerHTML = '';
        }
    }

    renderStore() {
        if (!this.game) return;

        let storeHtml = '<div class="card-list">';
        storeHtml += '<h4>Heroes for Hire</h4>';

        const heroes = window.GameData.Heroes;
        for (const [heroId, heroDef] of Object.entries(heroes)) {
            storeHtml += `
                <div class="card">
                    <div class="card-info">
                        <h4>${heroDef.name} <small>(${heroDef.class})</small></h4>
                        <p>Cost: ${heroDef.cost} Gold</p>
                    </div>
                    <button class="btn primary small" onclick="window.buyHero('${heroId}')">Recruit</button>
                </div>
            `;
        }

        storeHtml += '</div>';
        this.elements.storeList.innerHTML = storeHtml;
    }
}

window.UIRenderer = new UIRenderer();

// Global helper for store UI
window.buyHero = function(heroId) {
    if (!window.GameEngine || !window.GameEngine.player) return;

    const heroDef = window.GameData.Heroes[heroId];
    if (heroDef && window.GameEngine.player.gold >= heroDef.cost) {
        window.GameEngine.player.spendGold(heroDef.cost);
        window.GameEngine.player.addHero(heroId);
        window.UIRenderer.renderAll();
        alert(`Successfully recruited ${heroDef.name}!`);
    } else {
        alert("Not enough gold!");
    }
}
