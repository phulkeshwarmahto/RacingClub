import dotenv from "dotenv";
import { connectDB } from "../config/db.js";
import { HomeContent } from "../models/HomeContent.js";
import { Achievement } from "../models/Achievement.js";
import { Department } from "../models/Department.js";
import { SponsorPoint } from "../models/SponsorPoint.js";
import { SponsorLogo } from "../models/SponsorLogo.js";
import {
  achievements,
  departments,
  homeContent,
  sponsorLogos,
  sponsorReasons
} from "./seedContent.js";

dotenv.config();

const seed = async () => {
  try {
    await connectDB();

    await HomeContent.deleteMany({});
    await Achievement.deleteMany({});
    await Department.deleteMany({});
    await SponsorPoint.deleteMany({});
    await SponsorLogo.deleteMany({});

    await HomeContent.create(homeContent);
    await Achievement.insertMany(achievements);
    await Department.insertMany(departments);
    await SponsorPoint.insertMany(sponsorReasons);
    await SponsorLogo.insertMany(sponsorLogos);

    console.log("Database seeded");
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }
};

seed();
