const HERO_BADGES = {
  main: "Национальный центр финансовой грамотности",
  individuals: "Частным лицам",
  companies: "Компаниям",
} as const;

const HERO_IMAGES = {
  home: "/hero.png",
  about: "/news/anonsImages/2025-12-11_15-51-13.jpg",
  tvoridobro: "/news/anonsImages/2025-10-13 121208.png",
  companies: "/company.png",
  individuals: "/client.png",
  blog: "/news/anonsImages/2025-12-04_135603.jpg",
  blogPost: "/news/anonsImages/2025-11-21_14-15-32.jpg",
  service: "/news/anonsImages/2025-12-11_15-51-13.jpg",
} as const;

const SERVICE_HERO_IMAGES: Record<string, string> = {
  financial_diagnostics: "/news/anonsImages/2025-12-11_15-51-13.jpg",
  webinar_cycles: "/news/anonsImages/2025-11-21_14-15-32.jpg",
  challenges_and_marathons: "/news/anonsImages/2025-10-13 121208.png",
  financial_excursions: "/news/anonsImages/2025-12-04_135603.jpg",
  kids_programs_for_employees: "/news/anonsImages/2025-10-01 141647.png",
  integrated_program: "/news/anonsImages/2025-22-08.jpg",
  course_development: "/news/anonsImages/20250801_232240_048.jpg",
  brochures_and_presentations: "/news/anonsImages/25-08-19_09-23-44-642.jpg",
  expert_articles: "/news/anonsImages/2025-09-18 142227.png",
  mass_events_management: "/news/anonsImages/2025-12-04_135603.jpg",
  public_talks: "/news/anonsImages/2025-03-01 21_38_55.jpg",
};

export { HERO_BADGES, HERO_IMAGES, SERVICE_HERO_IMAGES };
