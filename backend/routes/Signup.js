const router = require('express').Router();
const { v4: uuidv4 } = require('uuid')
const Customers = require('../model/Customers');
const Restaurants = require('../model/Restaurants');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = 'CMPE273UBEREATS';
const { checkAuth } = require("../utils/passport");

router.post('/customer/signup', async(req,res)=>{
    const payload = {
        EmailId: req.body.EmailId,
        CustomerName: req.body.CustomerName,
        CustomerPassword: req.body.CustomerPassword,
        DateOfBirth: '',
        PhoneNumber: '',
        NickName: '',
        Country: '',
        Street: '',
        City: '',
        ImageUrl: '',
        Pincode: '',
        State: '',
        Address: [],
    }
    try {
        let customer = await Customers.findOne({ EmailId: payload.EmailId });
        if (customer) {
            return res.status(400).send('Email Id is already registered');
        }
        payload.CustomerPassword = await bcrypt.hash(req.body.CustomerPassword, 10);
        customer = new Customers({ ...payload});
        const savedCustomer = await customer.save();
        if (savedCustomer) {
            const payload = { ...savedCustomer };
            console.log(payload);
            let result = {
                userType:'customer',
                id : savedCustomer.CustomerId,
                CustomerId: savedCustomer.CustomerId,
                email : savedCustomer.EmailId,
                name : savedCustomer.CustomerName,
                country : savedCustomer.Country,
                city : savedCustomer.City,
                originalCustomerData: {...savedCustomer}
            }
            const token = await jwt.sign(result, secret, {
                expiresIn: 1000000,
            });
            res.setHeader('token', 'jwt ' + token);
            res.status(200).send(result);
        }
    }  catch (error) {
        console.log(error)
        res.status(400).send(error);
    }
});

router.post('/restaurant/signup', async (req, res) => {
    const payload = {
        EmailId: req.body.EmailId,
        RestaurantName: req.body.RestaurantName,
        RestaurantPassword: req.body.RestaurantPassword,
        Country: req.body.Country,
        RestaurantDesc: '',
        Mode: '',
        PhoneNumber: '',
        WorkHrsFrom: '',
        WorkHrsTo: '',
        City: req.body.City,
        ImageUrl: '',
        Pincode: '',
        State: '',
        IsFavorite: false,
        Dishes: [],
    }
    try {
        let restaurant = await Restaurants.findOne({ EmailId: payload.EmailId });
        if (restaurant) {
            return res.status(400).send('Email Id is already registered');
        }
        payload.RestaurantPassword = await bcrypt.hash(req.body.RestaurantPassword, 10);
        restaurant = new Restaurants({ ...payload });
        const savedRestaurant = await restaurant.save();
        console.log('savedRestaurant is');
        console.log(savedRestaurant);
        if (savedRestaurant) {
            const payload = { ...savedRestaurant };
            let result = {
                userType:'restaurant',
                id: savedRestaurant.RestaurantId,
                RestaurantId: savedRestaurant.RestaurantId,
                email : savedRestaurant.EmailId,
                name : savedRestaurant.RestaurantName,
                country : savedRestaurant.Country,
                city : savedRestaurant.City,
                originalRestaurantData: {...savedRestaurant}
            }
            const token = await jwt.sign(result, secret, {
                expiresIn: 1000000,
            });
            res.setHeader('token', 'jwt ' + token);
            res.status(200).send(result);
        }
    } catch (error) {
        console.log(error)
        res.status(400).send(error);
    }
});

module.exports = router;
