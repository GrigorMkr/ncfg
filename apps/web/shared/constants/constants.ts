import {
  BookOpen,
  FlaskConical,
  Users,
  Award,
  Heart,
  GraduationCap,
  TrendingUp,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const SPACING = {
  ICON_SM: 16,
  ICON_MD: 20,
  ICON_LG: 24,
  HEADER_HEIGHT_MOBILE: 64,
  HEADER_HEIGHT_DESKTOP: 80,
  SCROLL_THRESHOLD: 20,
  NEWS_EXCERPT_LENGTH: 120,
  NEWS_ITEMS_LIMIT: 6,
  META_DESCRIPTION_LENGTH: 160,
} as const;

const ANIMATION = {
  DURATION_FAST: 150,
  DURATION_NORMAL: 200,
  DURATION_SLOW: 300,
  DURATION_XL: 500,
  FLOAT_OFFSET: 6,
  SCALE_IN_FROM: 0.96,
  DELAY_STEP: 80,
  DELAY_MAX: 400,
  MARKER_OPACITY_TRANSITION: 0.2,
} as const;

const LAYOUT = {
  CONTAINER_MAX: 1200,
  DROPDOWN_WIDTH: 208,
  MOBILE_MENU_MAX_H: 420,
} as const;

const MAP = {
  LAT: 55.8394,
  LNG: 37.5248,
  ZOOM: 16,
  ZOOM_HOVER: 19,
  ADDRESS: "125239, город Москва, б-р Матроса Железняка, 13, 31",
  MARKER_WIDTH: 32,
  MARKER_HEIGHT: 42,
  MARKER_ANCHOR_X: 16,
  MARKER_ANCHOR_Y: 42,
  MIN_HEIGHT_PX: 240,
  ASPECT_RATIO: "16/10",
  ZOOM_ANIMATION_DURATION: 0.3,
} as const;

const SECTION = {
  PADDING_Y: "py-12 md:py-16",
  TITLE_MB: "mb-8 md:mb-10",
  DIVIDER_MB: "mb-12 md:mb-16",
  MAP_MT: "mt-16",
  MAP_TITLE_MB: "mb-6",
} as const;

const REVALIDATE = {
  DEFAULT: 60,
} as const;

enum ServiceTab {
  BUSINESS = "business",
  INDIVIDUALS = "individuals",
}

type FormStatus = "idle" | "loading" | "success" | "error";

const API_ENDPOINTS = {
  LEAD: "/api/lead",
  QUESTION: "/api/question",
} as const;

const PRINCIPLE_ICON_IDS = [
  "methodology",
  "scientific_approach",
  "individual_approach",
  "experience",
  "team",
] as const;

type PrincipleIconId = (typeof PRINCIPLE_ICON_IDS)[number];

const PRINCIPLE_ICON_MAP: Record<string, LucideIcon> = {
  methodology: BookOpen,
  scientific_approach: FlaskConical,
  individual_approach: Users,
  experience: Award,
  team: Heart,
};

function getPrincipleIcon(id: string): LucideIcon {
  return PRINCIPLE_ICON_MAP[id] ?? BookOpen;
}

const PRODUCT_SHOWCASE_ICON_KEYS = [
  "graduation-cap",
  "trending-up",
  "zap",
] as const;

type ProductShowcaseIcon = (typeof PRODUCT_SHOWCASE_ICON_KEYS)[number];

const PRODUCT_SHOWCASE_ICON_MAP: Record<ProductShowcaseIcon, LucideIcon> = {
  "graduation-cap": GraduationCap,
  "trending-up": TrendingUp,
  zap: Zap,
};

function getProductShowcaseIcon(
  icon?: ProductShowcaseIcon
): LucideIcon | null {
  return icon && icon in PRODUCT_SHOWCASE_ICON_MAP
    ? PRODUCT_SHOWCASE_ICON_MAP[icon]
    : null;
}

export {
  ServiceTab,
  type FormStatus,
  API_ENDPOINTS,
  PRINCIPLE_ICON_IDS,
  type PrincipleIconId,
  getPrincipleIcon,
  PRODUCT_SHOWCASE_ICON_MAP,
  getProductShowcaseIcon,
  type ProductShowcaseIcon,
  SPACING,
  ANIMATION,
  LAYOUT,
  MAP,
  SECTION,
  REVALIDATE,
};
