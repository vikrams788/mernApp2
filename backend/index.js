require('dotenv').config();
const express = require('express');
const db = require('./db');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: "https://mern-app2-enes.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }));
app.use(cookieParser());

db.connect();

app.use('/api', userRoutes);

app.listen(4000, () => {
    console.log(`Server started at port: 4000`);
});

