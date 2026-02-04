export interface ProductItem {
  title: string;
  description: string;
  href: string;
  badge?: string;
  image: string;
}

export const PRODUCTS: ProductItem[] = [
  {
    title: "Школа «Деньгин's» и клуб «Дети в Деле»",
    description:
      "Финансовое воспитание для детей и подростков. Интерактивные программы, которые учат ребёнка управлять деньгами с ранних лет.",
    href: "https://dengins.ru/",
    image: "/news/anonsImages/2025-12-04_135603.jpg",
  },
  {
    title: "Клуб «ФинЗдоровье»",
    description:
      "Сообщество для взрослых, где участники учатся управлять личными финансами, планировать бюджет и достигать финансовых целей.",
    href: "https://fgrm.ncfg.ru/wellf_club",
    image: "/news/anonsImages/2025-12-11_15-51-13.jpg",
  },
  {
    title: "День «ФинПривычки»",
    description:
      "Однодневная интенсивная программа для формирования здоровых финансовых привычек. Практические инструменты и техники.",
    href: "https://fgrm.ncfg.ru/FinHabit",
    image: "/news/anonsImages/2025-10-13 121208.png",
  },
];
