import express from 'express';

// middleware
import notFoundMiddleware from "./middleware/notFound.js";

const app = express();
app.use(express.json());

//fake home route
app.get('/', (req, res) => {
    res.send('welcone');
});

// catch errors
app.use(notFoundMiddleware);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('server is running');
})