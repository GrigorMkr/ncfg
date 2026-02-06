const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const HERO_BADGES = {
  main: "Национальный центр финансовой грамотности",
  individuals: "Частным лицам",
  companies: "Компаниям",
} as const;

const HERO_IMAGES = {
  home: `${basePath}/hero.png`,
  about: `${basePath}/news/anonsImages/2025-12-11_15-51-13.jpg`,
  tvoridobro: `${basePath}/news/anonsImages/2025-10-13 121208.png`,
  companies: `${basePath}/company.png`,
  individuals: `${basePath}/client.png`,
  blog: `${basePath}/news/anonsImages/2025-12-04_135603.jpg`,
  blogPost: `${basePath}/news/anonsImages/2025-11-21_14-15-32.jpg`,
  service: `${basePath}/news/anonsImages/2025-12-11_15-51-13.jpg`,
} as const;

const SERVICE_HERO_IMAGES: Record<string, string> = {
  financial_diagnostics: `${basePath}/news/anonsImages/2025-12-11_15-51-13.jpg`,
  webinar_cycles: `${basePath}/news/anonsImages/2025-11-21_14-15-32.jpg`,
  challenges_and_marathons: `${basePath}/news/anonsImages/2025-10-13 121208.png`,
  financial_excursions: `${basePath}/news/anonsImages/2025-12-04_135603.jpg`,
  kids_programs_for_employees: `${basePath}/news/anonsImages/2025-10-01 141647.png`,
  integrated_program: `${basePath}/news/anonsImages/2025-22-08.jpg`,
  course_development: `${basePath}/news/anonsImages/20250801_232240_048.jpg`,
  brochures_and_presentations: `${basePath}/news/anonsImages/25-08-19_09-23-44-642.jpg`,
  expert_articles: `${basePath}/news/anonsImages/2025-09-18 142227.png`,
  mass_events_management: `${basePath}/news/anonsImages/2025-12-04_135603.jpg`,
  public_talks: `${basePath}/news/anonsImages/2025-03-01 21_38_55.jpg`,
};

export { HERO_BADGES, HERO_IMAGES, SERVICE_HERO_IMAGES };
