import crypto from "crypto";

export function generateSixDigitCode() {
  // Generate a random buffer with a length of 3 bytes (24 bits)
  const buffer = crypto.randomBytes(3);

  // Convert the buffer to a 6-digit number (using modulo to ensure it stays within 6 digits)
  const code = buffer.readUIntBE(0, 3) % 1000000; // 1000000 ensures the number is within 6 digits

  // Return the 6-digit code, ensuring it's always 6 digits (with leading zeros if necessary)
  return code.toString().padStart(6, "0");
}
