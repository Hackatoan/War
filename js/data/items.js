// Item Database
window.GameData = window.GameData || {};

window.GameData.Items = {
    "potion_health": {
        id: "potion_health",
        name: "Health Potion",
        description: "Restores 50 HP.",
        type: "consumable",
        value: 20,
        effect: { stat: "hp", amount: 50 }
    },
    "sword_iron": {
        id: "sword_iron",
        name: "Iron Sword",
        description: "A basic iron sword. +5 Attack.",
        type: "equipment",
        slot: "weapon",
        value: 100,
        stats: { atk: 5 }
    },
    "shield_wood": {
        id: "shield_wood",
        name: "Wooden Shield",
        description: "A simple wooden shield. +3 Defense.",
        type: "equipment",
        slot: "offhand",
        value: 75,
        stats: { def: 3 }
    }
};
