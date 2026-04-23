// Monster Database
window.GameData = window.GameData || {};

window.GameData.Monsters = {
    "slime_green": {
        id: "slime_green",
        name: "Green Slime",
        description: "A gooey, weak monster.",
        level: 1,
        rewards: { exp: 10, gold: 5, itemDropChance: 0.1, dropPool: ["potion_health"] },
        baseStats: {
            hp: 30,
            maxHp: 30,
            atk: 5,
            def: 2,
            spd: 3
        }
    },
    "goblin_scout": {
        id: "goblin_scout",
        name: "Goblin Scout",
        description: "Fast but relatively weak.",
        level: 2,
        rewards: { exp: 25, gold: 15, itemDropChance: 0.2, dropPool: ["sword_iron"] },
        baseStats: {
            hp: 50,
            maxHp: 50,
            atk: 10,
            def: 5,
            spd: 12
        }
    }
};
