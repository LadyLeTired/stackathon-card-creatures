"use strict";

const db = require("../server/db");
const { Card, Attack, Enemy, SaveGame } = require("../server/db/models");

const nameGenerator = [
  "Hollow Leviathan",
  "Rosewood Griffin",
  "Superior Anomalies",
  "Brass Satyrs",
  "Hollow Beast",
  "Matriarch Incubi",
  "Jester Halflings",
  "Roaming Wispmother",
  "Sunray Hag",
  "Jasmine Fairies",
  "Banded Goblins",
  "Den Hobgoblins"
];

const cardData = [
  {
    imageUrl: "https://i.imgur.com/epzIWTa.jpg",
    name: nameGenerator[Math.floor(Math.random() * nameGenerator.length)],
    type: "Ice",
    hp: 10,
    mp: 10,
    description: "Some description"
  },
  {
    imageUrl: "https://i.imgur.com/4Q9jwwD.jpg",
    name: nameGenerator[Math.floor(Math.random() * nameGenerator.length)],
    type: "Ice",
    hp: 10,
    mp: 10,
    description: "Some description"
  },
  {
    imageUrl: "https://i.imgur.com/IlL1ZXi.jpg",
    name: nameGenerator[Math.floor(Math.random() * nameGenerator.length)],
    type: "Ice",
    hp: 10,
    mp: 10,
    description: "Some description"
  },
  {
    imageUrl: "https://i.imgur.com/NTJ46cU.jpg",
    name: nameGenerator[Math.floor(Math.random() * nameGenerator.length)],
    type: "Ice",
    hp: 10,
    mp: 10,
    description: "Some description"
  },
  {
    imageUrl: "https://i.imgur.com/DzmhHSF.jpg",
    name: nameGenerator[Math.floor(Math.random() * nameGenerator.length)],
    type: "Ice",
    hp: 10,
    mp: 10,
    description: "Some description"
  },
  {
    imageUrl: "https://i.imgur.com/seWHPnj.jpg",
    name: nameGenerator[Math.floor(Math.random() * nameGenerator.length)],
    type: "Ice",
    hp: 10,
    mp: 10,
    description: "Some description"
  },
  {
    imageUrl: "https://i.imgur.com/fzg9G3n.jpg",
    name: nameGenerator[Math.floor(Math.random() * nameGenerator.length)],
    type: "Ice",
    hp: 10,
    mp: 10,
    description: "Some description"
  },
  {
    imageUrl: "https://i.imgur.com/3XzjCYC.jpg",
    name: nameGenerator[Math.floor(Math.random() * nameGenerator.length)],
    type: "Ice",
    hp: 10,
    mp: 10,
    description: "Some description"
  },
  {
    imageUrl:
      "http://2.bp.blogspot.com/-5jg2YKt4eak/U3VMJLOvbTI/AAAAAAAABIQ/FsRnYKFp2UM/s1600/maleficent536ad1e43b29a.jpg",
    name: nameGenerator[Math.floor(Math.random() * nameGenerator.length)],
    type: "Ice",
    hp: 10,
    mp: 10,
    description: "Some description"
  }
];
const attackData = [
  {
    name: "Fireball",
    mpCost: 2,
    element: "Fire",
    damage: 4,
    description: "Blast of fire"
  },
  {
    name: "Icebeam",
    mpCost: 2,
    element: "Ice",
    damage: 4,
    description: "Beam of Ice"
  },
  {
    name: "Gust",
    mpCost: 2,
    element: "Earth",
    damage: 4,
    description: "Strong gust of wind"
  }
];

const enemyData = [
  {
    imageUrl: "https://i.imgur.com/tTCUtxH.jpg",
    name: "The Tusked Dawn Dragon",
    type: "Ice",
    hp: 10,
    mp: 10,
    description: "A big ol' dragon"
  },
  {
    imageUrl: "https://i.imgur.com/6zuvftm.jpg",
    name: "Gravewraith",
    type: "Fire",
    hp: 8,
    mp: 2,
    description: "Doggo, probably"
  },
  {
    imageUrl: "https://i.imgur.com/QN2FJs6.png",
    name: "Gutwing Army",
    type: "Fire",
    hp: 14,
    mp: 8,
    description: "Some spooky doods"
  },
  {
    imageUrl: "https://i.imgur.com/PSTySPN.png",
    name: "Slagpest",
    type: "Fire",
    hp: 18,
    mp: 22,
    description: "Birdy"
  },
  {
    imageUrl: "https://i.imgur.com/O09MC2g.png",
    name: "Umbraflayer",
    type: "Fire",
    hp: 12,
    mp: 15,
    description: "Old dood"
  },
  {
    imageUrl: "https://i.imgur.com/URSiUPr.jpg",
    name: "The Rotten Mumbler",
    type: "Earth",
    hp: 13,
    mp: 7,
    description: "Octo-Witch-Doc"
  }
];

const saveData = [{ playerName: "Amber" }];

async function seed() {
  await db.sync({ force: true });
  console.log("db synced!");

  const [cards, attacks, enemies, saves] = await Promise.all([
    Card.bulkCreate(cardData, { returning: true }),
    Attack.bulkCreate(attackData, { returning: true }),
    Enemy.bulkCreate(enemyData, { returning: true }),
    SaveGame.bulkCreate(saveData, { returning: true })
  ]);

  await Promise.all(
    cards.map(card => {
      return card.addAttack(attacks[Math.floor(Math.random() * 3)]);
    })
  );

  await saves[0].addCards(cards);

  console.log(`seeded ${cards.length} cards`);
  console.log(`seeded ${attacks.length} attacks`);
  console.log(`seeded ${attacks.length} attacks`);
  console.log(`seeded ${enemies.length} enemies`);
  console.log(`seeded successfully`);
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
