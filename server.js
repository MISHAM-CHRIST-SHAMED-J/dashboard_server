const express=require("express")
const app=express()
app.listen(5500)
console.log("working...")
app.use(express.json())
const cors=require("cors")
const Mongodb=require("Mongodb")
const Mongoclient=Mongodb.Mongoclient
app.use(cors({origin:"http://localhost:3000"}))
app.use(cors({origin:"http://localhost:3001"}))
const mongodb=require("mongodb")
const mongoClient=mongodb.MongoClient
const Razorpay= require('razorpay')
var instance = new Razorpay({
   key_id: 'rzp_test_3wbsYuVOk8B881',
   key_secret: 'wrRtQJZS9m9za31wJ6NGgWZT',
 });
 

app.get("/getmovies",cors(),async(req,res)=>{
    try {
     const connection=await mongoClient.connect("mongodb://localhost:27017");
     const db=connection.db("bookmyshow");
    let response= await db.collection("movielist").find().toArray()
     await connection.close();
     res.status(200).json(response)
 
    } catch (error) {
     res.status(500).json({message:"error"})
    }
 })

 app.get("/getsinglemovie/:id",cors(),async(req,res)=>{
   try {
    const connection=await mongoClient.connect("mongodb://localhost:27017");
    const db=connection.db("bookmyshow");
   let response= await db.collection("movielist").findOne({_id:Mongodb.ObjectId(req.params.id)})
    await connection.close();
    res.status(200).json(response)

   } catch (error) {
    res.status(500).json({message:"error"})
   }
})

app.get("/getseat",cors(),async(req,res)=>{
   try {
    const connection=await mongoClient.connect("mongodb://localhost:27017");
    const db=connection.db("bookmyshow");
   let response= await db.collection("seatlist").find().toArray()
    await connection.close();
    res.status(200).json(response)

   } catch (error) {
    res.status(500).json({message:"error"})
   }
})


app.post("/postseat",cors(),async(req,res)=>{
   try {
    const connection=await mongoClient.connect("mongodb://localhost:27017");
    const db=connection.db("bookmyshow");
   let response= await db.collection("ocupseat").insertOne(req.body)
    await connection.close();
    res.status(200).json(response)

   } catch (error) {
    res.status(500).json({message:"error"})
   }
})


 app.post("/postmovies",cors(),async(req,res)=>{
    try {
     const connection=await mongoClient.connect("mongodb://localhost:27017");
     const db=connection.db("bookmyshow");
    let response= await db.collection("movielist").insertOne(req.body)
     await connection.close();
     res.status(200).json(response)
 
    } catch (error) {
     res.status(500).json({message:"error"})
    }
 })



  