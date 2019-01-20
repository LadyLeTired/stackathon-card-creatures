"use strict";

const db = require("../server/db");
const { Card, Attack } = require("../server/db/models");

const cardData = [
  {
    creatureImageUrl:
      "http://2.bp.blogspot.com/-5jg2YKt4eak/U3VMJLOvbTI/AAAAAAAABIQ/FsRnYKFp2UM/s1600/maleficent536ad1e43b29a.jpg",
    creatureName: "Test Creature1",
    creatureType: "Ice",
    hp: 10,
    mp: 10,
    description: "Some description"
  },
  {
    creatureImageUrl:
      "http://2.bp.blogspot.com/-5jg2YKt4eak/U3VMJLOvbTI/AAAAAAAABIQ/FsRnYKFp2UM/s1600/maleficent536ad1e43b29a.jpg",
    creatureName: "Test Creature2",
    creatureType: "Ice",
    hp: 10,
    mp: 10,
    description: "Some description"
  },
  {
    creatureImageUrl:
      "http://2.bp.blogspot.com/-5jg2YKt4eak/U3VMJLOvbTI/AAAAAAAABIQ/FsRnYKFp2UM/s1600/maleficent536ad1e43b29a.jpg",
    creatureName: "Test Creature3",
    creatureType: "Ice",
    hp: 10,
    mp: 10,
    description: "Some description"
  },
  {
    creatureImageUrl:
      "http://2.bp.blogspot.com/-5jg2YKt4eak/U3VMJLOvbTI/AAAAAAAABIQ/FsRnYKFp2UM/s1600/maleficent536ad1e43b29a.jpg",
    creatureName: "Test Creature4",
    creatureType: "Ice",
    hp: 10,
    mp: 10,
    description: "Some description"
  },
  {
    creatureImageUrl:
      "http://2.bp.blogspot.com/-5jg2YKt4eak/U3VMJLOvbTI/AAAAAAAABIQ/FsRnYKFp2UM/s1600/maleficent536ad1e43b29a.jpg",
    creatureName: "Test Creature5",
    creatureType: "Ice",
    hp: 10,
    mp: 10,
    description: "Some description"
  },
  {
    creatureImageUrl:
      "http://2.bp.blogspot.com/-5jg2YKt4eak/U3VMJLOvbTI/AAAAAAAABIQ/FsRnYKFp2UM/s1600/maleficent536ad1e43b29a.jpg",
    creatureName: "Test Creature6",
    creatureType: "Ice",
    hp: 10,
    mp: 10,
    description: "Some description"
  },
  {
    creatureImageUrl:
      "http://2.bp.blogspot.com/-5jg2YKt4eak/U3VMJLOvbTI/AAAAAAAABIQ/FsRnYKFp2UM/s1600/maleficent536ad1e43b29a.jpg",
    creatureName: "Test Creature7",
    creatureType: "Ice",
    hp: 10,
    mp: 10,
    description: "Some description"
  },
  {
    creatureImageUrl:
      "http://2.bp.blogspot.com/-5jg2YKt4eak/U3VMJLOvbTI/AAAAAAAABIQ/FsRnYKFp2UM/s1600/maleficent536ad1e43b29a.jpg",
    creatureName: "Test Creature8",
    creatureType: "Ice",
    hp: 10,
    mp: 10,
    description: "Some description"
  },
  {
    creatureImageUrl:
      "http://2.bp.blogspot.com/-5jg2YKt4eak/U3VMJLOvbTI/AAAAAAAABIQ/FsRnYKFp2UM/s1600/maleficent536ad1e43b29a.jpg",
    creatureName: "Test Creature9",
    creatureType: "Ice",
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

async function seed() {
  await db.sync({ force: true });
  console.log("db synced!");

  const [cards, attacks] = await Promise.all([
    Card.bulkCreate(cardData, { returning: true }),
    Attack.bulkCreate(attackData, { returning: true })
  ]);

  await Promise.all(
    cards.map(card => {
      return card.addAttack(attacks[Math.floor(Math.random() * 3)]);
    })
  );

  console.log(`seeded ${cards.length} cards`);
  console.log(`seeded ${attacks.length} attacks`);
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
