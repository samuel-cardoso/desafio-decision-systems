import bcrypt from "bcryptjs";
import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.SECRET_KEY || "default secret key";

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

export async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

export function encrypt(text: string): string {
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
}

export function decrypt(encrypted: string): string {
  const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}
