const express = require('express');
const path = require('path');
const qr = require('qrcode');

const app = express();

// Middleware to parse form data
app.use(express.urlencoded({ extended: false }));

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Serve static files from /public
app.use(express.static(path.join(__dirname, 'public')));

// Home route
app.get('/', (req, res) => {
    res.render('index', { qrCode: null });
});

// Form submit route
app.post('/generate', async (req, res) => {
    const url = req.body.url;

    if (!url) return res.send('Please enter a valid URL');

    try {
        const qrCode = await qr.toDataURL(url);
        res.render('index', { qrCode });
    } catch (err) {
        console.error(err);
        res.send('Error generating QR code');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
