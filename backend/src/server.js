import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import noteRouter from "./Routes/noteRouter.js"
import { connectDB } from "./config/db.js";
import ratelimiter from "./middwares/rateLimiter.js";
import path from "path"

dotenv.config();


const app = express()
const PORT = process.env.PORT || 5001;
const __dirname= path.resolve()

if(process.env.NODE.ENV !== "development") {
app.use(cors({
    origin: "http://localhost:5173"
}))
}
app.use(express.json())
app.use(ratelimiter)

app.use("/api/notes", noteRouter)

if(process.env.NODE_ENV === "development") {

app.use(express.static(path.join("../frontend/dist")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname,"../frontend", "dist", "index.html"))
})
}

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`server is running on ${PORT}`)
    })

})

