export const contact = {
  headline: ["LET'S", "BUILD", "SOMETHING"],
  subheading: "Have an idea, project, or collaboration? Let's turn it into something real.",
  email: "lamibalsukma@gmail.com",
  availability: "AVAILABLE FOR WORK",
  terminalPrompt: "> HELLO WIJAYA_",
  cta: "START A CONVERSATION",
  ctaSecondary: "VIEW PROJECTS",
};

export const contactLinks = [
  { label: "EMAIL", value: "lamibalsukma@gmail.com", href: "mailto:lamibalsukma@gmail.com" },
  { label: "INSTAGRAM", value: "lamibalsukma", href: "https://instagram.com/lamibalsukma" },
  { label: "FACEBOOK", value: "lamibalsukma", href: "https://facebook.com/lamibalsukma" },
  { label: "TIKTOK", value: "lamibalsukma", href: "https://tiktok.com/@lamibalsukma" },
  { label: "WEBSITE", value: "www.lamibalsukma.com", href: "https://lamibalsukma.com" },
];

export const navItems = [
  { label: "ABOUT", href: "#about" },
  { label: "JOURNEY", href: "#journey" },
  { label: "SKILLS", href: "#skills" },
  { label: "WORK", href: "#work" },
  { label: "PROJECTS", href: "#projects" },
  { label: "CONTACT", href: "#contact" },
];

export const sectionIds = [
  "hero",
  "about",
  "journey",
  "skills",
  "work",
  "projects",
  "case-study",
  "education",
  "achievements",
  "creative-lab",
  "manifesto",
  "contact",
] as const;

export type SectionId = (typeof sectionIds)[number];
