const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

// Dummy product database
const products = [
    { barcode: "6291106487862", name: "Coca Cola 500ml", price: 8 },
    { barcode: "4006000083353", name: "Pepsi 330ml", price: 6 },
    { barcode: "6290360373652", name: "Indomie Noodles", price: 3 },
    { barcode: "6291108328019", name: "Milk Powder 1kg", price: 25 },
];

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// API: get product by barcode
app.get("/api/product/:barcode", (req, res) => {
    const { barcode } = req.params;
    console.log(`Received request for barcode: ${barcode}`);
    const product = products.find(p => p.barcode === barcode);

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }
    console.log(product);
    res.json(product);
});

app.listen(3000, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:3000`);
});