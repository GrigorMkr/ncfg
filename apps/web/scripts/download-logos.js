const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");

const homePath = path.join(__dirname, "../public/content/home.json");
const logosDir = path.join(__dirname, "../public/logos/clients");

if (!fs.existsSync(logosDir)) {
  fs.mkdirSync(logosDir, { recursive: true });
}

function getExtension(url) {
  const match = url.match(/\.([a-zA-Z0-9]+)(?:\?|$)/);
  if (match) return match[1].toLowerCase();
  if (url.includes(".svg")) return "svg";
  if (url.includes(".png")) return "png";
  if (url.includes(".jpg") || url.includes(".jpeg")) return "jpg";
  if (url.includes(".gif")) return "gif";
  return "png";
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith("https") ? https : http;
    const file = fs.createWriteStream(dest);
    
    const request = protocol.get(url, { 
      headers: { 
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
      }
    }, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        file.close();
        fs.unlinkSync(dest);
        downloadFile(response.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      
      if (response.statusCode !== 200) {
        file.close();
        fs.unlinkSync(dest);
        reject(new Error(`HTTP ${response.statusCode} for ${url}`));
        return;
      }
      
      response.pipe(file);
      file.on("finish", () => {
        file.close();
        resolve();
      });
    });
    
    request.on("error", (err) => {
      file.close();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      reject(err);
    });
    
    request.setTimeout(30000, () => {
      request.destroy();
      reject(new Error("Timeout"));
    });
  });
}

async function main() {
  const home = JSON.parse(fs.readFileSync(homePath, "utf8"));
  const categories = home.sections?.Partners?.data?.clientsCarousel?.categories || [];
  const testimonials = home.sections?.Partners?.data?.testimonials?.items || [];
  
  let downloaded = 0;
  let failed = 0;
  
  for (const cat of categories) {
    for (const logo of cat.logos) {
      if (logo.img && logo.img.startsWith("http")) {
        const ext = getExtension(logo.img);
        const filename = `${logo.id}.${ext}`;
        const dest = path.join(logosDir, filename);
        const localPath = `/logos/clients/${filename}`;
        
        try {
          console.log(`Downloading ${logo.title}...`);
          await downloadFile(logo.img, dest);
          logo.img = localPath;
          downloaded++;
        } catch (err) {
          console.error(`Failed ${logo.title}: ${err.message}`);
          failed++;
        }
      }
    }
  }
  
  for (const t of testimonials) {
    if (t.logoImg && t.logoImg.startsWith("http")) {
      const ext = getExtension(t.logoImg);
      const filename = `testimonial-${t.id}.${ext}`;
      const dest = path.join(logosDir, filename);
      const localPath = `/logos/clients/${filename}`;
      
      try {
        console.log(`Downloading testimonial ${t.company}...`);
        await downloadFile(t.logoImg, dest);
        t.logoImg = localPath;
        downloaded++;
      } catch (err) {
        console.error(`Failed testimonial ${t.company}: ${err.message}`);
        failed++;
      }
    }
  }
  
  fs.writeFileSync(homePath, JSON.stringify(home, null, 2), "utf8");
  console.log(`\nDone! Downloaded: ${downloaded}, Failed: ${failed}`);
}

main().catch(console.error);
