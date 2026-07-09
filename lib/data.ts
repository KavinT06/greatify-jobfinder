export type Region = "remote" | "usa" | "europe" | "asia";

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship";
  regions: Region[];
  tags: string[];
  description: string;
  postedAt: string;
  salary?: string;
}

export const JOBS: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Engineer",
    company: "Linear",
    location: "Remote · USA",
    type: "Full-time",
    regions: ["remote", "usa"],
    tags: ["React", "TypeScript", "Design Systems"],
    description:
      "We're looking for a Senior Frontend Engineer to help build the next generation of project management tools. You'll work closely with design and product to ship polished, performant interfaces that our users love. Experience with design systems, accessibility, and animation is a plus.",
    postedAt: "2h ago",
    salary: "$150k – $190k",
  },
  {
    id: "2",
    title: "Product Designer",
    company: "Notion",
    location: "Chennai, India",
    type: "Full-time",
    regions: ["asia"],
    tags: ["Figma", "Prototyping", "User Research"],
    description:
      "Join Notion's product design team to shape how millions of people organize their work and lives. You'll own end-to-end design for core features, from research through to pixel-perfect implementation. Strong systems thinking and a portfolio that demonstrates craft are essential.",
    postedAt: "4h ago",
    salary: "₹18L – ₹28L",
  },
  {
    id: "3",
    title: "Full Stack Engineer",
    company: "Stripe",
    location: "Remote · Europe",
    type: "Full-time",
    regions: ["remote", "europe"],
    tags: ["Next.js", "Node.js", "PostgreSQL"],
    description:
      "Help build the economic infrastructure for the internet. As a Full Stack Engineer at Stripe, you'll work on the dashboards and tools that millions of businesses use daily. We value clear thinking, strong technical fundamentals, and a bias toward shipping.",
    postedAt: "1d ago",
    salary: "€90k – €120k",
  },
  {
    id: "4",
    title: "Backend Engineer",
    company: "Vercel",
    location: "Remote · Global",
    type: "Full-time",
    regions: ["remote"],
    tags: ["Go", "Kubernetes", "AWS"],
    description:
      "Vercel is hiring a Backend Engineer to work on the deployment infrastructure that powers the modern web. You'll design and build systems that handle millions of deployments per month. Deep knowledge of distributed systems and cloud infrastructure is required.",
    postedAt: "1d ago",
    salary: "$140k – $180k",
  },
  {
    id: "5",
    title: "Design Systems Lead",
    company: "Figma",
    location: "Bangalore, India",
    type: "Full-time",
    regions: ["asia"],
    tags: ["Tokens", "React", "Accessibility"],
    description:
      "Lead the design systems team at Figma and define the component library that powers our product. You'll bridge design and engineering, establish token standards, and ensure consistency across every surface. A strong opinion on component API design is a must.",
    postedAt: "3d ago",
    salary: "₹35L – ₹50L",
  },
  {
    id: "6",
    title: "Staff Engineer",
    company: "Loom",
    location: "Remote · USA",
    type: "Full-time",
    regions: ["remote", "usa"],
    tags: ["Architecture", "TypeScript", "GraphQL"],
    description:
      "As a Staff Engineer at Loom, you'll set technical direction for the frontend platform. Responsibilities include architecture decisions, mentoring senior engineers, and shipping high-impact features across the video messaging product. Experience leading technical initiatives at scale is expected.",
    postedAt: "5d ago",
    salary: "$180k – $220k",
  },
  {
    id: "7",
    title: "Frontend Intern",
    company: "Shopify",
    location: "Coimbatore, India",
    type: "Internship",
    regions: ["asia"],
    tags: ["React", "Polaris", "GraphQL"],
    description:
      "Spend your internship building real features used by millions of merchants. You'll be paired with a senior mentor and ship production code from week one. We look for curiosity, strong fundamentals in HTML/CSS/JS, and eagerness to learn React at scale.",
    postedAt: "6h ago",
    salary: "₹40k/month",
  },
  {
    id: "8",
    title: "Contract UI Developer",
    company: "Basecamp",
    location: "Remote · Global",
    type: "Contract",
    regions: ["remote"],
    tags: ["HTML", "CSS", "Accessibility"],
    description:
      "We need a contract UI developer for a 3-month engagement to overhaul our settings and onboarding flows. You should have an exceptional eye for detail, deep CSS knowledge, and experience shipping accessible interfaces. Bonus if you've worked with Hotwire.",
    postedAt: "2d ago",
    salary: "$70/hr",
  },
  {
    id: "9",
    title: "Part-time React Developer",
    company: "Cal.com",
    location: "Remote · Europe",
    type: "Part-time",
    regions: ["remote", "europe"],
    tags: ["React", "Next.js", "tRPC"],
    description:
      "Cal.com is hiring a part-time React developer to help maintain and extend our open-source scheduling platform. You'll work 20 hours per week on feature development, bug fixes, and community contributions. Familiarity with the Next.js App Router and tRPC is ideal.",
    postedAt: "8h ago",
    salary: "€40k – €55k (pro-rated)",
  },
  {
    id: "10",
    title: "Mobile Engineer",
    company: "Grab",
    location: "Singapore",
    type: "Full-time",
    regions: ["asia"],
    tags: ["Kotlin", "Swift", "Mobile"],
    description:
      "Grab is looking for a Mobile Engineer to help build superapp experiences used by millions across Southeast Asia. You'll ship features across our consumer app spanning rides, deliveries, and payments. Experience with native mobile development at scale is expected.",
    postedAt: "12h ago",
    salary: "S$90k – S$120k",
  },
];
