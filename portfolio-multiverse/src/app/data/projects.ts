export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  url?: string;
  github?: string;
  featured: boolean;
  color: string;
}

export const projects: Project[] = [
  {
    id: "saas-dashboard",
    title: "SaaS Analytics Dashboard",
    description:
      "Plataforma de analytics com visualizações em tempo real, segmentação de usuários e relatórios customizáveis para startups B2B.",
    tags: ["Next.js", "TypeScript", "Recharts", "Prisma", "PostgreSQL"],
    url: "https://dashboard.exemplo.com",
    github: "https://github.com/seunome/saas-dashboard",
    featured: true,
    color: "#6366F1",
  },
  {
    id: "ecommerce-growth",
    title: "E-commerce Growth Engine",
    description:
      "Sistema de automação de marketing para e-commerces: recuperação de carrinho, e-mails segmentados e A/B testing integrado.",
    tags: ["React", "Node.js", "SendGrid", "Redis", "AWS"],
    url: "https://growth.exemplo.com",
    github: "https://github.com/seunome/growth-engine",
    featured: true,
    color: "#22D3EE",
  },
  {
    id: "design-system",
    title: "Design System Open Source",
    description:
      "Biblioteca de componentes React acessível com Storybook, temas dinâmicos e documentação interativa. +500 stars no GitHub.",
    tags: ["React", "Storybook", "Radix UI", "CSS Variables", "WCAG"],
    github: "https://github.com/seunome/design-system",
    featured: false,
    color: "#F472B6",
  },
  {
    id: "ai-content",
    title: "AI Content Studio",
    description:
      "Ferramenta de criação de conteúdo com IA: geração de posts, scripts de vídeo e copy de ads otimizados por verticais.",
    tags: ["Python", "FastAPI", "OpenAI", "React", "TailwindCSS"],
    url: "https://studio.exemplo.com",
    github: "https://github.com/seunome/ai-content",
    featured: false,
    color: "#D4943A",
  },
];
