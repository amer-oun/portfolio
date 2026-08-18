export const profile = {
  name: "Amer Oun",
  handle: "amer-oun",
  role: "Full-stack developer",
  tagline:
    "I build web, mobile and data products that ship to production.",
  location: "Tunis, Tunisia",
  school: "Collège LaSalle Tunis",
  graduation: "2026",
  email: "ounamer31@gmail.com",
  github: "https://github.com/amer-oun",
  linkedin: "https://www.linkedin.com/in/amer-oun-b33212312/",
  status: "Open to junior developer roles",
  about: [
    "Final-year computer science student at Collège LaSalle Tunis, graduating in 2026. Two of my three current projects were shaped by real client conversations, which has changed how I think about scope, edge cases, and what \"done\" actually means.",
    "I care about production concerns early — real database, live deployment, seed data that mirrors real operations — because I've learned that retrofitting them later hurts more than doing them right the first time. When something breaks in production (and it has), I want to be the person who debugged it, not the one who never saw the logs.",
  ],
  facts: [
    { label: "Education", value: "CS · Collège LaSalle Tunis · 2026" },
    { label: "Location", value: "Tunis, Tunisia" },
    { label: "Languages", value: "Arabic (native) · French · English" },
    { label: "Availability", value: "Open to junior roles · remote or on-site" },
  ],
};

export const skills = {
  Languages: ["Python", "TypeScript", "JavaScript", "Dart", "SQL"],
  Frontend: ["Next.js", "React", "Flutter", "Tailwind CSS"],
  "Backend & Data": [
    "Node.js",
    "Prisma",
    "NextAuth",
    "Streamlit",
    "Prophet",
    "pandas",
    "scikit-learn",
  ],
  Databases: ["PostgreSQL (Neon)", "SQLite", "MongoDB", "Firebase"],
  "Cloud & Tools": [
    "Vercel",
    "Neon",
    "Streamlit Cloud",
    "Firebase",
    "Google Maps API",
    "Git",
    "GitHub Actions",
  ],
};

export type Project = {
  slug: string;
  name: string;
  pitch: string;
  client?: string;
  problem: string;
  solution: string;
  stack: string[];
  status: "live" | "in-dev";
  liveUrl?: string;
  codeUrl: string;
  heroImage: string;
  gallery: string[];
};

export const projects: Project[] = [
  {
    slug: "fibreconnect",
    name: "FibreConnect",
    pitch: "Intervention management for a Tunisian fiber optic subcontractor.",
    problem:
      "Small fiber optic subcontractors in Tunisia coordinate dozens of daily on-site interventions across scattered technicians and clients. Existing tools are either paper-based, spread across WhatsApp, or too enterprise-heavy for a small team.",
    solution:
      "A three-role platform (client, technician, supervisor) that coordinates fiber outages from first call to closing invoice. Zone-based dispatch, cash-payment collection with technician remittance tracking, and manual reassignment for zones with no coverage. Built for a real subcontractor, deployed in production.",
    stack: [
      "Next.js 16",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "NextAuth",
      "Vercel",
    ],
    status: "live",
    liveUrl: "https://fibreconnect.vercel.app",
    codeUrl: "https://github.com/amer-oun/fibreconnect",
    heroImage:
      "https://github.com/user-attachments/assets/fed873aa-3eee-4688-bd32-da5ae1576dba",
    gallery: [
      "https://github.com/user-attachments/assets/531dbebd-f41d-4b15-9bce-fbe57f29c067",
      "https://github.com/user-attachments/assets/2e31c3da-7462-40e3-acb2-ba4619d55acd",
      "https://github.com/user-attachments/assets/89ff54ce-6f00-495a-9231-5dc7309c998a",
      "https://github.com/user-attachments/assets/3f308b40-25c6-40cb-9dc2-515c81082632",
    ],
  },
  {
    slug: "tt-kpi-dashboard",
    name: "TT KPI Dashboard",
    pitch: "Sales performance + forecasting for a Tunisian telecom operator.",
    problem:
      "Sales teams at a Tunisian telecom operator need to track monthly cumulative sales, target achievement, and abnormal sales days across 9 product categories — with the ability to project the rest of the year.",
    solution:
      "An interactive Streamlit dashboard with Prophet time-series forecasting projecting the remainder of the year, z-score anomaly detection flagging abnormal sales days, and regional breakdown per agency. Synthetic data mirrors the reporting structure of the Tunisian telecom regulator (INT).",
    stack: [
      "Streamlit",
      "Python",
      "Prophet",
      "pandas",
      "scikit-learn",
      "Plotly",
    ],
    status: "live",
    liveUrl:
      "https://tt-kpi-dashboard-bk6wgnynlifm4opdpbcbrb.streamlit.app/",
    codeUrl: "https://github.com/amer-oun/tt-kpi-dashboard",
    heroImage:
      "https://github.com/user-attachments/assets/97dd2713-f116-4498-b440-3325b4173432",
    gallery: [
      "https://github.com/user-attachments/assets/b9737696-7d71-42ad-963e-0eecb88c6a89",
      "https://github.com/user-attachments/assets/998b8977-102d-4810-990a-9cd6cfb3b187",
      "https://github.com/user-attachments/assets/565bf608-a35f-4ca9-bb18-daad9d3b9e6b",
      "https://github.com/user-attachments/assets/525c2fbf-bf0e-475a-a050-e87faa6bf707",
    ],
  },
  {
    slug: "costalina",
    name: "Costalina",
    pitch: "Citizen-science coastline monitoring for Iberostar.",
    client: "Iberostar",
    problem:
      "Tunisia's ~1,300 km coastline is under continuous pressure from erosion, tourism, and climate change. Official monitoring is periodic and expensive.",
    solution:
      "A cross-platform Flutter app that turns beachgoers into contributors. Users photograph and geolocate coastal anomalies — erosion, pollution, debris — with real-time weather context and multi-language support (Arabic, French, English). Aggregated data gives researchers continuous, ground-truth monitoring at a fraction of the cost of official surveys.",
    stack: [
      "Flutter",
      "Dart",
      "Firebase",
      "Google Maps",
      "Geolocation",
    ],
    status: "in-dev",
    codeUrl: "https://github.com/amer-oun/costalina-app",
    heroImage:
      "https://github.com/user-attachments/assets/16a1d1f6-75d2-4b93-b560-40b31810b089",
    gallery: [
      "https://github.com/user-attachments/assets/100458bb-5629-482c-9ea6-88516826a01e",
      "https://github.com/user-attachments/assets/af178b3b-dc9e-4410-82fd-a0989221e256",
      "https://github.com/user-attachments/assets/797fe405-6de6-4c66-8c6d-801333df5124",
      "https://github.com/user-attachments/assets/b4480d1c-926f-4059-bdc4-2cca09ebd4ce",
    ],
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
