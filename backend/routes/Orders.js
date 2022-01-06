
const router = require('express').Router();
const Orders = require('../model/Orders');
const mongoose = require('mongoose');
const { checkAuth } = require('../utils/passport');

router.post('/placeorders', checkAuth, async  (req, res) => {
    let currentTimeStamp = new Date();

    let orderPayload = {
        CustomerId: req.body.CustomerId,
        RestaurantId: req.body.RestaurantId,
        OrderStatus: req.body.OrderStatus,
        Color: req.body.Color,
        TotalAmount: req.body.TotalAmount,
        DeliveryType: req.body.DeliveryType,
        CreatedAt: currentTimeStamp,
        LastUpdatedTime: currentTimeStamp,
        cartDetails: req.body.cartDetails,
        Instructions: req.body.deliveryInstructions,
        DeliveryAddress: req.body.DeliveryAddress
    };
    const order = new Orders({...orderPayload}); 
    const savedOrder = await order.save()
    res.status(200).send({message:'Order Placed Successfully', savedOrder: {...savedOrder}});
});

router.post('/restaurant/updateorders', checkAuth, async(req,res)=>{
    const orderId = mongoose.Types.ObjectId(req.body.OrderId);
    let order = await Orders.findOne({OrderId:orderId});
    if (!order) {
        return res.status(400).send('Order not found');
    }
    payload = {
        OrderStatus: req.body.OrderStatus,
        Color: req.body.Color
    }
    Orders.findOneAndUpdate({ OrderId: orderId }, payload,{returnNewDocument:true}, await function (err, updateOrder) {
        if (err) return res.send(500, { error: err });
        let latest = {
          updateOrderStatus: {
            message : 'Updated Successfully',
            updateOrder: {...updateOrder}
          }
        } 
        let result = {
          message : 'Updated Successfully',
          updateOrder: {...updateOrder},
          latest: latest
      }
        console.log(latest)
        return res.status(200).send(result);
    });
});

router.get('/customer/:id/orders', checkAuth, async (req, res) => {
    const customerId = req.params.id;
    const order = await Orders.find({CustomerId:customerId});
    res.status(200).send(order);
});

router.get('/restaurant/:id/orders', checkAuth, async (req, res) => {
    const restaurantId = req.params.id;
    // const orders = await Orders.find({RestaurantId:restaurantId}); // SELECT * FROM Orders INNER JOIN Customer ON Orders.CustomerId = Customer.CustomerId where RestaurantId = ?
    const orders = await Orders.aggregate([
        {
          '$match': {'RestaurantId':restaurantId}
        },
        {
          '$lookup': {
            'from': 'customers',
            'let': {
              'customerId': '$customerId'
            },
            'pipeline': [
              {
                '$match': {
                  '$expr': {
                    '$eq': [
                      '$$customerId',
                      '$customerId'
                    ]
                  }
                }
              }
            ],
            'as': 'customerDetails'
          }
        },
        {
          '$unwind': {
            'path': '$customerDetails',
            'preserveNullAndEmptyArrays': false
          }
        },
      ])
    const latest = orders.filter((v,i,a)=>a.findIndex(t=>(t.OrderId.toString() === v.OrderId.toString()))===i);
    res.status(200).send(latest);
});

module.exports = router;
