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

const ICON_SIZE = {
  XS: 14,
  SM: 16,
  MD: 18,
  DEFAULT: 20,
  LG: 24,
  XL: 32,
  XXL: 40,
  HERO: 48,
} as const;

const STROKE_WIDTH = {
  THIN: 1.5,
  DEFAULT: 1.75,
  MEDIUM: 2,
} as const;

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
  LOGOS_PER_PAGE: 12,
  GRID_GAP_SM: 4,
  GRID_GAP_MD: 8,
  GRID_GAP_LG: 12,
  GRID_GAP_XL: 16,
  SECTION_PY_SM: 12,
  SECTION_PY_MD: 16,
  SECTION_PY_LG: 24,
  CONTAINER_PX_SM: 16,
  CONTAINER_PX_MD: 24,
  CONTAINER_PX_LG: 32,
} as const;

const ANIMATION = {
  DURATION_FAST: 150,
  DURATION_NORMAL: 200,
  DURATION_SLOW: 300,
  DURATION_XL: 500,
  FLOAT_OFFSET: 6,
  SCALE_IN_FROM: 0.96,
  SCALE_HOVER: 1.02,
  SCALE_ACTIVE: 0.98,
  SCALE_HOVER_LG: 1.03,
  DELAY_STEP: 80,
  DELAY_SM: 100,
  DELAY_MD: 120,
  DELAY_LG: 200,
  DELAY_XL: 250,
  DELAY_XXL: 300,
  DELAY_MAX: 400,
  MARKER_OPACITY_TRANSITION: 0.2,
  STAGGER_INCREMENT: 120,
} as const;

const LAYOUT = {
  CONTAINER_MAX: 1200,
  DROPDOWN_WIDTH: 208,
  MOBILE_MENU_MAX_H: 420,
  CARD_BORDER_RADIUS: 16,
  BUTTON_BORDER_RADIUS: 12,
  AVATAR_SM: 64,
  AVATAR_MD: 96,
  AVATAR_LG: 128,
  FEATURED_ICON_SIZE: 56,
  ICON_BADGE_SM: 44,
  ICON_BADGE_MD: 56,
  ICON_BADGE_LG: 96,
  BLUR_CIRCLE_SM: 128,
  BLUR_CIRCLE_MD: 256,
  BLUR_CIRCLE_LG: 384,
  MAX_CONTENT_WIDTH_SM: 512,
  MAX_CONTENT_WIDTH_MD: 768,
  MAX_CONTENT_WIDTH_LG: 896,
  MAX_CONTENT_WIDTH_XL: 1024,
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
  PADDING_Y_LG: "py-16 md:py-24",
  TITLE_MB: "mb-8 md:mb-10",
  DIVIDER_MB: "mb-12 md:mb-16",
  MAP_MT: "mt-16",
  MAP_TITLE_MB: "mb-6",
  CARD_GAP: "gap-8 md:gap-10",
  GRID_GAP: "gap-12 lg:gap-16",
} as const;

const REVALIDATE = {
  DEFAULT: 60,
} as const;

const OPACITY = {
  DISABLED: 0.5,
  MUTED: 0.4,
  SECONDARY: 0.7,
  OVERLAY_LIGHT: 0.1,
  OVERLAY_MEDIUM: 0.2,
  OVERLAY_HEAVY: 0.8,
} as const;

const Z_INDEX = {
  BACKGROUND: -10,
  DEFAULT: 0,
  DROPDOWN: 10,
  STICKY: 40,
  HEADER: 50,
  MODAL: 100,
  TOOLTIP: 200,
} as const;

const COLORS = {
  PRIMARY: "#0ea5e9",
  PRIMARY_LIGHT: "#38bdf8",
  PRIMARY_DARK: "#0284c7",
  ACCENT: "#58A8E0",
  ACCENT_HOVER: "#4A96CC",
  ACCENT_ACTIVE: "#3E84B8",
  SUCCESS: "#10B981",
  ERROR: "#EF4444",
  WARNING: "#F59E0B",
  SLATE_900: "#0f172a",
  SLATE_800: "#1e293b",
  SLATE_600: "#475569",
  WHITE: "#ffffff",
} as const;

const SHADOW = {
  SM: "0_4px_12px",
  MD: "0_4px_30px_-8px",
  LG: "0_20px_40px_-12px",
  BUTTON: "0_4px_12px_rgba(88,168,224,0.3)",
  HEADER: "0_4px_30px_-8px_rgba(14,165,233,0.12)",
  CARD_HOVER: "0_20px_40px_-12px_rgba(14,165,233,0.15)",
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
  PRODUCT_SHOWCASE_ICON_KEYS,
  PRODUCT_SHOWCASE_ICON_MAP,
  getProductShowcaseIcon,
  type ProductShowcaseIcon,
  ICON_SIZE,
  STROKE_WIDTH,
  SPACING,
  ANIMATION,
  LAYOUT,
  MAP,
  SECTION,
  REVALIDATE,
  OPACITY,
  Z_INDEX,
  COLORS,
  SHADOW,
};
