export function xorEncrypt(text, key) {
    if (typeof text !== "string") text = String(text);
    let out = "";
    for (let i = 0; i < text.length; i++) {
      out += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    // simpan sebagai base64 agar aman di DB (bisa disimpan sebagai TEXT)
    return Buffer.from(out, "binary").toString("base64");
  }
  
  export function xorDecrypt(base64, key) {
    if (!base64) return "";
    const raw = Buffer.from(base64, "base64").toString("binary");
    let out = "";
    for (let i = 0; i < raw.length; i++) {
      out += String.fromCharCode(raw.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return out;
  }
  