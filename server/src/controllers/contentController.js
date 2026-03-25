import { Achievement } from "../models/Achievement.js";
import { Department } from "../models/Department.js";
import { HomeContent } from "../models/HomeContent.js";
import { SponsorLogo } from "../models/SponsorLogo.js";
import { SponsorPoint } from "../models/SponsorPoint.js";

export const getHomeContent = async (_req, res, next) => {
  try {
    const content = await HomeContent.findOne().lean();
    res.json(content || {});
  } catch (error) {
    next(error);
  }
};

export const getAchievements = async (_req, res, next) => {
  try {
    const items = await Achievement.find().sort({ order: 1 }).lean();
    res.json(items);
  } catch (error) {
    next(error);
  }
};

export const getDepartments = async (_req, res, next) => {
  try {
    const items = await Department.find().sort({ order: 1 }).lean();
    res.json(items);
  } catch (error) {
    next(error);
  }
};

export const getSponsorship = async (_req, res, next) => {
  try {
    const [whySponsor, reach, logos] = await Promise.all([
      SponsorPoint.find({ section: "why_sponsor" }).sort({ order: 1 }).lean(),
      SponsorPoint.find({ section: "reach" }).sort({ order: 1 }).lean(),
      SponsorLogo.find().sort({ order: 1 }).lean()
    ]);

    res.json({ whySponsor, reach, logos });
  } catch (error) {
    next(error);
  }
};
