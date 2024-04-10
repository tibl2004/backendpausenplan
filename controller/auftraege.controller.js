const pool = require("../database/index");

const auftraegeController = {
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("SELECT * FROM auftraege");
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
            const [rows, fields] = await pool.query("SELECT * FROM auftraege WHERE id = ?", [id]);
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
                kundenId,
                auftragsTyp,
                auftragsBeschreibung
            } = req.body;

            const auftragsNummer = generateRandomAuftragsNummer();

            const sql = `
                INSERT INTO auftraege (
                    kundenId,
                    auftragsNummer,
                    auftragsTyp, 
                    auftragsBeschreibung
                ) VALUES (?, ?, ?, ?)
            `;

            const values = [
                kundenId,
                auftragsNummer,
                auftragsTyp,
                auftragsBeschreibung
            ];

            const [result] = await pool.query(sql, values);

            res.json({
                data: {
                    id: result.insertId,
                    auftragsNummer: auftragsNummer
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
                auftragsTyp,
                auftragsBeschreibung
            } = req.body;

            const { id } = req.params;

            const sql = `
                UPDATE auftraege 
                SET 
                    auftragsTyp = ?, 
                    auftragsBeschreibung = ? 
                WHERE 
                    id = ?
            `;

            const values = [
                auftragsTyp,
                auftragsBeschreibung,
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
            const [rows, fields] = await pool.query("DELETE FROM auftraege WHERE id = ?", [id]);
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

// Funktion zur Generierung einer zufälligen Auftragsnummer
function generateRandomAuftragsNummer() {
    return Math.floor(Math.random() * 1000000) + 1;
}

module.exports = auftraegeController;
