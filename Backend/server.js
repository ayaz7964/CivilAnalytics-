// const express = require ("express")
// const app = express()
// const mongoose = require ("mongoose")
// const routes = require("./Routes/routes")

// const dbURL = "mongodb+srv://ayaz:1234@cluster0.65rzobs.mongodb.net/CiviAnalytics?retryWrites=true&w=majority&appName=Cluster0"

// mongoose.connect(dbURL).then(()=>{
//     console.log('Server Stated Port Number 4000 and Database Connected ')
//     app.listen(4000)
// }).catch((err)=>{
//     console.log(err)
// })
// const cors = require('cors');
// app.use(cors({
//   origin: 'https://satisnation.vercel.app'
// }));


// // Middleware to parse JSON bodies
// app.use(express.json()); 

// app.use((req, res, next) => {
//    console.log(`${req.method} request for '${req.url}'`);
//     next();
// });

// app.use("/api",routes);
// app.use('/',(req,res)=>{
// res.json({msg:"Working fine"})
// })


const express = require("express");
const mongoose = require("mongoose");
const routes = require("./Routes/routes");
const cors = require("cors");

const app = express();

const dbURL = "mongodb+srv://ayaz:1234@cluster0.65rzobs.mongodb.net/CiviAnalytics?retryWrites=true&w=majority&appName=Cluster0";

// Middleware
app.use(cors({
  origin: 'https://satisnation.vercel.app'
}));
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();
});
app.use("/api", routes);
app.use('/', (req, res) => {
  res.json({ msg: "Working fine" });
});

// ✅ This is critical: DO NOT CALL app.listen
mongoose.connect(dbURL)
  .then(() => console.log("Database Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

// ✅ Export the app for Vercel
module.exports = app;

