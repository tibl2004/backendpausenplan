const express = require('express');
const cors = require('cors');
const app = express();
const cron = require('node-cron');
const pool = require('./database');
require('dotenv').config();

app.use(cors()); // CORS-Middleware aktivieren
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const kundenRouter = require('./routes/kunden.router');
const mitarbeiterRouter = require('./routes/mitarbeiter.router');
const authRouter = require('./routes/auth.router');

app.use('/api/kunden', kundenRouter);
app.use('/api/mitarbeiter', mitarbeiterRouter);
app.use('/api/auth', authRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}....`);
});
