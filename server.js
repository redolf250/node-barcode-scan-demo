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
    { barcode: "6036000192418", name: "Eden Yuan", price: 25 },
];

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));



app.get("/gps", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/zxing", (req, res) => {
    res.sendFile(path.join(__dirname, "zxing.html"));
});


// API: get product by barcode
app.get("/api/product/:barcode", (req, res) => {
    const { barcode } = req.params;

    // const building = turf.polygon([[
    //                                 [-0.1868, 5.6041],
    //                                 [-0.1862, 5.6041],
    //                                 [-0.1862, 5.6037],
    //                                 [-0.1868, 5.6037],
    //                                 [-0.1868, 5.6041]  // close the polygon
    //                                 ]]);

    console.log(`Received request for barcode: ${barcode}`);
    const product = products.find(p => p.barcode === barcode);

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }
    console.log(product);
    res.json(product);
});

app.post("/api/scan", (req, res) => {
   
    console.log(req.body);
    res.json( { barcode: "6291108328019", name: "Milk Powder 1kg", price: 25 });
});

app.listen(3000, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:3000`);
});

