import "dotenv/config";
import express from "express";
import { buildApp } from "./main";

const app = buildApp();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
