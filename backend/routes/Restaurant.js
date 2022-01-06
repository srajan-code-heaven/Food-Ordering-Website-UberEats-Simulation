const router = require("express").Router();
const Restaurants = require("../model/Restaurants");
const { checkAuth } = require("../utils/passport");

// query restaurants based on country and city 
router.get("/restaurant", checkAuth, async(req,res)=>{
    const query = {};
    const country = req.query.country;
    const city = req.query.city;
    console.log(req.query);
    if(country!=undefined && country.length)
      query.Country = country;
    if(city!=undefined && city.length)
      query.City = city;
    const restaurants = await Restaurants.find(query);
    res.status(200).send(restaurants);
});

//retrieve all restaurants
router.get("/restaurants", checkAuth, async (req,res) => {
    const restaurants = await Restaurants.find();
    res.status(200).send(restaurants);
});

//retrieve a restaurant
router.get("/restaurants/:id", checkAuth, async (req,res) => {
    const id = req.params.id;
    const restaurants = await Restaurants.find({RestaurantId:id});
    res.status(200).send(restaurants);
});

module.exports = router;
