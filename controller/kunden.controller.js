const nodemailer = require('nodemailer');
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

            await pool.query(sql, values);

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
            await pool.query("DELETE FROM kunden WHERE id = ?", [id]);
            res.json({
                status: "success",
                message: "Eintrag erfolgreich gelöscht"
            });
        } catch (error) {
            console.error(error);
            res.json({
                status: "error",
                message: "Eintrag konnte nicht gelöscht werden"
            });
        }
    }
};

// Funktion zur Generierung einer zufälligen Kundennummer
function generateRandomKundennummer() {
    return Math.floor(Math.random() * 1000000) + 1;
}

async function sendEmail(vorname, nachname, email, auftragsBeschreibung, arbeitszeit) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'tbs.digital.solutions@gmail.com', // Ihre E-Mail-Adresse hier
            pass: 'your-email-password' // Ihr E-Mail-Passwort hier
        }
    });

    const mailOptions = {
        from: 'service@tb-innovations.com',
        to: 'tbs.digital.solutions@gmail.com',
        subject: 'Neue Anfrage von Ihrem Kontaktformular',
        text: `
            Vorname: ${vorname}\n
            Nachname: ${nachname}\n
            Email: ${email}\n
            Auftragsbeschreibung: ${auftragsBeschreibung}\n
            Arbeitszeit: ${arbeitszeit}
        `
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Fehler beim Senden der E-Mail:', error);
    }
}

module.exports = kundenController;
