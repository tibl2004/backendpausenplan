const nodemailer = require('nodemailer');
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
            const [rows, fields] = await pool.query("SELECT * FROM kunden WHERE id = ?", [id]);
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

            // Senden der E-Mail
            await sendEmail(vorname, nachname, email, auftragsBeschreibung, arbeitszeit);

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

            const { id } = req.params;

            const auftragsBeschreibungText = JSON.stringify(auftragsBeschreibung);
            const arbeitszeitText = JSON.stringify(arbeitszeit);

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
                auftragsBeschreibungText,
                arbeitszeitText,
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

            await pool.query(sql, values);

            res.json({
                status: "success",
                message: "Kunde erfolgreich aktualisiert."
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
            await pool.query("DELETE FROM kunden WHERE id = ?", [id]);
            res.json({
                status: "success",
                message: "Kunde erfolgreich gelöscht."
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
