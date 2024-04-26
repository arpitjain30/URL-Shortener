import express from "express";
import {
    handleWelcome,
    handleAndGenerateShortID,
    handleAnalytics,
}from"../Controller/Controller.js";

const router = express.Router();

router.get("/", handleWelcome);
router.post("/submit", handleAndGenerateShortID);
router.get("/analytics/:id", handleAnalytics);

export default router;