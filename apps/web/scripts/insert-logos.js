const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const homePath = path.join(__dirname, "../public/content/home.json");

function wmUrl(filename) {
  const encoded = filename.replace(/ /g, "_");
  const hash = crypto.createHash("md5").update(encoded).digest("hex");
  const pathPart = `${hash[0]}/${hash.slice(0, 2)}/${encoded}`;
  return `https://upload.wikimedia.org/wikipedia/commons/${pathPart}`;
}

const TITLE_TO_URL = {
  "Сбербанк": wmUrl("Logo_Sberbank.svg"),
  "UNILEVER": wmUrl("Unilever_text_logo.svg"),
  "ИКЕА": wmUrl("Ikea_logo.svg"),
  "Mars": wmUrl("Mars_Logo.svg"),
  "Киа Моторс": wmUrl("KIA_logo3.svg"),
  "Visa": wmUrl("Visa_2021.svg"),
  "Мастер кард": wmUrl("Mastercard-logo.png"),
  "HSBC": wmUrl("HSBC_logo_(2018).svg"),
  "Райффайзенбанк": wmUrl("Raiffeisen_Bank.svg"),
  "Райфайзен": wmUrl("Raiffeisen_Bank.svg"),
  "ПанасоникРус": wmUrl("Panasonic_logo_(Blue).svg"),
  "Шнейдер": wmUrl("Schneider_Electric_2007.svg"),
  "Saint-Gobian": wmUrl("Saint-Gobain_logo.jpg"),
  "AB InBev Efes": wmUrl("AB_In_Bev_EFES_logo.png"),
  "Первый канал": wmUrl("Channel_one_russia_logo_1.PNG"),
  "МТС Банк": wmUrl("MTS_logo.svg"),
  "Центральный банк Российской Федерации": wmUrl("CBRF_logo.svg"),
  "Superjob": wmUrl("Superjob_logo_450.gif"),
  "ХоумКредбанк": wmUrl("Homecredit_logo.png"),
  "Мир": wmUrl("Mir-logo.SVG.svg"),
  "Нордеа Банк": wmUrl("Nordea_logo.svg"),
  "Минфин России": wmUrl("Minfin.png"),
  "ЭРГО жизнь": wmUrl("ERGO_Logo.jpg"),
  "Дневник.ру": wmUrl("Logo_of_the_company_Dnevnik.ru.png"),
  "Лента": wmUrl("Lenta-sunflower.png"),
  "Почта банк": wmUrl("VTB_and_Post_of_Russia.png"),
  "МДМ Банк": wmUrl("Logo_MDM.png"),
  "Министерство финансов Чувашия": wmUrl("Flag_of_Chuvashia.svg"),
  "Администрация Хабаровска": wmUrl("Flag_of_Khabarovsk_Krai.svg"),
  "Министерство финансов Республики Башкортостан": wmUrl("Flag_of_Bashkortostan.svg"),
  "Правительство Ярославской области": wmUrl("Flag_of_Yaroslavl_Oblast.svg"),
  "Росгосстрах":
    "https://upload.wikimedia.org/wikipedia/ru/d/dc/%D0%A0%D0%BE%D1%81%D0%B3%D0%BE%D1%81%D1%82%D1%80%D0%B0%D1%85%D0%96%D0%B8%D0%B7%D0%BD%D1%8C%D0%9B%D0%BE%D0%B3%D0%BE.svg"
};

const home = JSON.parse(fs.readFileSync(homePath, "utf8"));
const categories = home.sections?.Partners?.data?.clientsCarousel?.categories;
if (!categories) {
  console.error("Categories not found");
  process.exit(1);
}

let updated = 0;
for (const cat of categories) {
  for (const logo of cat.logos) {
    const url = TITLE_TO_URL[logo.title];
    if (url) {
      logo.img = url;
      updated++;
    }
  }
}

const testimonials = home.sections?.Partners?.data?.testimonials?.items;
if (testimonials) {
  for (const t of testimonials) {
    const url = TITLE_TO_URL[t.company];
    if (url) {
      t.logoImg = url;
      updated++;
    }
  }
}

fs.writeFileSync(homePath, JSON.stringify(home, null, 2), "utf8");
console.log(`Updated ${updated} logos with Wikimedia URLs`);
