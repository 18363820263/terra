import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import CryptoJS from 'crypto-js';



export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function genSign(timestamp: string, secret:string) {
    const stringToSign = `${timestamp}\n${secret}`;
    const hmac = CryptoJS.HmacSHA256(stringToSign, secret);
    return hmac.toString(CryptoJS.enc.Base64);
}