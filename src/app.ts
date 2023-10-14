import "express-async-errors"
import dotenv from "dotenv"
dotenv.config()

// Security
import cors from "cors";
import helmet from "helmet";
import xssCleaner from "xss-clean";  /* xss-cleaner dependency was written in javascript and has no types declaration file for TypeScript so nothing could be done about the red squiggle */
import rateLimiter from "express-rate-limit";

import connectDB from "./db/connect.js"

// Import Express and initialise app
import Express, { Request, Response } from "express"
let app = Express();

// Import Middlewares
import errorHandler from "./middlewares/errorHandler.js";
import notFound from "./middlewares/notFound.js";
import authenticate from "./middlewares/authenticate.js";

//Import Ruters
import jobRouter from "./routes/Jobs.js";
import authRouter from "./routes/auth.js";


app.set("trust proxy", 1);
const rateLimitOptions = 
app.use(rateLimiter({
    windowMs: 60 * 1000,
    limit: 30,
    standardHeaders: true
}))
app.use(cors());
app.use(helmet());
app.use(xssCleaner());


app.use(Express.json());

app.get("/", (req: Request, res: Response)=>{
    res.status(200).send("Jobs API")
});

app.use("/marvelsJobAPI/v1/job", authenticate, jobRouter);
app.use("/marvelsJobAPI/v1/auth", authRouter);

app.use(notFound);
app.use(errorHandler)

const PORT = process.env.PORT || 5000;

const start = async()=>{
    await connectDB(process.env.URI!)
    app.listen(PORT, ()=>console.log("Server listening at port " + PORT))
}

start();