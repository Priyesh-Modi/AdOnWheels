const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const advertiserRoutes = require('./routes/advertiserRoutes');
const bodyShopRoutes = require('./routes/bodyShopRoutes');
const publisherRoutes = require('./routes/publisherRoutes');
const adminRoutes = require('./routes/adminRoutes');


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));


app.use('/api/auth', authRoutes);
app.use('/api/advertiser', advertiserRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/bodyshops', bodyShopRoutes);
app.use('/api/publishers', publisherRoutes);



app.get('/', (req, res) => res.send('AdOnWheels API is running...'));

app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
