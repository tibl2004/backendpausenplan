const pool = require("../database/index");

const trauungenController = {
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("SELECT * FROM trauungen");
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
            const [rows, fields] = await pool.query("SELECT * FROM trauungen WHERE id = ?", [id]);
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
            const { vorname, nachname, anzahlPersonen } = req.body;
            const sql = "INSERT INTO trauungen (vorname, nachname, anzahlPersonen) VALUES (?, ?, ?)";
            const [rows, fields] = await pool.query(sql, [vorname, nachname, anzahlPersonen]);
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
            const { vorname, nachname, anzahlPersonen } = req.body;
            const { id } = req.params;
            const sql = "UPDATE trauungen SET vorname = ?, nachname = ?, anzahlPersonen = ? WHERE id = ?";
            const [rows, fields] = await pool.query(sql, [vorname, nachname, anzahlPersonen, id]);
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
            const [rows, fields] = await pool.query("DELETE FROM trauungen WHERE id = ?", [id]);
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

module.exports = trauungenController;
