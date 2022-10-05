const express=require("express")
const app=express()
app.listen(process.env.PORT || 3000)
console.log("working...")
app.use(express.json())
const cors=require("cors")
const Mongodb=require("Mongodb")
const Mongoclient=Mongodb.Mongoclient
app.use(cors({origin:"https://effortless-concha-6652c7.netlify.app/"}))
app.use(cors({origin:"http://localhost:3001"}))
const mongodb=require("mongodb")
const mongoClient=mongodb.MongoClient
const Razorpay= require('razorpay')

 

app.get("/getmovies",cors(),async(req,res)=>{
    try {
     const connection=await mongoClient.connect("mongodb+srv://misham25:misham25@atlascluster.b99otct.mongodb.net/?retryWrites=true&w=majority");
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
    const connection=await mongoClient.connect("mongodb+srv://misham25:misham25@atlascluster.b99otct.mongodb.net/?retryWrites=true&w=majority");
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
    const connection=await mongoClient.connect("mongodb+srv://misham25:misham25@atlascluster.b99otct.mongodb.net/?retryWrites=true&w=majority");
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
    const connection=await mongoClient.connect("mongodb+srv://misham25:misham25@atlascluster.b99otct.mongodb.net/?retryWrites=true&w=majority");
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
     const connection=await mongoClient.connect("mongodb+srv://misham25:misham25@atlascluster.b99otct.mongodb.net/?retryWrites=true&w=majority");
     const db=connection.db("bookmyshow");
    let response= await db.collection("movielist").insertOne(req.body)
     await connection.close();
     res.status(200).json(response)
 
    } catch (error) {
     res.status(500).json({message:"error"})
    }
 })



  