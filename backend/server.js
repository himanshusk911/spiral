const app=require("./app")
const dotenv=require("dotenv")
const connectDatabase=require("./config/database")

//handling uncoaught exception

process.on("uncaughtException", (err)=>{
    console.log(`Error :${err.message}`);
    console.log(`Shutting down due to uncaught exception`)
    process.exit(1);
})


//config
dotenv.config({path:"backend/config/config.env"})
//connectiong to database
connectDatabase()
const server=app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`)
})
//Unhandled Promise Rejection
process.on("unhandledRejection",(err)=>{
    console.log(`Error :${err.message}`);
    console.log(`Shutting down due to unhandled rejection`)

    server.close(()=>{
        process.exit(1)
    })
})




