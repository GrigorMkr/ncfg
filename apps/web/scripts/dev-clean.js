const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const lockPath = path.join(__dirname, "..", ".next", "dev", "lock");
try {
  if (fs.existsSync(lockPath)) {
    fs.unlinkSync(lockPath);
    console.log("Lock file removed.");
  }
} catch {
  // ignore
}

const child = spawn("npx", ["next", "dev", "--webpack", "-p", "3005"], {
  stdio: "inherit",
  shell: true,
  cwd: path.join(__dirname, ".."),
});

child.on("exit", (code) => process.exit(code ?? 0));
