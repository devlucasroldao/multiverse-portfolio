export interface StackItem {
  name: string;
  icon: string;
  level: number;
  category: "frontend" | "backend" | "design" | "devops" | "marketing";
}

export const stack: StackItem[] = [
  // Frontend
  { name: "HTML5",             icon: "🌐", level: 80, category: "frontend"  },
  { name: "CSS3",              icon: "🎨", level: 75, category: "frontend"  },
  { name: "JavaScript",        icon: "⚡", level: 65, category: "frontend"  },
  { name: "Next.js",           icon: "▲",  level: 40, category: "frontend"  },
  { name: "TailwindCSS",       icon: "💨", level: 55, category: "frontend"  },
  // Backend / Linguagens
  { name: "Python",            icon: "🐍", level: 60, category: "backend"   },
  { name: "Java",              icon: "☕", level: 50, category: "backend"   },
  { name: "C#",                icon: "🔷", level: 30, category: "backend"   },
  { name: "SQL",               icon: "🗄️", level: 45, category: "backend"   },
  // Ferramentas
  { name: "Git",               icon: "🌿", level: 65, category: "devops"    },
  { name: "GitHub",            icon: "🐙", level: 65, category: "devops"    },
  { name: "Vercel",            icon: "▲",  level: 50, category: "devops"    },
  // Design / Criação
  { name: "Figma",             icon: "🖼️", level: 40, category: "design"    },
  { name: "Edição de Vídeo",   icon: "🎬", level: 60, category: "design"    },
  // IA
  { name: "ChatGPT",           icon: "🤖", level: 85, category: "marketing" },
  { name: "Claude",            icon: "🧠", level: 90, category: "marketing" },
  { name: "Gemini",            icon: "✨", level: 75, category: "marketing" },
  { name: "Marketing Digital", icon: "📈", level: 55, category: "marketing" },
];
