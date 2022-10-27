/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Dog, conn } = require("../../src/db.js");

const agent = session(app);
const dog = {
  name: "Pug",
};

describe("Dogs routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    Dog.sync({ force: true }).then(() =>
      Dog.create({
        id:"BD-12",
        name: "Brida",
        minheight: 2,
        maxheight: 5,
        minweight: 4,
        maxweight: 7,
      })
    )
  );
  describe("GET /dogs", () => {
    it("should get 200", () => agent.get("/dogs").expect(200));
  });
});
