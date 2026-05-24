export type ThemeId =
  | "default"
  | "retro2000"
  | "western"
  | "cyberpunk"
  | "arcade"
  | "oldfilm"
  | "sketch"
  | "rpg";

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  url?: string;
  github?: string;
  image?: string;
  featured: boolean;
  color: string;
  status?: string;
}

export interface StackItem {
  name: string;
  icon: string;
  level: number; // 0–100
  category: "frontend" | "backend" | "design" | "devops" | "marketing";
}

export interface TimelineItem {
  date: string;
  title: string;
  company: string;
  description: string;
  type: "work" | "education" | "achievement";
}
