const express=require('express')
const app=express()
const cors = require("cors")
const cookieParser=require('cookie-parser')
const errorMiddleware=require("./middleware/error")
app.use(express.json())
app.use(cookieParser())
app.use(cors())
//Route Imports
const upload=require("./routes/uploadRoute")
const user=require("./routes/userRoute")


app.use("/api/v1",upload)

app.use("/api/v1",user)

//middleware for error

app.use(errorMiddleware)
module.exports=app
