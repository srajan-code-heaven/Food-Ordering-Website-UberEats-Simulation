const router = require("express").Router();
const Customers = require("../model/Customers");
const mongoose = require('mongoose');
const { checkAuth } = require("../utils/passport");

router.post('/address', checkAuth, async(req,res) => {
    const customerId = mongoose.Types.ObjectId(req.body.CustomerId);
    payload = {
        CustomerId: req.body.CustomerId,
        AddressLine1: req.body.AddressLine1,
        AddressLine2: req.body.AddressLine2,
        City: req.body.City,
        State: req.body.State,
        PinCode: req.body.PinCode,
        Country: req.body.Country,
        SaveAsName: req.body.SaveAsName,
    }
    let customer = await Customers.findOne({CustomerId:customerId});
    if (!customer) {
        return res.status(400).send("Customer not found");
    }

    payload.CustomerId = customerId;
    customer.Address.push(payload);
    let response = await customer.save();
    updatedCustomer = response.toObject();
    delete updatedCustomer.RestaurantPassword;
    res.status(200).send(updatedCustomer.Address);

});

router.get('/address/:id/all', checkAuth, async(req,res) => {
    let customerId = mongoose.Types.ObjectId(req.params.id);
    const customer = await Customers.findOne({CustomerId: customerId});
    res.status(200).send(customer.Address);
});

module.exports = router;