export interface NewsPlaceholderItem {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  href: string;
  image?: string | null;
}

export const PLACEHOLDER_NEWS: NewsPlaceholderItem[] = [
  {
    id: "1",
    title: "НЦФГ провёл серию вебинаров для сотрудников крупных компаний",
    date: "15 января 2025",
    excerpt:
      "Более 5000 участников присоединились к образовательным мероприятиям по финансовой грамотности.",
    href: "/news/1",
  },
  {
    id: "2",
    title: "Старт программы финансового well-being для HR-специалистов",
    date: "10 января 2025",
    excerpt: "Новая программа помогает компаниям заботиться о финансовом здоровье сотрудников.",
    href: "/news/2",
  },
  {
    id: "3",
    title: "Итоги Всероссийской недели финансовой грамотности 2024",
    date: "28 декабря 2024",
    excerpt: "Рекордное число участников — более 2 миллионов человек из 84 регионов России.",
    href: "/news/3",
  },
];
