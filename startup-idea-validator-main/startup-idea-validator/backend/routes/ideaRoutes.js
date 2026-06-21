import express from "express";
import { analyze, getHistory, getOne } from "../controllers/ideaController.js";

const router = express.Router();

router.post("/analyze", analyze);
router.get("/history", getHistory);
router.get("/:id", getOne);

export default router;
