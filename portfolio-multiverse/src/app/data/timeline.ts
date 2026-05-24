export interface TimelineItem {
  date: string;
  title: string;
  company: string;
  description: string;
  type: "work" | "education" | "achievement";
}

export const timeline: TimelineItem[] = [
  {
    date: "2025 — Atual",
    title: "Atendimento e Suporte Técnico",
    company: "Conecte Telecom",
    description:
      "Suporte ao cliente em serviços de internet fibra óptica. Resolução de demandas, sistemas internos e trabalho junto à equipe técnica. Em paralelo, desenvolvendo a landing page e sistema interno da empresa.",
    type: "work",
  },
  {
    date: "2025 — Atual",
    title: "Análise e Desenvolvimento de Sistemas",
    company: "ULBRA Torres",
    description:
      "Graduação em ADS com foco em front-end, lógica de programação e banco de dados. Aplicando o aprendizado em projetos reais desde o primeiro semestre.",
    type: "education",
  },
  {
    date: "2023 — 2025",
    title: "Atendimento e Operações",
    company: "Agrocenter",
    description:
      "Atendimento ao cliente, organização de produtos e controle de estoque. Experiência em ambiente dinâmico e trabalho em equipe.",
    type: "work",
  },
  {
    date: "2022 — 2023",
    title: "Atendimento e Serviços Técnicos",
    company: "Casa das Chaves",
    description:
      "Atendimento, negociação e serviços técnicos como cópia de chaves e configuração de controles remotos. Primeira experiência com resolução técnica de problemas.",
    type: "work",
  },
  {
    date: "2026",
    title: "Certificações — HTML5, CSS3, Git, GitHub e Marketing Digital",
    company: "Curso em Vídeo",
    description:
      "Conclusão de módulos práticos de HTML5, CSS3, Git, GitHub e Marketing Digital. Estudando por fora da faculdade para acelerar a evolução.",
    type: "achievement",
  },
];
