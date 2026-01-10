import express from "express";
import { inventoryController } from "./main";

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.post(
    "/inventory/movements",
    inventoryController.registerMovement.bind(inventoryController)
);

// Health check
app.get("/health", (_, res) => {
    res.status(200).json({ status: "ok" });
});

// Start server
const PORT = process.env.PORT || 4000;


app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
