const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let currentTimeStamp = new Date();

const Address = new Schema({
        AddressId: { type: String, auto:true },
        CustomerId: { type: String, required: true },
        SaveAsName: { type: String,required: true },
        AddressLine1: { type: String,required: true },
        AddressLine2: { type: String},
        City: { type: String,required: true },
        State: { type: String,required: true },
        PinCode: { type: String,required: true },
        Country: { type: String,required: true }
});

const dishSchema = new Schema({
        DishId: { type: mongoose.Types.ObjectId, auto: true },
        RestaurantId: { type: mongoose.Types.ObjectId},
        DishName: { type: String, required: true },
        DishDesc: { type: String, required: true },
        Category: { type: String, required: true },
        DishType: { type: String, required: true },
        Price: { type: Number, required: true },
        ImageUrl: { type: String, required: true },
        quantity: {type: Number, default: 1}
});

const ordersSchema = new Schema({
        OrderId: { type: mongoose.Types.ObjectId, auto: true },
        CustomerId: { type: String, required: true },
        RestaurantId: { type: String, required: true },
        OrderStatus: { type: String, default: '' },
        DeliveryType: { type: String, default: ''},
        CreatedAt: { type: String, default: currentTimeStamp },
        Color: { type: String, default: 'red' },
        TotalAmount: {type: Number, default: 0 },
        LastUpdatedTime: { type: String, default: currentTimeStamp },
        cartDetails: [dishSchema],
        Instructions: {type: String, default: ''},
        DeliveryAddress: [Address],
});

const Orders = mongoose.model('orders', ordersSchema);
module.exports = Orders;
