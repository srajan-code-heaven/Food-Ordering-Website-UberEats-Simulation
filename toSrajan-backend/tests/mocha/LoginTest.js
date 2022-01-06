const assert = require("chai").assert;
const index = require("../../index");
const chai = require("chai");
chai.use(require("chai-http"));
const expect = require("chai").expect;
const agent = require("chai").request.agent(index);

describe("UberEats", function () {
  describe("Customer Login Tests", function () {
    it("should return 'invalid credentails' when the username password combination is wrong", () => {
      agent
        .post("/login/customer/login")
        .send({ email: "ghanashri@gmail.com", password: "passsssword" })
        .then(function (res) {
          expect(res.body.message).to.equal("Invalid credentials");
        })
        .catch((error) => {
          assert.fail("An error occured. Please check the logs");
        });
    });

    it("should return 'user not found' when the user is not present", () => {
      agent
        .post("/login/customer/login")
        .send({ email: "random@gmail.com", password: "password" })
        .then(function (res) {
          expect(res.body.message).to.equal("User not found");
        })
        .catch((error) => {
          assert.fail("An error occured. Please check the logs")
        });
    });

    it("should return user details when the username and password are correct", () => {
      agent
        .post("/login/customer/login")
        .send({ email: "chessghanashri@gmail.com", password: "Password" })
        .then(function (res) {
          expect(res.body.EmailId).to.equal('chessghanashri@gmail.com');
        })
        .catch((error) => {
          assert.fail("An error occured. Please check the logs")
        });
    });
  });   

  describe("Restaurant Login Tests", function () {
    it("should return 'invalid credentails' when the username password combination is wrong", () => {
      agent
        .post("/login/restaurant/login")
        .send({ email: "biergarten@gmail.com", password: "password" })
        .then(function (res) {
          expect(res.body.message).to.equal("Invalid credentials");
        })
        .catch((error) => {
          assert.fail("An error occured. Please check the logs");
        });
    });

    it("should return 'user not found' when the user is not present", () => {
      agent
        .post("/login/restaurant/login")
        .send({ email: "random@gmail.com", password: "password" })
        .then(function (res) {
          expect(res.body.message).to.equal("User not found");
        })
        .catch((error) => {
          assert.fail("An error occured. Please check the logs")
        });
    });

    it("should return user details when the username and password are correct", () => {
      agent
        .post("/login/restaurant/login")
        .send({ email: "ginger@sjsu.edu", password: "Password" })
        .then(function (res) {
          expect(res.body.EmailId).to.equal('ginger@sjsu.edu');
        })
        .catch((error) => {
          assert.fail("An error occured. Please check the logs")
        });
    });
  });   
});
