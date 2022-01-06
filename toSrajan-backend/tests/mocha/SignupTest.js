const assert = require("chai").assert;
const index = require("../../index");
const chai = require("chai");
chai.use(require("chai-http"));
const expect = require("chai").expect;
const agent = require("chai").request.agent(index);

describe("Customer Sign Up", function () {
    it("should return user already exists when the email id is already existing", () => {
      agent
        .post("/signup/customer/signup")
        .send({
          email: "chessghanashri@gmail.com",
          password: "Password",
          name: "ghanashri",
        })
        .then(function (res) {
          expect(res.body.message).to.equal("Email Id is already registered");
        })
        .catch((error) => {
           assert.fail("An error occured. Please check the logs");
        });
    });

    it("should return new user details when the registration is successfull", () => {
     let email = Math.random().toString(36).substr(2, 5);
     agent
        .post("/signup/customer/signup")
        .send({
          email: email,
          password: "password",
          name: "new user",
        })
        .then(function (res) {
          expect(res.body.EmailId).to.equal(email);
          expect(res.body.RestaurantId).to.not.equal(null);
        })
        .catch((error) => {
           assert.fail("An error occured. Please check the logs");
        });
    });
});

describe("Restaurant Sign Up", function () {
    it("should return user already exists when the email id is already existing", () => {
      agent
        .post("/signup/restaurant/signup")
        .send({
          email: "ginger@sjsu.edu",
          password: "Password",
          name: "ghanashri",
        })
        .then(function (res) {
          expect(res.body.message).to.equal("Email Id is already registered");
        })
        .catch((error) => {
           assert.fail("An error occured. Please check the logs");
        });
    });

    it("should return new user details when the registration is successfull", () => {
     let email = Math.random().toString(36).substr(2, 5);
     agent
        .post("/signup/restaurant/signup")
        .send({
          email: email,
          password: "password",
          name: "new user",
        })
        .then(function (res) {
          expect(res.body.EmailId).to.equal(email);
          expect(res.body.RestaurantId).to.not.equal(null);
        })
        .catch((error) => {
           assert.fail("An error occured. Please check the logs");
        });
    });
});
