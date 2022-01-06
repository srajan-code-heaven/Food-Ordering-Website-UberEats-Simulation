const router = require('express').Router();
const Customers = require('../model/Customers');
const Restaurants = require('../model/Restaurants');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = 'CMPE273UBEREATS';
const { checkAuth } = require("../utils/passport");

router.post('/customer/login', async (req, res) => {

    const EmailId = req.body.EmailId;
    const CustomerPassword = req.body.CustomerPassword;

    let customer = await Customers.findOne({ EmailId: EmailId });
    if (!customer) {
        return res.status(400).send({ message: 'Customer not found' });
    }
    const isValid = await bcrypt.compare(
        CustomerPassword,
        customer.CustomerPassword
    );
    if (isValid) {
        let customerObject = customer.toObject();
        delete customerObject.CustomerPassword;
        let result = {
            userType:'customer',
            id : customerObject.CustomerId,
            CustomerId: customerObject.CustomerId,
            email : customerObject.EmailId,
            name : customerObject.CustomerName,
            phone : customerObject.PhoneNumber,
            state : customerObject.State,
            pinCode : customerObject.Pincode,
            dob : customerObject.DateOfBirth,
            nickname : customerObject.NickName,
            country : customerObject.Country,
            city : customerObject.City,
            street: customerObject.Street,
            image: customerObject.ImageUrl,
            originalCustomerData: {...customerObject}
        }
        const token = await jwt.sign(result, secret, {
            expiresIn: 1000000,
        });
        res.setHeader('token', 'jwt ' + token);
        res.status(200).send(result);
    } else {
        res.status(400).send({ message: 'Invalid credentials' });
    }
});

router.post('/restaurant/login', async (req, res) => {

    const EmailId = req.body.EmailId;
    const RestaurantPassword = req.body.RestaurantPassword;

    let restaurant = await Restaurants.findOne({ EmailId: EmailId });
    if (!restaurant) {
        return res.status(400).send({ message: 'Restaurant not found' });
    }
    const isValid = await bcrypt.compare(
        RestaurantPassword,
        restaurant.RestaurantPassword
    );
    if (isValid) {
        let restaurantObject = restaurant.toObject();
        delete restaurantObject.CustomerPassword;
        let result = {
            userType:'restaurant',
            id: restaurantObject.RestaurantId,
            RestaurantId: restaurantObject.RestaurantId,
            email : restaurantObject.EmailId,
            name : restaurantObject.RestaurantName,
            phone : restaurantObject.PhoneNumber,
            state : restaurantObject.State,
            pinCode : restaurantObject.Pincode,
            desc : restaurantObject.RestaurantDesc,
            fromHrs : restaurantObject.WorkHrsFrom,
            toHrs: restaurantObject.WorkHrsTo,
            country : restaurantObject.Country,
            city : restaurantObject.City,
            image: restaurantObject.ImageUrl,
            Mode: restaurantObject.Mode,
            originalRestaurantData: {...restaurantObject}
        }
        const token = await jwt.sign(result, secret, {
            expiresIn: 1000000,
        });
        res.setHeader('token', 'jwt ' + token);
        res.status(200).send(result);
    } else {
        res.status(400).send({ message: 'Invalid credentials' });
    }
});

router.get('/restaurant/all', checkAuth, async (req,res) => {
    const restaurants = await Restaurants.find();
    res.status(200).send(restaurants);
});


module.exports = router;
