const pool = require("../database/index");

const mitarbeiterController = {
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("SELECT * FROM mitarbeiter");
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
            const [rows, fields] = await pool.query("SELECT * FROM mitarbeiter WHERE id = ?", [id]);
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
                geschlecht,
                vorname,
                nachname,
                adresse,
                postleitzahl,
                ort,
                email,
                mobil,
                benutzername,
                passwort,
                iban
            } = req.body;

            const mitarbeiternummer = generateRandomMitarbeiternummer();

            const sql = `
                INSERT INTO mitarbeiter (
                    mitarbeiternummer,
                    geschlecht,
                    vorname,
                    nachname,
                    adresse,
                    postleitzahl,
                    ort,
                    email,
                    mobil,
                    benutzername,
                    passwort,
                    iban
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

            const values = [
                mitarbeiternummer,
                geschlecht,
                vorname,
                nachname,
                adresse,
                postleitzahl,
                ort,
                email,
                mobil,
                benutzername,
                passwort,
                iban
            ];

            const [result] = await pool.query(sql, values);

            res.json({
                data: {
                    id: result.insertId,
                    mitarbeiternummer: mitarbeiternummer
                }
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
            const {
                geschlecht,
                vorname,
                nachname,
                adresse,
                postleitzahl,
                ort,
                email,
                mobil,
                benutzername,
                passwort,
                iban
            } = req.body;

            const { id } = req.params;

            const sql = `
                UPDATE mitarbeiter 
                SET 
                    geschlecht = ?, 
                    vorname = ?, 
                    nachname = ?, 
                    adresse = ?, 
                    postleitzahl = ?, 
                    ort = ?, 
                    email = ?, 
                    mobil = ?, 
                    benutzername = ?, 
                    passwort = ?, 
                    iban = ?
                WHERE 
                    id = ?
            `;

            const values = [
                geschlecht,
                vorname,
                nachname,
                adresse,
                postleitzahl,
                ort,
                email,
                mobil,
                benutzername,
                passwort,
                iban,
                id
            ];

            const [result] = await pool.query(sql, values);

            res.json({
                status: "success",
                message: "Eintrag erfolgreich aktualisiert"
            });
        } catch (error) {
            console.error(error);
            res.json({
                status: "error",
                message: "Eintrag konnte nicht aktualisiert werden"
            });
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const [rows, fields] = await pool.query("DELETE FROM mitarbeiter WHERE id = ?", [id]);
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

// Funktion zur Generierung einer zufälligen Mitarbeiter-Nummer
function generateRandomMitarbeiternummer() {
    return Math.floor(Math.random() * 1000000) + 1;
}

module.exports = mitarbeiterController;
