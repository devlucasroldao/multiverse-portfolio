export interface StackItem {
  name: string;
  icon: string;
  level: number;
  category: "frontend" | "backend" | "design" | "devops" | "marketing";
}

export const stack: StackItem[] = [
  { name: "React / Next.js",       icon: "⚛️", level: 95, category: "frontend"  },
  { name: "TypeScript",            icon: "TS", level: 90, category: "frontend"  },
  { name: "Tailwind CSS",          icon: "🎨", level: 92, category: "frontend"  },
  { name: "Framer Motion",         icon: "✦",  level: 80, category: "frontend"  },
  { name: "Vue.js",                icon: "💚", level: 70, category: "frontend"  },
  { name: "Node.js",               icon: "🟢", level: 85, category: "backend"   },
  { name: "Python / FastAPI",      icon: "🐍", level: 78, category: "backend"   },
  { name: "PostgreSQL",            icon: "🐘", level: 82, category: "backend"   },
  { name: "Prisma",                icon: "◆",  level: 85, category: "backend"   },
  { name: "Redis",                 icon: "🔴", level: 72, category: "backend"   },
  { name: "Figma",                 icon: "🖼️", level: 88, category: "design"    },
  { name: "Design Systems",        icon: "⬡",  level: 85, category: "design"    },
  { name: "UI/UX Research",        icon: "🔍", level: 78, category: "design"    },
  { name: "Motion Design",         icon: "🌀", level: 70, category: "design"    },
  { name: "Docker",                icon: "🐳", level: 75, category: "devops"    },
  { name: "AWS / Vercel",          icon: "☁️", level: 80, category: "devops"    },
  { name: "GitHub Actions",        icon: "⚙️", level: 77, category: "devops"    },
  { name: "Growth Hacking",        icon: "📈", level: 88, category: "marketing" },
  { name: "SEO Técnico",           icon: "🔎", level: 82, category: "marketing" },
  { name: "Ads (Meta / Google)",   icon: "📢", level: 80, category: "marketing" },
  { name: "Analytics & CRO",       icon: "📊", level: 85, category: "marketing" },
];
