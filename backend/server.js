const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors({origin: process.env.FRONTEND_URL}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//connect to MongoDB

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Database Connected..'))
  .catch(err => console.error('MongoDB Connection Error:', err));


const authRoutes = require('./routes/userRoutes');
app.use('/user', authRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

