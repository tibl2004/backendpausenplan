
const pool = require("../database");

const messageController = {
    getByTicketId: async (req, res) => {
        try {
            const [messages] = await pool.query('SELECT * FROM messages WHERE ticketId = ?', [req.params.ticketId]);
            res.json(messages);
        } catch (error) {
            console.error("Fehler beim Abrufen der Nachrichten:", error);
            res.status(500).json({ error: "Fehler beim Abrufen der Nachrichten." });
        }
    },
};

module.exports = messageController;
