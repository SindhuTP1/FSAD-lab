
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

let inventory = [
    { id: 1, prodname: "prod1", qty: 12, price: 12 },
    { id: 2, prodname: "prod2", qty: 1, price: 13 },
    { id: 3, prodname: "prod3", qty: 10, price: 14 },
    { id: 4, prodname: "prod4", qty: 19, price: 16 }
];

// GET API
app.get('/', (req, res) => {
    res.json(inventory);
});

// POST API
app.post('/add', (req, res) => {

    try {
        const { id, prodname, qty, price } = req.body;

        if (
            id === undefined ||
            !prodname ||
            qty === undefined ||
            price === undefined
        ) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const invent = {
            id: Number(id),
            prodname: prodname,
            qty: Number(qty),
            price: Number(price)
        };

        inventory.push(invent);

        console.log("Inventory added:", invent);

        res.status(201).json(inventory);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Error adding inventory"
        });
    }
});

// Start server
app.listen(8000, () => {
    console.log('Express is working at http://localhost:8000');
});
