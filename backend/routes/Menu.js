const router = require("express").Router();
const Restaurants = require("../model/Restaurants");
const mongoose = require('mongoose');
const { checkAuth } = require("../utils/passport");

router.post("/restaurant/dishes", checkAuth, async (req, res) => {
    let {RestaurantId} = req.body.restaurantId;
    console.log('req.body is');
    console.log(req.body);
    let payload = {
        RestaurantId: req.body.restaurantId,
        DishName: req.body.name,
        DishType: req.body.type,
        DishDesc: req.body.dishdesc,
        Category: req.body.category,
        Price: req.body.price,
        ImageUrl: req.body.imageUrl
    }
    let restaurant = await Restaurants.findOne({RestaurantId:req.body.restaurantId});
    if(!restaurant){
        res.status(400).send({"message":"Restaurant not found"});
    }
    if (!req.body.DishId) {
        payload.RestaurantId = req.body.restaurantId;
        restaurant.Dishes.push(payload);
        let length = restaurant.Dishes.length;
        let response = await restaurant.save();
        updatedRestaurant = response.toObject();
        res.status(200).send({dishId:updatedRestaurant.Dishes[length - 1].DishId});
    } else if (req.body.DishId) {
        let payloadVal = {
            DishId: req.body.DishId,
            RestaurantId: req.body.restaurantId,
            DishName: req.body.DishName,
            DishType: req.body.DishType,
            DishType: req.body.DishType,
            Category: req.body.Category,
            Price: req.body.Price,
            ImageUrl: req.body.ImageUrl
        }
        console.log('The payload value is');
        console.log(payloadVal);
        let dish = restaurant.Dishes.id(req.body.DishId);
        console.log(" dish is", dish)
        dish.set(payloadVal);
        let response = await restaurant.save();
        res.status(200).send({message:'Updated Successfully'});
    } else {
        res.status(200).send({message:'Could not update'});
    }
});

router.get("/restaurant/:id/dishes", checkAuth, async (req, res)=> {
    let restaurant = await Restaurants.findOne({ RestaurantId: req.params.id });
    res.status(200).send(restaurant.Dishes);
});

router.get("/dishes/all", checkAuth, async (req, res) => {
    const restaurants = await Restaurants.find();
    let dishes = [];
    restaurants.map(restaurant => dishes.push(...restaurant.Dishes));
    res.status(200).send(dishes);
});

router.post('/restaurant/deletemenu', checkAuth, async (req,res) => {
    let {RestaurantId, DishId} = req.body;
    let restaurant = await Restaurants.findOne({ RestaurantId: RestaurantId });
    if(!restaurant){
        res.status(400).send({"message":"Restaurant not found"});
    }
    await Restaurants.findOneAndUpdate({ RestaurantId: RestaurantId }, { $pull: {"Dishes": {_id: mongoose.Types.ObjectId(DishId)}} }, {returnNewDocument:true}, (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'error in deleting dish' });
        }
        console.log("latest dish data is")
        console.log(data);
        res.status(200).send({message:'Deleted Successfully'});
    });
});

module.exports = router;
