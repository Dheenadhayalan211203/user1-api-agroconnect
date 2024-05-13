const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
const PORT = 3000;
require("dotenv").config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const user1scheme = new mongoose.Schema({
    title:String,
    amount : Number
  
  });
  
  const user1schema = mongoose.model("user1",user1scheme)
  
 
  
  app.use(bodyParser.json());

  app.post("/api/user1", async (req, res) => {
    const data = new user1schema({
      title: req.body.title,
      amount: req.body.amount,
      
    });
  
    try {
      const newdata = await data.save();
      res.status(201).json(newdata);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  app.get("/api/user1", async (req, res) => {
    try {
      const userData = await user1schema.find(); // Retrieve all data from the "user1" collection
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  


  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });