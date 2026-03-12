# 🗄️ Shelby File Uploader

A simple CLI tool to upload, download, and list files on [Shelby Protocol](https://shelby.xyz) — a verifiable decentralized hot storage network built by Aptos Labs × Jump Crypto.

Built by **Raden Ayu Ananditha Jayawardana Gumay** as part of exploring the Shelby ecosystem.

---

## ✨ Features

- 📤 Upload files to Shelby decentralized storage
- 📥 Download files from Shelby by blob name
- 📋 List all blobs stored on your account
- 🔄 Round-trip demo (upload + download)

---

## 🛠 Tech Stack

- **TypeScript** + **Node.js**
- **Shelby Protocol SDK** (`@shelby-protocol/sdk`)
- **Aptos TypeScript SDK** (`@aptos-labs/ts-sdk`)
- Network: **Shelbynet** (devnet) / **Testnet**

---

## 📦 Installation

```bash
# Clone repo
git clone https://github.com/Alexandria007/shelby-file-uploader
cd shelby-file-uploader

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env dengan private key dan address Aptos kamu
```

---

## ⚙️ Setup

1. Install [Shelby CLI](https://docs.shelby.xyz/tools/cli):
```bash
npm i -g @shelby-protocol/cli
```

2. Init akun Shelby:
```bash
shelby init
```

3. Fund akun dengan APT dan ShelbyUSD dari faucet:
- [ShelbyUSD Faucet](https://docs.shelby.xyz/apis/faucet/shelbyusd)
- [APT Faucet](https://docs.shelby.xyz/apis/faucet/aptos)

4. Copy private key dan address ke file `.env`

---

## 🚀 Usage

```bash
# Upload file
npm run upload ./myfile.txt nama-blob.txt

# Download file
npm run download nama-blob.txt ./hasil.txt

# List semua blob di account kamu
npm run list

# Round-trip demo (upload + download)
npm run dev
```

---

## 📁 Project Structure

```
shelby-file-uploader/
├── src/
│   ├── config.ts      # Shared config & client setup
│   ├── upload.ts      # Upload file ke Shelby
│   ├── download.ts    # Download file dari Shelby
│   ├── list.ts        # List blobs di account
│   └── index.ts       # Round-trip demo
├── .env.example       # Template environment variables
├── package.json
└── tsconfig.json
```

---

## 🌐 Network Info

| Network | RPC | Status |
|---------|-----|--------|
| shelbynet | `https://api.shelbynet.shelby.xyz/shelby` | ✅ Active (wipe ~weekly) |
| testnet | `https://api.testnet.shelby.xyz/shelby` | 🔄 Early Access |

---

## 📚 References

- [Shelby Docs](https://docs.shelby.xyz)
- [Shelby Quickstart](https://github.com/shelby/shelby-quickstart)
- [Aptos Explorer](https://explorer.aptoslabs.com)
- [Shelby Explorer](https://explorer.shelby.xyz)

---

## 📄 License

MIT
