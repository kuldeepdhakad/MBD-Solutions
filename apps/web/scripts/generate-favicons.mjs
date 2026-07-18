/**
 * Generates favicon assets from the MBD logo PNG.
 * Run: node scripts/generate-favicons.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");
const source = join(publicDir, "assets", "logos", "mbd-logo-icon.png");

async function main() {
  const sharp = (await import("sharp")).default;
  const input = readFileSync(source);

  const outputs = [
    { file: "favicon-16x16.png", size: 16 },
    { file: "favicon-32x32.png", size: 32 },
    { file: "apple-touch-icon.png", size: 180 },
    { file: "android-chrome-192x192.png", size: 192 },
    { file: "android-chrome-512x512.png", size: 512 },
  ];

  for (const { file, size } of outputs) {
    const buffer = await sharp(input)
      .resize(size, size, { fit: "contain", background: { r: 7, g: 27, b: 77, alpha: 1 } })
      .png()
      .toBuffer();
    writeFileSync(join(publicDir, file), buffer);
    console.log(`Created ${file}`);
  }

  const icoSizes = [16, 32, 48];
  const pngBuffers = await Promise.all(
    icoSizes.map((size) =>
      sharp(input)
        .resize(size, size, { fit: "contain", background: { r: 7, g: 27, b: 77, alpha: 1 } })
        .png()
        .toBuffer(),
    ),
  );

  writeFileSync(join(publicDir, "favicon.ico"), pngBuffers[1]);
  console.log("Created favicon.ico (32x32 PNG fallback)");

  console.log("Favicon generation complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
