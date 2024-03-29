const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port  = process.env.PORT || 4000
const app = express()

// middleware
app.use(cors())
app.use(express.json())

// pass : 


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lwsgehv.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    
    const database = client.db('coffeeShopDB')
    const productCollection = database.collection('product')

    app.post('/add-coffee',async(req,res)=>{
         const product = req.body
         const result = await productCollection.insertOne(product)
         res.send(result)
    })
    
    // find a specific coffee.
    app.get('/add-coffee/:id',async(req,res)=>{
        const id = req.params.id
        const query = {_id : new ObjectId(id)}
        const result = await productCollection.findOne(query)
        res.send(result)
    })

    // Delete a specific coffee 
    app.delete('/add-coffee/:id',async(req,res)=>{
        const id = req.params.id
        const query =  {_id : new ObjectId(id)}
        const result = await productCollection.deleteOne(query)
        res.send(result)
    })

    // find all added coffee from database
    app.get("/add-coffee",async(req,res)=>{
          const cursor = productCollection.find()
          const result = await cursor.toArray()
          res.send(result)
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send("coffee shop server successfully working ")
})

app.listen(port, () =>{
    console.log(`this port running port at ${port}`);
})