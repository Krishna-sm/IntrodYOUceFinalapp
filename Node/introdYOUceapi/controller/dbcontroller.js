require("dotenv").config();
let mongo = require('mongodb');

let {MongoClient} = require('mongodb');
let mongoUrl = process.env.REACT_APP_API_MONGO_URL
// mongodb local
//when we write methods in mongodb we write it i curly braces
let client = new MongoClient(mongoUrl);

async function dbConnect()
{
    await client.connect();
}

let db = client.db('introdyouce');

async function getData(colName,query){//generic query getData can be used any where what we are doing is , we are getting the data and pushing it in an array
 let output = [];
 try{
    const cursor = db.collection(colName).find(query);
    for await(const data of cursor){
        output.push(data)
    }
    cursor.closed
 }
 catch(err){
    output.push({"Error":"Error in getting data"})
 }
 return output;

}
async function postData(colName,data){//generic query postData can be used any where what we are doing is , we are getting the data and pushing it in an array
 let output;
 try{
    output = await db.collection(colName).insertOne(data);
   
 }
 catch(err){
    output = {"Response":"Error in posting data"}
 }
 return output;

}
async function updateData(colName,condition,data){//generic query postData can be used any where what we are doing is , we are getting the data and pushing it in an array
 let output;
 try{
    output = await db.collection(colName).updateOne(condition,data);
   
 }
 catch(err){
    output = {"Response":"Error in update data"}
 }
 return output;

}
async function deleteData(colName,condition){//generic query postData can be used any where what we are doing is , we are getting the data and pushing it in an array
 let output;
 try{
    output = await db.collection(colName).deleteOne(condition);
   
 }
 catch(err){
    output = {"Response":"Error in delete data"}
 }
 return output;

}
    
module.exports = {
    dbConnect,
    getData,
    postData,
    updateData,
    deleteData
}