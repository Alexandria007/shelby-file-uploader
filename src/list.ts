import { getAccount, getShelbyClient } from "./config.js";

async function list() {
  console.log("📋 Shelby Blob Lister");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  const account = getAccount();
  const shelbyClient = getShelbyClient();

  console.log(`👤 Account : ${account.accountAddress}`);
  console.log("⏳ Mengambil daftar blob...\n");

  try {
    const blobs = await shelbyClient.listBlobs({
      account: account.accountAddress,
    });

    if (!blobs || blobs.length === 0) {
      console.log("📭 Belum ada blob yang tersimpan di account ini.");
      return;
    }

    console.log(`✅ Ditemukan ${blobs.length} blob:\n`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`${"Nama".padEnd(40)} ${"Ukuran".padEnd(12)} Expired`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    for (const blob of blobs) {
      const name = blob.name?.padEnd(40) || "unknown".padEnd(40);
      const size = blob.size ? `${blob.size} B`.padEnd(12) : "N/A".padEnd(12);
      const expires = blob.expirationTime
        ? new Date(Number(blob.expirationTime) / 1000).toLocaleDateString("id-ID")
        : "N/A";
      console.log(`${name} ${size} ${expires}`);
    }

    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`\n🗂️  Explorer: https://explorer.shelby.xyz/shelbynet/account/${account.accountAddress}`);
  } catch (err) {
    console.error("❌ Gagal mengambil daftar blob:", err);
  }
}

list();
