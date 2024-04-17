const pool = require("../database/index");

const kundenController = {
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("SELECT *, arbeitszeit FROM kunden");
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
            const [rows, fields] = await pool.query("SELECT *, arbeitszeit FROM kunden WHERE id = ?", [id]);
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
                vorname,
                nachname,
                strasseHausnummer,
                postleitzahl,
                ort,
                email,
                telefon,
                mobil,
                geschlecht,
                auftragsTyp,
                auftragsBeschreibung,
                arbeitszeit,
                budget,
                zweck,
                speicherkapazität,
                ram,
                kühlung,
                gehäuse,
                rechnungGestellt,
                rechnungBezahlt
            } = req.body;

            const kundennummer = generateRandomKundennummer();

            // Umwandlung der JSON-Daten in Text
            const auftragsBeschreibungText = JSON.stringify(auftragsBeschreibung);
            const arbeitszeitText = JSON.stringify(arbeitszeit);

            const sql = `
                INSERT INTO kunden (
                    kundennummer,
                    vorname, 
                    nachname, 
                    strasseHausnummer, 
                    postleitzahl, 
                    ort, 
                    email, 
                    telefon, 
                    mobil, 
                    geschlecht,
                    auftragsTyp,
                    auftragsBeschreibung,
                    arbeitszeit,
                    budget,
                    zweck,
                    speicherkapazität,
                    ram,
                    kühlung,
                    gehäuse,
                    rechnungGestellt,
                    rechnungBezahlt
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

            const values = [
                kundennummer,
                vorname,
                nachname,
                strasseHausnummer,
                postleitzahl,
                ort,
                email,
                telefon,
                mobil,
                geschlecht,
                auftragsTyp,
                auftragsBeschreibungText, // Hier wird der umgewandelte Text verwendet
                arbeitszeitText, // Hier wird der umgewandelte Text verwendet
                budget,
                zweck,
                speicherkapazität,
                ram,
                kühlung,
                gehäuse,
                rechnungGestellt,
                rechnungBezahlt
            ];

            await pool.query(sql, values);

            res.status(201).json({ message: "Kunde erfolgreich erstellt." });
        } catch (error) {
            console.error("Fehler beim Erstellen des Kunden:", error);
            res.status(500).json({ error: "Fehler beim Erstellen des Kunden." });
        }
    },
    update: async (req, res) => {
        try {
            const {
                vorname,
                nachname,
                strasseHausnummer,
                postleitzahl,
                ort,
                email,
                telefon,
                mobil,
                geschlecht,
                auftragsTyp,
                auftragsBeschreibung,
                arbeitszeit, // Neu hinzugefügt: Arbeitszeit aus dem Request Body
                budget, // Neu hinzugefügt: Budget aus dem Request Body
                zweck,
                speicherkapazität,
                ram,
                kühlung,
                gehäuse,
                rechnungGestellt,
                rechnungBezahlt
            } = req.body;

            const { id } = req.params;

            const sql = `
                UPDATE kunden 
                SET 
                    vorname = ?, 
                    nachname = ?, 
                    strasseHausnummer = ?, 
                    postleitzahl = ?, 
                    ort = ?, 
                    email = ?, 
                    telefon = ?, 
                    mobil = ?, 
                    geschlecht = ?, 
                    auftragsTyp = ?, 
                    auftragsBeschreibung = ?,
                    arbeitszeit = ?,
                    budget = ?,
                    zweck = ?,
                    speicherkapazität = ?,
                    ram = ?,
                    kühlung = ?,
                    gehäuse = ?,
                    rechnungGestellt = ?,
                    rechnungBezahlt = ?
                WHERE 
                    id = ?
            `;

            const values = [
                vorname,
                nachname,
                strasseHausnummer,
                postleitzahl,
                ort,
                email,
                telefon,
                mobil,
                geschlecht,
                auftragsTyp,
                JSON.stringify(auftragsBeschreibung),
                JSON.stringify(arbeitszeit),
                budget,
                zweck,
                speicherkapazität,
                ram,
                kühlung,
                gehäuse,
                rechnungGestellt,
                rechnungBezahlt,
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
            const [rows, fields] = await pool.query("DELETE FROM kunden WHERE id = ?", [id]);
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

// Funktion zur Generierung einer zufälligen Kundennummer
function generateRandomKundennummer() {
    return Math.floor(Math.random() * 1000000) + 1;
}

module.exports = kundenController;
