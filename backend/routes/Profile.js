const router = require("express").Router();
const Restaurants = require("../model/Restaurants");
const Customers = require("../model/Customers");
const mongoose = require('mongoose');
const { checkAuth } = require("../utils/passport");

router.post("/restaurant/:id", checkAuth, async (req, res) => {

    const restaurantId = mongoose.Types.ObjectId(req.params.id);
    let restaurant = await Restaurants.findOne({RestaurantId:restaurantId});
    if (!restaurant) {
        return res.status(400).send("Restaurant not found");
    }

    payload = {
        RestaurantName:req.body.name,
        RestaurantDesc: req.body.desc ,
        PhoneNumber:req.body.phone ,
        Mode: req.body.mode,
        Country: req.body.country,
        State: req.body.state,
        City: req.body.city,
        Pincode: req.body.pincode,
        ImageUrl: req.body.imageUrl,
        WorkHrsFrom: req.body.fromHrs,
        WorkHrsTo: req.body.toHrs
    }
    console.log("payload is");
    console.log(payload);

    await Restaurants.findOneAndUpdate({ RestaurantId: restaurantId }, payload,{returnNewDocument:true}, function (err, updateRestaurant) {
        if (err) return res.send(500, { error: err });
        let result = {
            userType:'restaurant',
            id: restaurantId,
            name : payload.RestaurantName,
            phone: payload.PhoneNumber,
            state: payload.State,
            pinCode: payload.Pincode,
            desc: payload.RestaurantDesc,
            fromHrs: payload.WorkHrsFrom,
            toHrs: payload.WorkHrsTo,
            country: payload.Country,
            city: payload.City,
            Mode: payload.Mode,
            image: payload.ImageUrl
        }
        return res.status(200).send(result);
    });
});

router.post('/restaurant/favorite/:id', checkAuth, async(req,res)=>{
    const restaurantId = mongoose.Types.ObjectId(req.params.id);
    let restaurant = await Restaurants.findOne({RestaurantId:restaurantId});
    payload = {
        IsFavorite: req.body.isFavorite
    }
    if (!restaurant) {
        return res.status(400).send("Restaurant not found");
    }
    Restaurants.findOneAndUpdate({ RestaurantId: restaurantId }, payload,{returnNewDocument:true}, function (err, updateRestaurant) {
        if (err) return res.send(500, { error: err });
        let result = {
            message : 'updated',
            updateRestaurant: {...updateRestaurant}
        }
        return res.status(200).send(result);
    });
});

router.get("/restaurant/:id", checkAuth, async (req, res) => {
    
    const restaurantId = mongoose.Types.ObjectId(req.params.id);
    const restaurant = await Restaurants.findOne({RestaurantId:restaurantId});
    res.status(200).send(restaurant);
});

router.get("/customer/:id", async (req, res) => {
    
    const customerId = mongoose.Types.ObjectId(req.params.id);
    const customer = await Customers.findOne({CustomerId:customerId});
    res.status(200).send(customer);
});

router.post("/customer/:id", checkAuth, async (req, res) => {
    
    const customerId = mongoose.Types.ObjectId(req.params.id);
    let customer = await Customers.findOne({CustomerId:customerId});
    if (!customer) {
        return res.status(400).send("Customer not found");
    }

    payload = {
        CustomerName:req.body.name,
        NickName: req.body.nickname ,
        PhoneNumber:req.body.phone ,
        DateOfBirth: req.body.dob,
        Country: req.body.country,
        State: req.body.state,
        City: req.body.city,
        Pincode: req.body.pincode,
        ImageUrl: req.body.imageUrl,
        Street: req.body.street
    }

    Customers.findOneAndUpdate({ CustomerId: customerId }, payload,{returnNewDocument:true}, function (err, updateCustomer) {
        if (err) return res.send(500, { error: err });
        let result = {
            userType:'customer',
            id: customerId,
            name : payload.CustomerName,
            phone: payload.PhoneNumber,
            dob: payload.DateOfBirth,
            state: payload.State,
            pinCode: payload.Pincode,
            nickname: payload.NickName,
            dateOfBirth: payload.DateOfBirth,
            country: payload.Country,
            city: payload.City,
            street: payload.Street,
            image: payload.ImageUrl
        }
        return res.status(200).send(result);
    });
});


module.exports = router;