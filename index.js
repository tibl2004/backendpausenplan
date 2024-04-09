const express = require("express");
const cors = require("cors");
const app = express();

require('dotenv').config();

app.use(cors()); // CORS-Middleware aktivieren

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const kundenRouter = require('./routes/kunden.router');
const trauungenRouter = require('./routes/trauungen.router');
const authRouter = require('./routes/auth.router');

app.use("/api/v1/kunden", kundenRouter);
app.use("/api/v1/auth", authRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server is running....");
});