const PORT = 3001;
const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const messageRoute = require("./routes/messageRoute");
const db = require("./db");
db();
const cors = require("cors")

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use("/api/auth" , userRoutes);
app.use("/api/messages", messageRoute);

//listen 
app.listen(PORT,()=>{
    console.log(`server has started at port: ${PORT}`)
})