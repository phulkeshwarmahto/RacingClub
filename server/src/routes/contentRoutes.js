import { Router } from "express";
import {
  getAchievements,
  getDepartments,
  getHomeContent,
  getSponsorship
} from "../controllers/contentController.js";

const router = Router();

router.get("/home", getHomeContent);
router.get("/achievements", getAchievements);
router.get("/departments", getDepartments);
router.get("/sponsorship", getSponsorship);

export default router;
