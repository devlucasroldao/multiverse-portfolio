export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  url?: string;
  github?: string;
  featured: boolean;
  color: string;
  status?: string;
}

export const projects: Project[] = [
  {
    id: "lu-perfumes",
    title: "Lú Perfumes & Presentes",
    description:
      "Catálogo online onde o usuário explora produtos, monta seu kit personalizado e tem uma experiência de compra única. Foco em UI/UX e responsividade.",
    tags: ["HTML5", "CSS3", "JavaScript"],
    github: "https://github.com/devlucasroldao/lu-perfumes-v2",
    featured: true,
    color: "#52B788",
    status: "Em desenvolvimento",
  },
  {
    id: "conecte-telecom",
    title: "Conecte Telecom",
    description:
      "Landing page profissional para provedor de internet fibra óptica. Design limpo, foco em conversão e área do cliente em desenvolvimento.",
    tags: ["Next.js", "TailwindCSS", "Vercel"],
    github: "https://github.com/devlucasroldao/conecte-landing",
    featured: true,
    color: "#415A77",
    status: "Em desenvolvimento",
  },
  {
    id: "netdesk",
    title: "NetDesk",
    description:
      "Sistema de gerenciamento para provedores de internet. Controle de clientes, chamados e operações internas em uma interface moderna.",
    tags: ["JavaScript", "SQL", "CSS3"],
    github: "https://github.com/devlucasroldao/netdesk",
    featured: true,
    color: "#778DA9",
    status: "Em desenvolvimento",
  },
  {
    id: "multiverse-portfolio",
    title: "Portfolio Multiverso",
    description:
      "O próprio portfólio que você está navegando agora. 8 universos visuais completos, transições cinematográficas e easter eggs escondidos.",
    tags: ["Next.js", "React", "TailwindCSS", "Framer Motion"],
    github: "https://github.com/devlucasroldao/multiverse-portfolio",
    featured: true,
    color: "#52B788",
    status: "Em desenvolvimento",
  },
  {
    id: "site-time-futebol",
    title: "Landing Page — Time de Futebol",
    description:
      "Interface web responsiva construída 100% do zero, sem frameworks. CSS manual intenso para garantir fidelidade visual e boa experiência.",
    tags: ["HTML5", "CSS3", "JavaScript"],
    github: "https://github.com/devlucasroldao/site-time-da-vila",
    featured: false,
    color: "#2d6a4f",
    status: "Concluído",
  },
];
