const express = require('express');
const cors = require('cors');
const port  = process.env.PORT || 4000
const app = express()

// middleware
app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("coffee shop server successfully working ")
})

app.listen(port, () =>{
    console.log(`this port running port at ${port}`);
})