// controllers/ticket.controller.js
const pool = require("../database");

const ticketController = {
    create: async (req, res) => {
        try {
            const { vorname, nachname, email } = req.body;
            const ipAddress = req.ip;

            const [result] = await pool.query(
                'INSERT INTO tickets (vorname, nachname, email, ipAddress) VALUES (?, ?, ?, ?)',
                [vorname, nachname, email, ipAddress]
            );

            res.status(201).json({ message: "Ticket erfolgreich erstellt.", ticketId: result.insertId });
        } catch (error) {
            console.error("Fehler beim Erstellen des Tickets:", error);
            res.status(500).json({ error: "Fehler beim Erstellen des Tickets." });
        }
    },

    getAll: async (req, res) => {
        try {
            const [tickets] = await pool.query('SELECT * FROM tickets');
            res.json(tickets);
        } catch (error) {
            console.error("Fehler beim Abrufen der Tickets:", error);
            res.status(500).json({ error: "Fehler beim Abrufen der Tickets." });
        }
    },

    getById: async (req, res) => {
        try {
            const [ticket] = await pool.query('SELECT * FROM tickets WHERE id = ?', [req.params.id]);
            if (ticket.length > 0) {
                res.json(ticket[0]);
            } else {
                res.status(404).json({ message: "Ticket nicht gefunden" });
            }
        } catch (error) {
            console.error("Fehler beim Abrufen des Tickets:", error);
            res.status(500).json({ error: "Fehler beim Abrufen des Tickets." });
        }
    },

    update: async (req, res) => {
        try {
            const { vorname, nachname, email } = req.body;
            const [result] = await pool.query(
                'UPDATE tickets SET vorname = ?, nachname = ?, email = ? WHERE id = ?',
                [vorname, nachname, email, req.params.id]
            );
            if (result.affectedRows > 0) {
                res.json({ message: "Ticket erfolgreich aktualisiert" });
            } else {
                res.status(404).json({ message: "Ticket nicht gefunden" });
            }
        } catch (error) {
            console.error("Fehler beim Aktualisieren des Tickets:", error);
            res.status(500).json({ error: "Fehler beim Aktualisieren des Tickets." });
        }
    },

    delete: async (req, res) => {
        try {
            const [result] = await pool.query('DELETE FROM tickets WHERE id = ?', [req.params.id]);
            if (result.affectedRows > 0) {
                res.json({ message: "Ticket erfolgreich gelöscht" });
            } else {
                res.status(404).json({ message: "Ticket nicht gefunden" });
            }
        } catch (error) {
            console.error("Fehler beim Löschen des Tickets:", error);
            res.status(500).json({ error: "Fehler beim Löschen des Tickets." });
        }
    },
};

module.exports = ticketController;
