import "mocha";

import * as chai from "chai";

import server from "../index";

import chaiHttp = require("chai-http");
chai.use(chaiHttp);

describe("API test", () => {
  describe("GET /currencies", () => {
    it("should return an array of currencies", done => {
      chai
        .request(server.app)
        .get("/currencies")
        .end((err, res) => {
          chai.expect(res.status).to.be.eql(200);
          chai.expect(res.body.data).to.be.an("array");
          done();
        });
    });
  });

  describe("POST /conversions", () => {
    it("should failed (500) when value property is not a number", done => {
      chai
        .request(server.app)
        .post("/conversions")
        .send({ base_currency: "USD", value: "abc", quote_currency: "EUR" })
        .end((err, res) => {
          chai.expect(res.status).to.be.eql(500);
          done();
        });
    });

    it("should failed (500) when currency is not valid", done => {
      chai
        .request(server.app)
        .post("/conversions")
        .send({ base_currency: "USDD", value: 1000, quote_currency: "EUR" })
        .end((err, res) => {
          chai.expect(res.status).to.be.eql(500);
          done();
        });
    });

    it("should failed (400) when currency not exist", done => {
      chai
        .request(server.app)
        .post("/conversions")
        .send({ base_currency: "FRA", value: 1000, quote_currency: "EUR" })
        .end((err, res) => {
          chai.expect(res.status).to.be.eql(400);
          done();
        });
    });

    it("should succeed and return a numeric value", done => {
      chai
        .request(server.app)
        .post("/conversions")
        .send({ base_currency: "USD", value: 1000, quote_currency: "EUR" })
        .end((err, res) => {
          chai.expect(res.status).to.be.eql(200);
          chai.expect(res.body.data).to.be.an("number");
          done();
        });
    });
  });
});
