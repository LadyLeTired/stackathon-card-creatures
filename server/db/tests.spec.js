const chai = require("chai");
const { expect } = require("chai");
const request = require("supertest");
const db = require("./models");
const chaiAsPromised = require("chai-as-promised");
const app = require("../../index");
// const { cardData, enemyData, saveData } = require("./testData");

chai.use(chaiAsPromised);

const Card = db.Card;
const Enemy = db.Enemy;
const SaveGame = db.SaveGame;

const testData = {
  cardData: [
    {
      id: 1,
      imageUrl:
        "http://2.bp.blogspot.com/-5jg2YKt4eak/U3VMJLOvbTI/AAAAAAAABIQ/FsRnYKFp2UM/s1600/maleficent536ad1e43b29a.jpg",
      name: "Test Creature1",
      type: "Ice",
      hp: 10,
      mp: 10,
      description: "Some description"
    },
    {
      id: 2,
      imageUrl:
        "http://2.bp.blogspot.com/-5jg2YKt4eak/U3VMJLOvbTI/AAAAAAAABIQ/FsRnYKFp2UM/s1600/maleficent536ad1e43b29a.jpg",
      name: "Test Creature2",
      type: "Ice",
      hp: 10,
      mp: 10,
      description: "Some description"
    },
    {
      id: 3,
      imageUrl:
        "http://2.bp.blogspot.com/-5jg2YKt4eak/U3VMJLOvbTI/AAAAAAAABIQ/FsRnYKFp2UM/s1600/maleficent536ad1e43b29a.jpg",
      name: "Test Creature3",
      type: "Ice",
      hp: 10,
      mp: 10,
      description: "Some description"
    }
  ],
  saveData: [
    {
      id: 1,
      playerName: "Amber"
    },
    {
      id: 2,
      playerName: "Nolan"
    },
    {
      id: 3,
      playerName: "Dobbin"
    }
  ],
  enemyData: [
    {
      id: 1,
      imageUrl: "https://i.imgur.com/tTCUtxH.jpg",
      name: "The Tusked Dawn Dragon",
      type: "Ice",
      hp: 10,
      mp: 10,
      description: "A big ol' dragon"
    },
    {
      id: 2,
      imageUrl: "https://i.imgur.com/6zuvftm.jpg",
      name: "Gravewraith",
      type: "Fire",
      hp: 8,
      mp: 2,
      description: "Doggo, probably"
    },
    {
      id: 3,
      imageUrl: "https://i.imgur.com/QN2FJs6.png",
      name: "Gutwing Army",
      type: "Fire",
      hp: 14,
      mp: 8,
      description: "Some spooky doods"
    }
  ]
};

