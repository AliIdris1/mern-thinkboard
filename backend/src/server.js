import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import noteRouter from "./Routes/noteRouter.js"
import { connectDB } from "./config/db.js";
import ratelimiter from "./middwares/rateLimiter.js";

dotenv.config();


const PORT = process.env.PORT || 5001;

const app = express()


app.use(cors({
    origin: "http://localhost:5173"
}))
app.use(express.json())
app.use(ratelimiter)

app.use("/api/notes", noteRouter)


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`server is running on ${PORT}`)
    })

})

