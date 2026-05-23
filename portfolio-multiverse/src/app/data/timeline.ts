export interface TimelineItem {
  date: string;
  title: string;
  company: string;
  description: string;
  type: "work" | "education" | "achievement";
}

export const timeline: TimelineItem[] = [
  {
    date: "2023 — Presente",
    title: "Tech Lead & Growth Engineer",
    company: "Startup XYZ",
    description:
      "Lidero um time de 4 desenvolvedores, arquitetando a plataforma principal e implementando estratégias de growth que aumentaram o MRR em 180% em 12 meses.",
    type: "work",
  },
  {
    date: "2021 — 2023",
    title: "Desenvolvedor Full Stack Sênior",
    company: "Agência ABC Digital",
    description:
      "Desenvolvi +30 projetos web para clientes enterprise, com foco em performance e UX. Stack principal: React, Node.js e AWS.",
    type: "work",
  },
  {
    date: "2020",
    title: "1º Lugar — Hackathon de Inovação",
    company: "Tech Conference Brasil",
    description:
      "Projeto de plataforma de microlearning com IA ganhou primeiro lugar entre 120 times. Desenvolvido em 48 horas com React, Python e GPT-3.",
    type: "achievement",
  },
  {
    date: "2018 — 2021",
    title: "Bacharelado em Ciência da Computação",
    company: "Universidade Federal",
    description:
      "Formação com ênfase em engenharia de software e sistemas distribuídos. Iniciação científica em processamento de linguagem natural.",
    type: "education",
  },
  {
    date: "2017 — 2018",
    title: "Desenvolvedor Front-end Júnior",
    company: "FreelanceHub",
    description:
      "Primeiros passos no mercado: sites institucionais, landing pages e automações simples. Aprendi a entregar resultado real para clientes reais.",
    type: "work",
  },
];
