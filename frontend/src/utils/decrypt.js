//? Import CryptoJS and node-forge libraries
import CryptoJS from "crypto-js";
import forge from "node-forge";

//? Private key for decryption
const privateKey = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDSL/RHWUp2qBiLxlyinc6obq1ME2VWVNEZ5A==
s7XcSYRmzqOs/dh5A2Cr5KVZU98+4ots0oWv5+r92+tOCbHIp08hOW8QcLQ5y5cIuVMhb1/5lhlvqUyDCqu6Cg==
e4mz5LRkAutjzKJC4Ag4E7k0aoF+XEdFwnnibbfXFYYE0DhIye+g9InWiXShLLnBALvchpcdF1I4Ekj7cojRpg==
AwU+rCXBVDMf8n5zax26Y/+0addtkLktEJsZygYYhxovnNWnzSWiQR0zXAlswqZYU/O6yMDpb5JXssLfOeb2YQ==
HtAaPA6f6pJtHrx8hDDIk/3MnvbYl4xN2CokweOY3QqzJ+dj7bECAwEAAQKCAQAbyj1ZBaRDxfvg1yw+T/EX8Q==
8jXBxr9AXZk31M7xvkKkOSQI5lMtxNWORJ/cDKvSq69Vhwwn8tjuEZqt6bg42G4s7WQS32Pk1Fc2zxH/tLMS0w==
1q8dykD1MzlY03akc1OqeXxX6KF3iBluGKV/GanfZCIERi9JUcphxLXAgys97HzlysZTf8lpx6AiPWbQZmjgEQ==
OUP1UNWUym+7EZd7yALnwwCkbjVJOToCkvTHDaSyt3mTqt+EiY3nLyExUWQ0sKA6ldZlwPcw9VaBbwvBIYR/CQ==
WadT6V/ke9Ek4WhiA1xpgGk3Oxuy5GYeNNfPcMTctJh2KSMOHxYwh9FvzsT8McUCgYEA0+ZZ26DZycgGbcrbZA==
9b0id9njxCXI2dx1vBDD9hixQZbdvGRob0/l6xcFEH+vjqDntYWEuN5rxifG+rCiC/yZbDRqAmfjbS+943+uCg==
MXYtW6jdYKhlxLcYU7alQQX+Aue9UygHlCGOC29kByBXSm/OMMQ/HTSsy2FrWzDQmufvAoGBAP3uXWkxjUsd2w==
Lx8JoL5mgaMBaKTbDcui60bS1VF0RAYUW9EUX1yETLQP3xNInZ+Hqpy54T8AY4390XcVk9TejdRvDYyeUwaeiA==
40dIMiJO4k/8AvIX/581FAJIMV2EdmWe+0h05EvqqBkV4x8GmyOilQ3u+0VpsVzy88MlLxnkXwKBgQCxEvfYTw==
LHAwlR6+vGQ77peVLCHn0eNsG4zPYfs/9hZ6RwZ43jdffZcWw5/Zz7n3KIM476CflE7fwnHHID/qYGYdRBeqdw==
AlhF4xrvoZKnDqiMxippEZApuQ+9NQ4Xrlg8OUe+696ZbQj0iVs/kUkgzRmzKuvLDi+vrXM3Oy23pUUCgYBSkA==
d4TlnLho28Slhd7jKbdLBgE9YRBKPw3a+GBt3KzlgScdg09CaK37+hEhVwIRRe5eiT3I21qDZ5z86GIp27cn9A==
d+ZZ8Er9ryqfGcVbTGTfduSKTO1LmdmIqGqMqq5Iennf5En6uTCw/2Hay64T1yA56JOAzU3jGAfUUrnO5GcCgQ==
gEdjXdU0+D3obm9EAlHd8tLoRHe6ejoHC9bDjPPKyGd4o3CJcPs9iBzdz+HJE6ruPuWMpPCRssi9oML2sW0POw==
Sfw1QThmNxzrG7hnBt3N//yyav5MNmvOYLGBoxjnfVbqdn8JjTEP1lCNkhabidfe/fGO4lq5+tJfXmrRYEfqwg==
dQ==
-----END PRIVATE KEY-----
`;

//? Decrypt function using RSA and AES encryption
export const decrypt = (payload, sessionKey) => {
  if (!privateKey) throw new Error("Private key not loaded");
  const pk = forge.pki.privateKeyFromPem(privateKey);
  const dk = forge.util.decode64(sessionKey);
  const dec = pk.decrypt(dk, "RSAES-PKCS1-V1_5");
  if (!dec || dec.length < 48) throw new Error("Failed to decrypt session key");
  const kb = CryptoJS.enc.Latin1.parse(dec.substring(0, 32));
  const ib = CryptoJS.enc.Latin1.parse(dec.substring(32, 48));
  const dd = CryptoJS.AES.decrypt(payload, kb, {
    iv: ib,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return JSON.parse(dd.toString(CryptoJS.enc.Utf8));
};
