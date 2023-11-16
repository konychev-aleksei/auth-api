import crypto from "crypto";

const generateSecret = () => crypto.randomBytes(64).toString("hex");

console.log({
  accessSecret: generateSecret(),
  refreshSecret: generateSecret(),
});
