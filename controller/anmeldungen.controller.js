const pool = require("../database/index");

const anmeldungenController = {
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("SELECT * FROM anmeldungen");
            res.json({
                data: rows
            });
        } catch (error) {
            console.error(error);
            res.json({
                status: "error"
            });
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const [rows, fields] = await pool.query("SELECT * FROM anmeldungen WHERE id = ?", [id]);
            res.json({
                data: rows
            });
        } catch (error) {
            console.error(error);
            res.json({
                status: "error"
            });
        }
    },
    create: async (req, res) => {
        try {
            const { vorname, nachname, anzahlPersonen, menuAuswahl } = req.body;
            const sql = "INSERT INTO posts (vorname, nachname, anzahlPersonen, menuAuswahl) VALUES (?, ?, ?, ?)";
            const [rows, fields] = await pool.query(sql, [vorname, nachname, anzahlPersonen, menuAuswahl]);
            res.json({
                data: rows
            });
        } catch (error) {
            console.error(error);
            res.json({
                status: "error"
            });
        }
    },
    update: async (req, res) => {
        try {
            const { vorname, nachname, anzahlPersonen, menuAuswahl } = req.body;
            const { id } = req.params;
            const sql = "UPDATE posts SET vorname = ?, nachname = ?, anzahlPersonen = ?, menuAuswahl = ? WHERE id = ?";
            const [rows, fields] = await pool.query(sql, [vorname, nachname, anzahlPersonen, menuAuswahl, id]);
            res.json({
                data: rows
            });
        } catch (error) {
            console.error(error);
            res.json({
                status: "error"
            });
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const [rows, fields] = await pool.query("DELETE FROM posts WHERE id = ?", [id]);
            res.json({
                data: rows
            });
        } catch (error) {
            console.error(error);
            res.json({
                status: "error"
            });
        }
    }
};

module.exports = anmeldungenController;
