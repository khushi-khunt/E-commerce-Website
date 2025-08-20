import express from "express";
import { getAllLocations, saveLocation } from "../controllers/user/locationController.js";

const router = express.Router();

router.post("/user/locations", saveLocation);
router.get("/admin/locations",getAllLocations)

export default router;
