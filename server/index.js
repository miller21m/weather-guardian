const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();
require('./jobs/scheduler');



const weatherRoute = require('./routes/weather');
const userRoute = require('./routes/user');
const alertRoute = require('./routes/alert');

app.use(cors());
app.use(express.json());
app.use('/weather', weatherRoute);
app.use('/user',userRoute);
app.use('/alert', alertRoute);


connectDB()
.then(() => {
    app.listen(3000, ()=>{
        console.log('Server is runing on 300');
    });
})
.catch(err=>{
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
})
