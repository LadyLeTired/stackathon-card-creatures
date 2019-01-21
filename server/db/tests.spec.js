const chai = require("chai");
const { expect } = require("chai");
const db = require("./models");
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

const Card = db.Card;
const Enemy = db.Enemy;
const SaveGame = db.SaveGame;

describe("Card Model", () => {
  // Mocha handles asynchronous actions, like Card.sync below. So, no need for async/await or .then! Woop!
  before("Synchronize the model", () => Card.sync({ force: true }));

  // Truncating data in a table is a bit less cumbersome than dropping/recreating it.
  beforeEach("Truncate data", () => Card.truncate());

  describe("Schema", () => {
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
});

describe("SaveGame Model", () => {
  before("Synchronize the model", () => SaveGame.sync({ force: true }));

  beforeEach("Truncate data", () => SaveGame.truncate());

  describe("Schema", () => {
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
});
