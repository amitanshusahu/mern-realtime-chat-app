const PORT = 3001;
const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes")
const db = require("./db");
db();
const cors = require("cors")

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use("/api/auth" , userRoutes);

//listen 
app.listen(PORT,()=>{
    console.log(`server has started at port: ${PORT}`)
})