export const profile = {
  name: "Amer Oun",
  handle: "amer-oun",
  role: "Full-stack developer",
  location: "Tunis, Tunisia",
  school: "Collège LaSalle Tunis",
  graduation: "2026",
  email: "ounamer31@gmail.com",
  github: "https://github.com/amer-oun",
  linkedin: "https://www.linkedin.com/in/amer-oun-b33212312/",
  status: "Open to junior developer roles (remote / on-site)",
  about: [
    "Final-year CS student at Collège LaSalle Tunis, graduating 2026.",
    "Two of my three current projects were shaped by real client",
    "conversations, which has changed how I think about scope,",
    "edge cases, and what \"done\" actually means.",
    "",
    "I care about production concerns early — real database,",
    "live deployment, seed data that mirrors real operations —",
    "because retrofitting them later hurts more than doing them",
    "right the first time.",
  ],
};

export const skills = {
  languages: ["Python", "TypeScript", "JavaScript", "Dart", "SQL"],
  frontend: ["Next.js", "React", "Flutter", "Tailwind CSS"],
  backend: ["Node.js", "Prisma", "NextAuth", "Streamlit"],
  data: ["pandas", "NumPy", "Prophet", "scikit-learn"],
  databases: ["PostgreSQL (Neon)", "SQLite", "MongoDB", "Firebase"],
  cloud: ["Vercel", "Neon", "Streamlit Cloud", "Firebase"],
  tools: ["Git", "GitHub Actions", "VS Code", "Google Maps API"],
};

export type Project = {
  slug: string;
  name: string;
  pitch: string;
  description: string[];
  stack: string[];
  status: "live" | "in-dev";
  liveUrl?: string;
  codeUrl: string;
  client?: string;
};

export const projects: Project[] = [
  {
    slug: "fibreconnect",
    name: "FibreConnect",
    pitch: "Intervention management for a Tunisian fiber optic subcontractor.",
    description: [
      "A three-role platform (client, technician, supervisor) that",
      "coordinates fiber outages from first call to closing invoice.",
      "Zone-based dispatch, on-site cash collection with technician",
      "remittance tracking, manual reassignment for uncovered zones.",
      "Built for a real subcontractor, deployed in production.",
    ],
    stack: [
      "Next.js 16",
      "TypeScript",
      "Prisma",
      "PostgreSQL (Neon)",
      "NextAuth",
      "Vercel",
    ],
    status: "live",
    liveUrl: "https://fibreconnect.vercel.app",
    codeUrl: "https://github.com/amer-oun/fibreconnect",
  },
  {
    slug: "tt-kpi-dashboard",
    name: "TT KPI Dashboard",
    pitch: "Sales performance + forecasting for a Tunisian telecom operator.",
    description: [
      "Nine telecom product categories tracked continuously,",
      "with Prophet projecting the rest of the year and z-score",
      "anomaly detection flagging abnormal sales days.",
      "Synthetic data, real structure — mirrors the Tunisian",
      "telecom regulator (INT) reporting conventions.",
    ],
    stack: [
      "Streamlit",
      "Python",
      "Prophet",
      "pandas",
      "scikit-learn",
      "Streamlit Cloud",
    ],
    status: "live",
    liveUrl:
      "https://tt-kpi-dashboard-bk6wgnynlifm4opdpbcbrb.streamlit.app/",
    codeUrl: "https://github.com/amer-oun/tt-kpi-dashboard",
  },
  {
    slug: "costalina",
    name: "Costalina",
    pitch: "Citizen-science coastline monitoring for Iberostar.",
    description: [
      "A cross-platform mobile app turning beachgoers into",
      "contributors. Users photograph and geolocate coastal",
      "anomalies along Tunisia's 1,300 km shoreline. Real-time",
      "weather, multi-language (AR/FR/EN), and volunteer profiles.",
      "Aggregated data helps researchers and authorities protect",
      "the coast.",
    ],
    stack: [
      "Flutter",
      "Dart",
      "Firebase",
      "Google Maps",
      "Geolocation",
    ],
    status: "in-dev",
    codeUrl: "https://github.com/amer-oun/costalina-app",
    client: "Iberostar",
  },
];

export const bootLines: string[] = [
  "Booting portfolio...",
  "Loading modules... [OK]",
  "Establishing session... [OK]",
  "",
  "Welcome to Amer Oun's terminal.",
  "Type `help` to see available commands.",
  "",
];
