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

// Create app
const app = express();

// MongoDB URL
const dbURL = "mongodb+srv://ayaz:1234@cluster0.65rzobs.mongodb.net/CiviAnalytics?retryWrites=true&w=majority&appName=Cluster0";

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'https://satisnation.vercel.app'],
  credentials: true
}));
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();
});
app.use("/api", routes);
app.get("/", (req, res) => res.json({ msg: "Backend root is working" }));

// ✅ Check if running locally (via dev command or script)
if (require.main === module) {
  // Connect DB and start server
  mongoose.connect(dbURL).then(() => {
    console.log("MongoDB Connected");
    app.listen(4000, () => console.log("Server running on http://localhost:4000"));
  }).catch(err => console.error("MongoDB Error:", err));
}

// ✅ Export for Vercel (serverless)
module.exports = async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }
  return app(req, res); // handle request with express app
};
