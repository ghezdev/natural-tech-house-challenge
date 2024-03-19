import request from "supertest";
import {
  getPokemonByNameDetailedRes,
  getPokemonsByNameRes,
  getPokemonsByTypeRes,
  getPokemonsPageTwoByTypeRes,
  getPokemonsPageTwoRes,
  getPokemonsRes,
} from "../mocks/pokemon";
import app from "../../src/index";

describe("GET /api/pokemon", () => {
  test("Should return 200 and valid response", async () => {
    const res = await request(app)
      .get("/api/pokemon")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect(getPokemonsRes);
  });

  test("Should return 200 and valid response if name param is set", async () => {
    const res = await request(app)
      .get("/api/pokemon?name=charmander")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect(getPokemonsByNameRes);
  });

  test("Should return 200 and valid response if type param is set", async () => {
    const res = await request(app)
      .get("/api/pokemon?type=fire")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect(getPokemonsByTypeRes);
  });

  test("Should return 200 and valid response if type and page param is set", async () => {
    const res = await request(app)
      .get("/api/pokemon?type=fire&page=2")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect(getPokemonsPageTwoByTypeRes);
  });

  test("Should return 200 and valid response if page param is set", async () => {
    const res = await request(app)
      .get("/api/pokemon?page=2")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect(getPokemonsPageTwoRes);
  });

  test("Should return 404 and returns empty array when name pokemon is not found", async () => {
    const res = await request(app)
      .get("/api/pokemon?name=test")
      .expect("Content-Type", /json/)
      .expect(404)
      .expect({ message: "Pokemon not found", context: "Not Found" });
  });
});

describe("GET /api/pokemon/:name", () => {
  test("Should return 200 and valid response", async () => {
    const res = await request(app)
      .get("/api/pokemon/charmander")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect(getPokemonByNameDetailedRes);
  });
});

