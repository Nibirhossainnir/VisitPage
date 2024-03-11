const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();
dotenv.config();
const port = process.env.PORT || 3000;
const static_path = path.join(__dirname,"/public");

const username = process.env.MONGODB_USERNAME;
const pass = process.env.MONGODB_PASSWORD;

mongoose.connect(`mongodb+srv://${username}:${pass}@cluster0.b6klvxc.mongodb.net/LocationFrom`,{
  useNewUrlParser : true,
  useUnifiedTopology : true,
}).then(()=>{
  console.log(`MongoDB connected successfully!`);
}).catch((err)=> console.log(`No connection!`));

const regisS = new mongoose.Schema({
    la_lo : String
});

const regis = mongoose.model("Location", regisS);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(static_path));

app.get('/', (req,res) =>{
    res.sendFile(__dirname+"/index.html");
});

//send location
app.post("/", async (req,res) => {
  try{
    const {la_lo} = req.body;


      const regisD = new regis({
        la_lo
      })
      await regisD.save();
      res.redirect("/success");
  }catch(error){
    console.log(error)
    res.redirect("/error");
  }
});
//Login

app.get("/success", (req,res)=>{
  res.sendFile(__dirname+"/success.html");
});
app.get("/error", (req,res)=>{
  res.sendFile(__dirname+"/error.html");
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
});