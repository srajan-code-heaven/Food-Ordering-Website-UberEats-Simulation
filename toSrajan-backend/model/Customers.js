const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Address = new Schema({
        AddressId: { type: mongoose.Types.ObjectId, auto: true },
        CustomerId: { type: String, required: true },
        SaveAsName: { type: String,required: true },
        AddressLine1: { type: String,required: true },
        AddressLine2: { type: String, default: ''},
        City: { type: String,required: true },
        State: { type: String,required: true },
        PinCode: { type: String,required: true },
        Country: { type: String,required: true }
});

const customerSchema = new Schema({
        CustomerId: { type: mongoose.Types.ObjectId, auto: true },
        EmailId: { type: String, required: true },
        CustomerName: { type: String, required: true },
        CustomerPassword: { type: String, required: true },
        DateOfBirth: { type: String, default: '' },
        PhoneNumber: { type: String, default: '' },
        NickName: { type: String, default: '' },
        Country: { type: String, default: '' },
        Street:{ type: String, default: '' },
        City: { type: String, default: '' },
        ImageUrl: { type: String, default: '' },
        Pincode: { type: String, default: '' },
        State: { type: String, default: '' },
        // Favourites: [mongoose.Types.ObjectId],
        Address: [Address]
    },
    {
        versionKey: false
    });    

const Customers = mongoose.model('customers', customerSchema);
module.exports = Customers;