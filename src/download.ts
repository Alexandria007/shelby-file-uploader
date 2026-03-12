import fs from "fs";
import { getAccount, getShelbyClient } from "./config.js";

async function download() {
  const blobName = process.argv[2];
  const destination = process.argv[3] || `./${blobName}`;

  if (!blobName) {
    console.error("❌ Nama blob diperlukan");
    console.log("💡 Contoh: npm run download nama-file.txt ./hasil.txt");
    process.exit(1);
  }

  console.log("📥 Shelby File Downloader");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`📁 Blob      : ${blobName}`);
  console.log(`💾 Simpan ke : ${destination}`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  const account = getAccount();
  const shelbyClient = getShelbyClient();

  console.log(`👤 Account : ${account.accountAddress}`);
  console.log("⏳ Downloading dari Shelby...\n");

  try {
    const blob = await shelbyClient.download({
      account: account.accountAddress,
      blobName,
    });

    blob.stream.pipe(fs.createWriteStream(destination));

    blob.stream.on("finish", () => {
      console.log(`✅ Download berhasil!`);
      console.log(`💾 File disimpan di: ${destination}`);
    });

    blob.stream.on("error", (err: Error) => {
      console.error("❌ Download gagal:", err.message);
    });
  } catch (err) {
    console.error("❌ Download gagal:", err);
    console.log("\n💡 Pastikan blob tersebut ada dan belum expired");
  }
}

download();
