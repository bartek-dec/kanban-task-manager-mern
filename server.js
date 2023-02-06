import express from 'express';
import dotenv from 'dotenv';

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

// catch errors
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('server is running');
})