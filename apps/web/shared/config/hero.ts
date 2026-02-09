const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

function heroPath(path: string): string {
  return encodeURI(`${basePath}${path}`);
}

const HERO_BADGES = {
  main: "Национальный центр финансовой грамотности",
  individuals: "Частным лицам",
  companies: "Компаниям",
} as const;

const HERO_IMAGES = {
  home: heroPath('/hero.png'),
  about: heroPath('/news/anonsImages/2025-12-11_15-51-13.jpg'),
  tvoridobro: heroPath('/news/anonsImages/2025-10-13 121208.png'),
  companies: heroPath('/company.png'),
  individuals: heroPath('/client.png'),
  blog: heroPath('/news/anonsImages/2025-12-04_135603.jpg'),
  blogPost: heroPath('/news/anonsImages/2025-11-21_14-15-32.jpg'),
  service: heroPath('/news/anonsImages/2025-12-11_15-51-13.jpg'),
};

const SERVICE_HERO_IMAGES: Record<string, string> = {
  financial_diagnostics: heroPath('/news/anonsImages/2025-12-11_15-51-13.jpg'),
  webinar_cycles: heroPath('/news/anonsImages/2025-11-21_14-15-32.jpg'),
  challenges_and_marathons: heroPath('/news/anonsImages/2025-10-13 121208.png'),
  financial_excursions: heroPath('/news/anonsImages/2025-12-04_135603.jpg'),
  kids_programs_for_employees: heroPath('/news/anonsImages/2025-10-01 141647.png'),
  integrated_program: heroPath('/news/anonsImages/2025-22-08.jpg'),
  course_development: heroPath('/news/anonsImages/20250801_232240_048.jpg'),
  brochures_and_presentations: heroPath('/news/anonsImages/25-08-19_09-23-44-642.jpg'),
  expert_articles: heroPath('/news/anonsImages/2025-09-18 142227.png'),
  mass_events_management: heroPath('/news/anonsImages/2025-12-04_135603.jpg'),
  public_talks: heroPath('/news/anonsImages/2025-03-01 21_38_55.jpg'),
};

export { HERO_BADGES, HERO_IMAGES, SERVICE_HERO_IMAGES };
