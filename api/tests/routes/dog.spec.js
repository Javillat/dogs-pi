/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Dog, conn } = require("../../src/db.js");

const agent = session(app);
const dog = {
  name: "Pug",
};

describe("Dog rutas", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    Dog.sync({ force: true }).then(() =>
      Dog.create({
        id: "BD-30",
        name: "Brida",
        minheight: 2,
        maxheight: 5,
        minweight: 4,
        maxweight: 7,
      })
    )
  );
  describe("GET /dogs", async () => {
   await it("Debe devolver 200", () => agent.get("/dogs").expect(200));
  });

  describe("POST /dogs", async () => {
    const objeto = {
      tempid: [4,10,5],
      name: "Doggy",
      minheight: 22,
      maxheight: 55,
      minweight: 4,
      maxweight: 7,
      image:"",
      origin:"Salvadorean",
      life_span:40
    };
    await it("Agregar datos a la bd y devolver 201",()=> agent.post("/dogs").send(objeto).expect(201));
  });
});
