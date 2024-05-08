const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://loginsignup:loginsignup@cluster0.onczylu.mongodb.net/blockchain?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Wallet = mongoose.model('Wallet', {
    address: String,
});

app.get('/wallet', async (req, res) => {
    const { address } = req.query;

    try {
        const wallet = await Wallet.findOne({ address });
        res.json(!!wallet);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/wallet', async (req, res) => {
    const { address } = req.body;
    try {
        const wallet = new Wallet({ address });
        await wallet.save();
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
