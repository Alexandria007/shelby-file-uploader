import fs from "fs/promises";
import { getAccount, getShelbyClient } from "./config.js";

/**
 * Demo: Upload file lalu download kembali (round-trip)
 * Jalankan: npm run dev
 */
async function main() {
  console.log("🌐 Shelby Protocol — Round Trip Demo");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("Built by Raden Ayu Ananditha Jayawardana Gumay");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  const account = getAccount();
  const shelbyClient = getShelbyClient();
  const blobName = "demo/hello-shelby.txt";

  // 1. Buat sample file
  const content = `Hello from Shelby Protocol! 🌐
  
Uploaded by  : Raden Ayu Ananditha Jayawardana Gumay
Account      : ${account.accountAddress}
Timestamp    : ${new Date().toISOString()}
Network      : ${process.env.SHELBY_NETWORK || "shelbynet"}

Shelby is a verifiable decentralized hot storage protocol
built by Aptos Labs × Jump Crypto, running on DoubleZero fiber network.
`;

  await fs.writeFile("./temp-upload.txt", content);
  console.log("✅ Sample file dibuat: temp-upload.txt");

  // 2. Upload
  console.log(`\n⏳ Uploading "${blobName}" ke Shelby...`);
  const blobData = Buffer.from(content);
  const expirationMicros = (Date.now() + 1000 * 60 * 60 * 24) * 1000; // 1 hari

  await shelbyClient.upload({ account, blobData, blobName, expirationMicros });
  console.log("✅ Upload berhasil!");

  // 3. Download kembali
  console.log(`\n⏳ Downloading "${blobName}" dari Shelby...`);
  const blob = await shelbyClient.download({
    account: account.accountAddress,
    blobName,
  });

  await fs.writeFile("./downloaded-result.txt", blob.stream as unknown as Buffer);
  console.log("✅ Download berhasil! File: downloaded-result.txt");

  // 4. Cleanup
  await fs.unlink("./temp-upload.txt");

  console.log("\n🎉 Round-trip sukses!");
  console.log(`🗂️  Explorer: https://explorer.shelby.xyz/shelbynet/account/${account.accountAddress}`);
}

main().catch(console.error);
