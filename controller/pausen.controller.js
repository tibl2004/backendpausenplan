
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
            res.json({
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
            res.json({
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
                middayFrom,
                middayTo,
                afternoon,
                termineFrom,
                termineTo,
                termineDescription
            } = req.body;

            const sql = `
                INSERT INTO mitarbeiterpausen (
                    name,
                    morning,
                    middayOption,
                    midday,
                    middayFrom,
                    middayTo,
                    afternoon,
                    termineFrom,
                    termineTo,
                    termineDescription
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
            const values = [
                name,
                morning,
                middayOption,
                midday,
                middayFrom,
                middayTo,
                afternoon,
                termineFrom,
                termineTo,
                termineDescription
            ];

            await pool.query(sql, values);

            res.status(201).json({ message: "Daten erfolgreich erstellt und in die Datenbank gespeichert." });
        } catch (error) {
            console.error("Fehler beim Erstellen der Daten:", error);
            res.status(500).json({ error: "Fehler beim Erstellen der Daten und Speichern in der Datenbank." });
        }
    },

    update: async (req, res) => {
        try {
            const {
                name,
                morning,
                middayOption,
                midday,
                middayFrom,
                middayTo,
                afternoon,
                termineFrom,
                termineTo,
                termineDescription
            } = req.body;
            const { id } = req.params;

            const sql = `
                UPDATE mitarbeiterpausen 
                SET 
                    name = ?,
                    morning = ?,
                    middayOption = ?,
                    midday = ?,
                    middayFrom = ?,
                    middayTo = ?,
                    afternoon = ?,
                    termineFrom = ?,
                    termineTo = ?,
                    termineDescription = ?
                WHERE 
                    id = ?
            `;

            const values = [
                name,
                morning,
                middayOption,
                midday,
                middayFrom,
                middayTo,
                afternoon,
                termineFrom,
                termineTo,
                termineDescription,
                id
            ];

            await pool.query(sql, values);

            res.json({
                status: "success",
                message: "Daten erfolgreich aktualisiert."
            });
        } catch (error) {
            console.error(error);
            res.json({
                status: "error",
                message: "Eintrag konnte nicht aktualisiert werden."
            });
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;
            await pool.query("DELETE FROM mitarbeiterpausen WHERE id = ?", [id]);
            res.json({
                status: "success",
                message: "Daten erfolgreich gelöscht."
            });
        } catch (error) {
            console.error(error);
            res.json({
                status: "error",
                message: "Eintrag konnte nicht gelöscht werden."
            });
        }
    }

};

module.exports = PausenController;
