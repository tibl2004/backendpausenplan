const pool = require("../database/index");

const PausenController = {
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("SELECT * FROM mitarbeiterpausen");
            res.json({
                data: rows
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                status: "error"
            });
        }
    },

    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const [rows, fields] = await pool.query("SELECT * FROM mitarbeiterpausen WHERE id = ?", [id]);
            res.json({
                data: rows
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                status: "error"
            });
        }
    },

    create: async (req, res) => {
        try {
            const { 
                name, 
                morning, 
                middayOption, 
                midday, 
                afternoon, 
                termineFrom, 
                termineTo, 
                termineDescription, 
                dayOfWeek 
            } = req.body;

            const countQuery = "SELECT COUNT(*) AS count FROM mitarbeiterpausen WHERE dayOfWeek = ?";
            const [countResult] = await pool.query(countQuery, [dayOfWeek]);
            const count = countResult[0].count;

            if (count >= 16) {
                return res.status(400).json({ error: "Es können maximal 16 Mitarbeiter pro Tag hinzugefügt werden." });
            }

            const sql = `
                INSERT INTO mitarbeiterpausen (
                    name, 
                    morning, 
                    middayOption, 
                    midday, 
                    afternoon, 
                    termineFrom, 
                    termineTo, 
                    termineDescription, 
                    dayOfWeek
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

            const values = [
                name, 
                morning, 
                middayOption, 
                midday, 
                afternoon, 
                termineFrom, 
                termineTo, 
                termineDescription, 
                dayOfWeek
            ];

            await pool.query(sql, values);

            res.status(201).json({ message: "Mitarbeiter erfolgreich hinzugefügt." });
        } catch (error) {
            console.error("Fehler beim Hinzufügen des Mitarbeiters:", error);
            res.status(500).json({ error: "Fehler beim Hinzufügen des Mitarbeiters." });
        }
    },

    update: async (req, res) => {
        try {
            const {
                id, 
                name, 
                morning, 
                middayOption, 
                midday, 
                afternoon, 
                termineFrom, 
                termineTo, 
                termineDescription, 
                dayOfWeek 
            } = req.body;

            const countQuery = "SELECT COUNT(*) AS count FROM mitarbeiterpausen WHERE dayOfWeek = ? AND id != ?";
            const [countResult] = await pool.query(countQuery, [dayOfWeek, id]);
            const count = countResult[0].count;

            if (count >= 16) {
                return res.status(400).json({ error: "Es können maximal 16 Mitarbeiter pro Tag hinzugefügt werden." });
            }

            const sql = `
                UPDATE mitarbeiterpausen 
                SET 
                    name = ?, 
                    morning = ?, 
                    middayOption = ?, 
                    midday = ?, 
                    afternoon = ?, 
                    termineFrom = ?, 
                    termineTo = ?, 
                    termineDescription = ?, 
                    dayOfWeek = ?
                WHERE 
                    id = ?
            `;

            const values = [
                name, 
                morning, 
                middayOption, 
                midday, 
                afternoon, 
                termineFrom, 
                termineTo, 
                termineDescription, 
                dayOfWeek, 
                id
            ];

            await pool.query(sql, values);

            res.json({ status: "success", message: "Mitarbeiter erfolgreich aktualisiert." });
        } catch (error) {
            console.error("Fehler beim Aktualisieren des Mitarbeiters:", error);
            res.status(500).json({ status: "error", message: "Fehler beim Aktualisieren des Mitarbeiters." });
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;
            await pool.query("DELETE FROM mitarbeiterpausen WHERE id = ?", [id]);
            res.json({ status: "success", message: "Mitarbeiter erfolgreich gelöscht." });
        } catch (error) {
            console.error("Fehler beim Löschen des Mitarbeiters:", error);
            res.status(500).json({ status: "error", message: "Fehler beim Löschen des Mitarbeiters." });
        }
    }
};

module.exports = PausenController;
