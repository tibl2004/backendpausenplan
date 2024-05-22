const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cron = require("node-cron");
const pool = require("./database");
require('dotenv').config();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

app.use(cors()); // CORS-Middleware aktivieren
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const kundenRouter = require('./routes/kunden.router');
const mitarbeiterRouter = require('./routes/mitarbeiter.router');
const authRouter = require('./routes/auth.router');
const ticketRouter = require('./routes/ticket.router');
const messageRouter = require('./routes/message.router');

app.use("/api/v1/kunden", kundenRouter);
app.use("/api/v1/mitarbeiter", mitarbeiterRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/tickets", ticketRouter);
app.use("/api/messages", messageRouter);

io.on('connection', (socket) => {
    console.log('a user connected');
    
    socket.on('sendMessage', (message) => {
        pool.query('INSERT INTO messages SET ?', message, (err) => {
            if (err) throw err;
            io.emit('receiveMessage', message);
        });
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// Schedule job to clear tickets every day at 17:00
cron.schedule('0 17 * * *', () => {
    pool.query('DELETE FROM tickets', (err) => {
        if (err) throw err;
        console.log('Cleared tickets at 17:00');
    });
});

// Schedule job to allow access at 08:00
cron.schedule('0 8 * * *', () => {
    console.log('Ticket system is now open at 08:00');
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log("Server is running....");
});
