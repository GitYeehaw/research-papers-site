export interface Paper {
  id: string;
  title: string;
  authors: string[];
  abstract: string;
  url: string;
  pdf_url: string;
  published: string;
  updated: string;
  categories: string[];
  primary_category: string;
}

export interface CategoryData {
  category: string;
  name: string;
  description: string;
  scraped_at: string;
  paper_count: number;
  papers: Paper[];
}
