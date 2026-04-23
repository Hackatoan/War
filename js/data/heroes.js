// Hero Database
window.GameData = window.GameData || {};

window.GameData.Heroes = {
    "warrior_recruit": {
        id: "warrior_recruit",
        name: "Recruit Warrior",
        description: "A standard frontline fighter.",
        class: "Warrior",
        cost: 100, // Gold cost in store
        baseStats: {
            hp: 100,
            maxHp: 100,
            atk: 15,
            def: 10,
            spd: 5
        }
    },
    "mage_apprentice": {
        id: "mage_apprentice",
        name: "Apprentice Mage",
        description: "Deals high damage but is fragile.",
        class: "Mage",
        cost: 150,
        baseStats: {
            hp: 60,
            maxHp: 60,
            atk: 25,
            def: 5,
            spd: 8
        }
    }
};
