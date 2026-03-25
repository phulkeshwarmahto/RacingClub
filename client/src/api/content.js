import { http } from "./http";

export const fetchHomeContent = async () => {
  const { data } = await http.get("/content/home");
  return data;
};

export const fetchAchievements = async () => {
  const { data } = await http.get("/content/achievements");
  return data;
};

export const fetchDepartments = async () => {
  const { data } = await http.get("/content/departments");
  return data;
};

export const fetchSponsorship = async () => {
  const { data } = await http.get("/content/sponsorship");
  return data;
};

export const submitContact = async (payload) => {
  const { data } = await http.post("/contact", payload);
  return data;
};
