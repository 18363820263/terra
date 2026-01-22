import { genSign } from './utils.js';

// 测试参数与Java代码保持一致
const secret = "rfxGQpTpTfTmXBI6P45Lbe";
const timestamp = 1767772749;

// 调用genSign函数
const sign = genSign(timestamp, secret);

console.log(`js的结果：${sign}`);
console.log(`java的结果：XfnRtofnsLTTaxrTEcrAuYOhOC7GDlie8NQcijQK5R0=`);
console.log(`是否一致：${sign === "XfnRtofnsLTTaxrTEcrAuYOhOC7GDlie8NQcijQK5R0="}`);
