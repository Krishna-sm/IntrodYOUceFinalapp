let express = require('express');
var cors = require('cors');
let app = express();
let port = 9120;
const morgan = require('morgan');
const Razorpay = require("razorpay")
const { OrderModel } = require("./Ordermodels")
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/react_razorpay")
const crypto = require('crypto');
// let Mongo = require('mongodb');
let { ObjectId } = require('mongodb');
let bodyParser = require('body-parser');//middleware
// let cors = require('cors');//middleware
let { dbConnect, getData, postData, updateData, deleteData } = require('./controller/dbcontroller');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));
app.get('/', (req, res) => {
    res.send("hii from express");
})
const razorpay = new Razorpay({
    key_id: 'rzp_test_LyJ0i6pR9WyJin',
    key_secret: 'rtOLwstpQNvPfFCE7Sv0pbDG',
});

app.post("/payment/checkout", async (req, res) => {
    const { name, amount } = req.body;

    const order = await razorpay.orders.create({
        amount: Number(amount * 100),  // amount in the smallest currency unit
        currency: "INR"

    })

    await OrderModel.create({
        order_id: order.id,
        name: name,
        amount: amount

    })

    console.log({ order })
    res.json({ order });
})
app.post("/payment/payment-verification", async (req, res) => {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

    const body_data = razorpay_order_id + "|" + razorpay_payment_id;
    const expect = crypto.createHmac('sha256', 'rtOLwstpQNvPfFCE7Sv0pbDG')
    .update(body_data).digest("hex")

    const isValid = (expect === razorpay_signature);
    if (isValid) {
        await OrderModel.findOne({ order_id: razorpay_order_id }, {
            $set:{
                razorpay_payment_id,razorpay_order_id,razorpay_signature
            }
        })
        res.redirect(`http://localhost:3000/success?payment_id=${razorpay_payment_id}`)
        return
    }
    else {
        res.redirect("http://localhost:3000/failure")
        return
    }
})
app.get('/testimonials', async (req, res) => {
    let query = {}
    let collection = "testimonials";
    let output = await getData(collection, query);
    res.send(output);
});

app.get('/templates', async (req, res) => {
    let query = {}
    let collection = "templates";
    let output = await getData(collection, query);
    res.send(output);
});
app.get('/f-f-templates', async (req, res) => {
    let query = {}
    let collection = "f-f-templates";
    let output = await getData(collection, query);
    res.send(output);
});
app.get('/details/:id', async (req, res) => {

    const validObjId = (id) => {
        const idPattern = /^[0-9a-fA-F]{24}$/
        return idPattern.test(id)
    }
    if (validObjId(req.params.id)) {

        let collection = "templates";
        let query = { _id: new ObjectId(req.params.id) }
        let output = await getData(collection, query);
        res.send(output);

    }
    else {
        res.send('Invalid Object Id');

    }
});
app.get('/singleproducts/:id', async (req, res) => {

    const validObjId = (id) => {
        const idPattern = /^[0-9a-fA-F]{24}$/
        return idPattern.test(id)
    }
    if (validObjId(req.params.id)) {

        let collection = "f-f-templates";
        let query = { _id: new ObjectId(req.params.id) }
        let output = await getData(collection, query);
        res.send(output);

    }
    else {
        res.send('Invalid Object Id');

    }
});

app.get('/orders', async (req, res) => {
    let query = {}
    let collection = "orders";
    if (req.query.email) {
        query = { email: req.query.email }
    }
    let output = await getData(collection, query);
    res.send(output)
})
app.get('/singleproduct', async (req, res) => {
    let query;
    let collection = "singleproduct";
    if (req.query.id) {
        query = { id: req.query.id }
    }
    let output = await getData(collection, query);
    res.send(output)
})
// app.get('/userdb', async(req, res) => {   //problem
//     let query ={};
//     if(req.query.id)
//     {
//         query = {"id":Number(req.query.users.id)}
//     }
//     else if()
//     let collection ="userdb";
//     let output = await getData(collection,query);
//     res.send(output);
// });

app.post('/placeOrder', async (req, res) => {
    let body = req.body;
    let collection = 'orders';
    let response = await postData(collection, body);
    res.send(response)
})

app.post('/tempdetails', async (req, res) => {
    if (Array.isArray(req.body.id)) {
        let query = { id: { $in: req.body.id } };
        let collection = 'templates';
        let output = await getData(collection, query)
        res.send(output)

    } else {
        res.send("please pass data in form of array")
    }
});
app.put('/updateOrder', async (req, res) => {
    // if(Array.isArray(req.body.id))
    // {
    let condition = { "_id": new ObjectId(req.body._id) }
    let collection = 'orders';
    let data =
    {
        $set: {
            "name": req.body.name
        }
    }
    let output = await updateData(collection, condition, data)
    res.send(output)

    // }else{
    //     res.send("please pass data in form of array")
    // }
});
app.delete('/deleteOrder', async (req, res) => {
    // if(Array.isArray(req.body.id))
    // {
    let condition = { "_id": new ObjectId(req.body._id) }
    let collection = 'orders';

    let output = await deleteData(collection, condition)
    res.send(output)

    // }else{
    //     res.send("please pass data in form of array")
    // }
});

app.listen(port, (err) => {
    dbConnect();
    if (err) throw err;
    console.log(`listening on port ${port}`)
})