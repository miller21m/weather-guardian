const express = require('express');
const app = express();
const path = require('path');
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

// Serve React build (only in production)
if (process.env.NODE_ENV === 'production') {
    const clientBuildPath = path.join(__dirname, '../client/build');
    app.use(express.static(clientBuildPath));
  
    // Wildcard route for React (v5-compatible)
    app.get('*', (req, res) => {
        res.sendFile(path.join(clientBuildPath, 'index.html'));
    });
}

  const PORT = process.env.PORT || 3000;


connectDB()
.then(() => {
    app.listen(PORT, ()=>{
        console.log(`Server running on port ${PORT}`);
    });
})
.catch(err=>{
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
})
