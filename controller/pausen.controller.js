// controller/pausen.controller.js

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
            const schedules = req.body;

            for (const schedule of schedules) {
                const dayOfWeek = schedule[0].dayOfWeek;
                const countQuery = "SELECT COUNT(*) AS count FROM mitarbeiterpausen WHERE dayOfWeek = ?";
                const [countResult] = await pool.query(countQuery, [dayOfWeek]);
                const count = countResult[0].count;
                if (count + schedule.length > 16) {
                    return res.status(400).json({ error: "Es können maximal 16 Mitarbeiter pro Tag hinzugefügt werden." });
                }

                for (const entry of schedule) {
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
                    } = entry;

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
                            termineDescription,
                            dayOfWeek
                        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
                        dayOfWeek
                    ];

                    await pool.query(sql, values);
                }
            }

            res.status(201).json({ message: "Daten erfolgreich erstellt und in die Datenbank gespeichert." });
        } catch (error) {
            console.error("Fehler beim Erstellen der Daten:", error);
            res.status(500).json({ error: "Fehler beim Erstellen der Daten und Speichern in der Datenbank." });
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
                middayFrom,
                middayTo,
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
                    middayFrom = ?,
                    middayTo = ?,
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
                middayFrom,
                middayTo,
                afternoon,
                termineFrom,
                termineTo,
                termineDescription,
                dayOfWeek,
                id
            ];

            await pool.query(sql, values);

            res.json({
                status: "success",
                message: "Daten erfolgreich aktualisiert."
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
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
            res.status(500).json({
                status: "error",
                message: "Eintrag konnte nicht gelöscht werden."
            });
        }
    }
};

module.exports = PausenController;
