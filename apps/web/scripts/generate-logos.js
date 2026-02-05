const fs = require("fs");
const path = require("path");

const homePath = path.join(__dirname, "../public/content/home.json");
const clientsDir = path.join(__dirname, "../public/data/clients");

const home = JSON.parse(fs.readFileSync(homePath, "utf8"));
const partners = home.sections?.Partners?.data;
const categories = partners?.clientsCarousel?.categories;
if (!categories) {
  console.error("Partners section or clientsCarousel.categories not found");
  process.exit(1);
}

function getInitials(title) {
  const words = title.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "?";
  if (words.length === 1) {
    const w = words[0];
    return w.length >= 2 ? w.slice(0, 2).toUpperCase() : w.toUpperCase();
  }
  const first = words[0][0];
  const second = words[1][0];
  return (first + second).toUpperCase();
}

function createSvg(id, title) {
  const initials = getInitials(title);
  const hue = (id * 37) % 360;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 80" width="120" height="80">
  <rect width="120" height="80" fill="hsl(${hue}, 60%, 94%)" rx="8"/>
  <text x="60" y="50" font-family="Arial, sans-serif" font-size="28" font-weight="600" fill="hsl(${hue}, 50%, 35%)" text-anchor="middle" dominant-baseline="middle">${initials}</text>
</svg>`;
}

if (!fs.existsSync(clientsDir)) {
  fs.mkdirSync(clientsDir, { recursive: true });
}

let updated = 0;
for (const cat of categories) {
  for (const logo of cat.logos) {
    const imgPath = `/data/clients/${logo.id}.svg`;
    const filePath = path.join(clientsDir, `${logo.id}.svg`);
    fs.writeFileSync(filePath, createSvg(logo.id, logo.title), "utf8");
    logo.img = imgPath;
    updated++;
  }
}

const testimonials = partners.testimonials?.items;
if (testimonials) {
  for (const t of testimonials) {
    if (t.company && t.logoImg === null) {
      const fileId = `testimonial-${t.id}`;
      const imgPath = `/data/clients/${fileId}.svg`;
      const filePath = path.join(clientsDir, `${fileId}.svg`);
      fs.writeFileSync(filePath, createSvg(t.id, t.company), "utf8");
      t.logoImg = imgPath;
      updated++;
    }
  }
}

fs.writeFileSync(homePath, JSON.stringify(home, null, 2), "utf8");
console.log(`Generated ${updated} logo placeholders in public/data/clients/`);
