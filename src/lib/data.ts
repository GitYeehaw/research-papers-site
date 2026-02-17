import { CategoryData } from "@/types";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

export function getCategoryData(category: string): CategoryData {
  const filePath = path.join(DATA_DIR, `${category}.json`);
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as CategoryData;
  } catch {
    return {
      category,
      name: category,
      description: "",
      scraped_at: new Date().toISOString(),
      paper_count: 0,
      papers: [],
    };
  }
}

export function getAllCategories(): string[] {
  return ["cs", "physics", "biology", "electrochem"];
}

export function getAllCategoryData(): Record<string, CategoryData> {
  const categories = getAllCategories();
  const data: Record<string, CategoryData> = {};
  for (const cat of categories) {
    data[cat] = getCategoryData(cat);
  }
  return data;
}
