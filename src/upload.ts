import fs from "fs/promises";
import path from "path";
import { getAccount, getShelbyClient } from "./config.js";

async function upload() {
  // ✏️ Ganti path file dan nama blob sesuai kebutuhan
  const filePath = process.argv[2] || "./sample.txt";
  const blobName = process.argv[3] || path.basename(filePath);

  console.log("🚀 Shelby File Uploader");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`📦 File    : ${filePath}`);
  console.log(`📁 Blob    : ${blobName}`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  // Baca file
  let blobData: Buffer;
  try {
    blobData = await fs.readFile(filePath);
    console.log(`✅ File dibaca: ${blobData.length} bytes`);
  } catch {
    console.error(`❌ File tidak ditemukan: ${filePath}`);
    console.log("💡 Contoh: npm run upload ./myfile.txt nama-file.txt");
    process.exit(1);
  }

  // Setup client dan account
  const account = getAccount();
  const shelbyClient = getShelbyClient();

  console.log(`👤 Account : ${account.accountAddress}`);
  console.log("⏳ Uploading ke Shelby...\n");

  // Expiration: 7 hari dari sekarang
  const expirationMicros = (Date.now() + 1000 * 60 * 60 * 24 * 7) * 1000;

  try {
    await shelbyClient.upload({
      account,
      blobData,
      blobName,
      expirationMicros,
    });

    console.log("✨ Upload berhasil!");
    console.log(`🗂️  Shelby Explorer: https://explorer.shelby.xyz/shelbynet/account/${account.accountAddress}`);
    console.log(`\n💡 Download dengan: npm run download ${blobName} ./downloaded-${path.basename(filePath)}`);
  } catch (err) {
    console.error("❌ Upload gagal:", err);
    console.log("\n💡 Pastikan:");
    console.log("   1. .env sudah diisi dengan benar");
    console.log("   2. Account sudah di-fund dengan ShelbyUSD dan APT");
    console.log("   3. Network shelbynet sedang aktif (wipe mingguan)");
  }
}

upload();
