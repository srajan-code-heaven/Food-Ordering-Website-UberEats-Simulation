const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

const app = express();

const login = require('./routes/Login');
const signup = require('./routes/Signup');
const menu = require('./routes/Menu');
const fileUpload = require('./routes/FileUpload');
const profile = require('./routes/Profile');
const customer = require('./routes/Customer');
const restaurant = require('./routes/Restaurant');
const orders = require('./routes/Orders');

const { mongoDB } = require('./config');

// const personalization = require('./routes/Personlization');
// const deliveryaddress = require('./routes/DeliveryAddress');

const cors = require('cors');

app.use(cors(
    {exposedHeaders: 'token',}
));
const { auth } = require("./utils/passport");
auth();

app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

// app.use('/uber-eats/api',restaurant);
// app.use('/uber-eats/api',personalization);
// app.use('/uber-eats/api',deliveryaddress);

app.use('/login', login);
app.use('/signup', signup);
app.use('/customer', customer);
app.use('/profile', profile);
app.use('/menu', menu);
app.use('/orders', orders);
app.use('/fileUpload', fileUpload);

app.use(session({
    secret              : 'cmpe273_uber_eats',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));


app.get('/', function(req,resp){
    resp.send('Uber Eats Server Endpoints');
});

var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 100
};
console.log(mongoDB);
mongoose.connect(mongoDB, options, (err, res) => {
    if (err) {
        console.log(err);
        console.log(`MongoDB Connection Failed`);
    } else {
        console.log(`MongoDB Connected`);
    }
});


app.listen(3010, function () {
    console.log('Server listening on port 3010');
});



module.exports = app;