describe("Sequelize Models", () => {
  describe("Card Model", () => {
    // Mocha handles asynchronous actions, like Card.sync below. So, no need for async/await or .then! Woop!
    before("Synchronize the model", () => Card.sync({ force: true }));

    // Truncating data in a table is a bit less cumbersome than dropping/recreating it.
    beforeEach("Truncate data", () => Card.truncate());

    it('requires a "name" string', async () => {
      await expect(Card.create()).to.be.rejected;
      await expect(Card.create({ name: "" })).to.be.rejected;
      await expect(Card.create({ name: [1, 2, 3] })).to.be.rejected;
    });
    it("requires HP/MP to be provided as an integer", async () => {
      await expect(Card.create()).to.be.rejected;
      await expect(Card.create({ hp: "", mp: [1, 2, 3] })).to.be.rejected;
      await expect(Card.create({ name: "Test Card", hp: "Health" })).to.be
        .rejected;
      await expect(Card.create({ name: "Test Card", hp: 10, mp: 10 })).to.be
        .fulfilled;
    });
    it('expects "imageUrl" field to be a URL string if supplied', async () => {
      const card = Card.build({ name: "Test Card", hp: 10, mp: 10 });
      await expect(card.save()).to.be.fulfilled; // image url is optional
      card.imageUrl = ["this array is not a string"];
      await expect(card.save()).to.be.rejected;
      card.imageUrl = "this string is not a URL";
      await expect(card.save()).to.be.rejected;
    });
  });

  describe("SaveGame Model", () => {
    before("Synchronize the model", () => SaveGame.sync({ force: true }));
    beforeEach("Truncate data", () => SaveGame.truncate());

    it('requires a "playerName" string', async () => {
      await expect(SaveGame.create()).to.be.rejected;
      await expect(SaveGame.create({ name: "" })).to.be.rejected;
      await expect(SaveGame.create({ name: [1, 2, 3] })).to.be.rejected;
    });
    it("can have a player's cards associated with it", async () => {
      await expect(SaveGame.create()).to.be.rejected;

      const newSave = await SaveGame.create({ playerName: "Amber" });
      const testCard = {
        imageUrl: "https://i.imgur.com/URSiUPr.jpg",
        name: "The Rotten Mumbler",
        type: "Earth",
        hp: 13,
        mp: 7,
        description: "Octo-Witch-Doc"
      };
      const syncedCard = await Card.create(testCard);
      await expect(newSave.addCard(syncedCard)).to.be.fulfilled;
    });
  });

  describe("Enemies Model", () => {
    before("Synchronize the model", () => Enemy.sync({ force: true }));
    beforeEach("Truncate data", () => Enemy.truncate());

    it('requires a "name" string', async () => {
      await expect(Enemy.create()).to.be.rejected;
      await expect(Enemy.create({ name: "" })).to.be.rejected;
      await expect(Enemy.create({ name: [1, 2, 3] })).to.be.rejected;
    });
    it("type may only be 'Fire', 'Ice', 'Earth', or 'Cypher'", async () => {
      await expect(Enemy.create()).to.be.rejected;
      await expect(
        Enemy.create({ name: "Test Enemy", hp: 10, mp: 10, type: "Wind" })
      ).to.be.rejected;
      await expect(
        Enemy.create({ name: "Test Enemy", hp: 10, mp: 10, type: "Fire" })
      ).to.be.fulfilled;
    });
  });
});

describe("Express Routes", () => {
  describe("/api/cards/", () => {
    beforeEach(() => Card.sync({ force: true }));
    beforeEach(() => Card.bulkCreate(testData.cardData, { returning: true }));

    it("GET /api/cards - returns all cards", async () => {
      const res = await request(app)
        .get("/api/cards")
        .expect(200);
      expect(res.body).to.be.an("array");
      expect(res.body[0].name).to.be.equal("Test Creature1");
    });

    it("GET /api/cards/:id - returns a particular card by ID", async () => {
      const res = await request(app)
        .get("/api/cards/2")
        .expect(200);

      expect(res.body).to.be.an("object");
      expect(res.body.name).to.be.equal("Test Creature2");
    });
  });

  describe("/api/enemies/", () => {
    beforeEach(() => Enemy.sync({ force: true }));
    beforeEach(() => Enemy.bulkCreate(testData.enemyData, { returning: true }));

    it("GET /api/enemies - returns all enemies", async () => {
      const res = await request(app)
        .get("/api/enemies")
        .expect(200);
      expect(res.body).to.be.an("array");
      expect(res.body[0].name).to.be.equal("The Tusked Dawn Dragon");
    });

    it("GET /api/enemies/:id - returns a particular enemy by ID", async () => {
      const res = await request(app)
        .get("/api/enemies/1")
        .expect(200);

      expect(res.body).to.be.an("object");
      expect(res.body.name).to.be.equal("The Tusked Dawn Dragon");
    });
  });

  describe("/api/saves/", () => {
    beforeEach(() => SaveGame.sync({ force: true }));
    beforeEach(() =>
      SaveGame.bulkCreate(testData.saveData, { returning: true })
    );

    it("GET /api/saves - returns all saves", async () => {
      const res = await request(app)
        .get("/api/saves")
        .expect(200);
      expect(res.body).to.be.an("array");
      expect(res.body[0].playerName).to.be.equal("Amber");
    });

    it("GET /api/saves/:id - returns a particular save by ID", async () => {
      const res = await request(app)
        .get("/api/saves/3")
        .expect(200);

      expect(res.body).to.be.an("object");
      expect(res.body.playerName).to.be.equal("Dobbin");
    });
  });

  describe("error handling", () => {
    it("responds with a 404 if route isn't found", async () => {
      await request(app)
        .get("/blah")
        .expect(404);
    });
  });
});
