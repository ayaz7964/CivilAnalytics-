const express = require ("express")
const app = express()
const mongoose = require ("mongoose")
const routes = require("./Routes/routes")

const dbURL = "mongodb+srv://ayaz:1234@cluster0.65rzobs.mongodb.net/CiviAnalytics?retryWrites=true&w=majority&appName=Cluster0"

const cors = require("cors");

app.use(cors({
  origin: "https://satisnation.vercel.app", // Your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

mongoose.connect(dbURL).then(()=>{
    console.log('Server Stated Port Number 4000 and Database Connected ')
    app.listen(4000)
}).catch((err)=>{
    console.log(err)
})


// Middleware to parse JSON bodies
app.use(express.json()); 

app.use((req, res, next) => {
   console.log(`${req.method} request for '${req.url}'`);
    next();
});

app.use("/api",routes);
app.use('/',(req,res)=>{
res.json({msg:"Working fine"})
})



