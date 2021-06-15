"use strict";

const request = require("supertest");

const db = require("../db.js");
const app = require("../app");
const User = require("../models/user");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** GET /users/:username */

describe("GET /users/:username", function () {
  test("works for users own page", async function () {
    const resp = await request(app)
      .get(`/users/u1`)
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.body).toEqual({
      user: {
        username: "u1",
        firstName: "U1F",
        lastName: "U1L",
        email: "user1@user.com",
        isAdmin: false,
        watchlist: ["aapl"],
      },
    });
  });

  test("unauth for wrong user", async function () {
    const resp = await request(app)
      .get(`/users/u2`)
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("unauth for anon", async function () {
    const resp = await request(app).get(`/users/u1`);
    expect(resp.statusCode).toEqual(401);
  });
});

/************************************** PATCH /users/:username */

describe("PATCH /users/:username", () => {
  test("works for users own page", async function () {
    const resp = await request(app)
      .patch(`/users/u1`)
      .send({
        firstName: "New",
      })
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.body).toEqual({
      user: {
        username: "u1",
        firstName: "New",
        lastName: "U1L",
        email: "user1@user.com",
        isAdmin: false,
        watchlist: ["aapl"],
      },
    });
  });

  test("unauth for wrong user", async function () {
    const resp = await request(app)
      .patch(`/users/u2`)
      .send({
        firstName: "New",
      })
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("unauth for anon", async function () {
    const resp = await request(app).patch(`/users/u1`).send({
      firstName: "New",
    });
    expect(resp.statusCode).toEqual(401);
  });

  test("bad request if invalid data", async function () {
    const resp = await request(app)
      .patch(`/users/u1`)
      .send({
        firstName: 42,
      })
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(400);
  });
});

/************************************** DELETE /users/:username */

describe("DELETE /users/:username", function () {
  test("works for users own page", async function () {
    const resp = await request(app)
      .delete(`/users/u1`)
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.body).toEqual({ deleted: "u1" });
  });

  test("unauth for wrong user", async function () {
    const resp = await request(app)
      .delete(`/users/u2`)
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("unauth for anon", async function () {
    const resp = await request(app).delete(`/users/u1`);
    expect(resp.statusCode).toEqual(401);
  });
});

/**************************************** add to Watchlist / POST /users/:username/watchlist/:ticker *******/

describe("POST /users/:username/watchlist/:ticker", () => {
  test("add ticker to users watchlist", async function () {
    const resp = await request(app)
      .post(`/users/u1/watchlist/tsla`)
      .set("authorization", `Bearer ${u1Token}`);

    expect(resp.body).toEqual({ added: "tsla" });
  });

  test("ticker should be in users watchlist", async function () {
    //add aapl to users watchlist
    await request(app)
      .post(`/users/u1/watchlist/tsla`)
      .set("authorization", `Bearer ${u1Token}`);

    const resp = await request(app)
      .get(`/users/u1/`)
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.body).toEqual({
      user: {
        username: "u1",
        firstName: "U1F",
        lastName: "U1L",
        email: "user1@user.com",
        isAdmin: false,
        watchlist: ["aapl", "tsla"],
      },
    });
  });

  test("responds with status code 400 and duplicate ticker if ticker is already in watchlist", async function () {
    await request(app)
      .post(`/users/u1/watchlist/aapl`)
      .set("authorization", `Bearer ${u1Token}`);
    const resp = await request(app)
      .post(`/users/u1/watchlist/aapl`)
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(400);
    expect(resp.body.error.message).toEqual("Duplicate ticker: u1, aapl");
  });
});

/**************************************** Delete from Watchlist / DELETE /users/:username/watchlist/:ticker *******/
describe("DELETE /users/:username/watchlist/:ticker", () => {
  test("deletes ticker from users watchlist", async function () {
    const resp = await request(app)
      .delete(`/users/u1/watchlist/aapl`)
      .set("authorization", `Bearer ${u1Token}`);

    expect(resp.body).toEqual({ deleted: { ticker: "aapl" } });
    const resp2 = await request(app)
      .get(`/users/u1/`)
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp2.body).toEqual({
      user: {
        username: "u1",
        firstName: "U1F",
        lastName: "U1L",
        email: "user1@user.com",
        isAdmin: false,
        watchlist: [],
      },
    });
  });
});
