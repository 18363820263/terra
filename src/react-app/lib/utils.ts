import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import CryptoJS from 'crypto-js';



export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 生成簽名
 * @param timestamp 時間戳
 * @param secret 密鑰
 * @returns 簽名
 */
export function genSign(timestamp: string | number, secret:string) {
    const stringToSign = `${timestamp}\n${secret}`;
    const hmac = CryptoJS.HmacSHA256("", stringToSign);
    return hmac.toString(CryptoJS.enc.Base64);
}