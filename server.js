import express from 'express';
import dotenv from 'dotenv';
import connectDB from "./db/connect.js";
import authRouter from "./routes/authRouter.js";

// middleware
import notFoundMiddleware from "./middleware/notFound.js";
import errorHandlerMiddleware from "./middleware/errorHandler.js";

const app = express();
app.use(express.json());
dotenv.config();

//fake home route
app.get('/', (req, res) => {
    res.send('welcone');
});

// routes
app.use('/api/v1/auth', authRouter);

// catch errors
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDB(process.env.DB_URL);
        app.listen(port, () => {
            console.log(`server is running on port: ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
}

start();
