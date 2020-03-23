const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const middlewares = require('./middlewares');
const logs = require('../api/logs');

const app = express();


mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    //useUnifiedTopology: true,
});

// using middlewares
app.use(morgan('common'));
app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN,
}));
// body parsing
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Hello World!',
    });
});

app.use('/api/logs', logs)

// error handlers
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 1337;
app.listen(port, () => {
    console.log('Listening at http://localhost:${port}');
});


// LEFT OFF AT 1:59:00
// For some reason, we aren't getting any timestamps (createdAt / updatedAt)
// maybe because no actual mongoDb is connected?
// Also localhost.../api/logs wont load
// probably also because i havent created the real database
//  at mongodb atlas