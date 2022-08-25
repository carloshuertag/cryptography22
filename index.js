//------------------------------------------------------------------------------
// This is a simple encryption program that encrypts and decrypts a message using
// crypto module built-in in node.js, which uses openSSL implementations.
//------------------------------------------------------------------------------
import { randomBytes, createCipheriv, createDecipheriv } from 'node:crypto'; // crypto is a built-in module in node.js

const message = "Hello World!";
console.log("Message: ", message);
const algorithm = "aes-256-cbc"; // symmetric encryption algorithm 
// with 256-bit key, CBC mode of operation (cipher block chaining)
const initializationVector = randomBytes(16);
const secretKey = randomBytes(32);
const cipher = createCipheriv(algorithm, secretKey, initializationVector); // cipher stream object
let encrypted = cipher.update(message, "utf-8", "hex"); // encrypt message with the given input and output encoding
encrypted += cipher.final("hex"); // finalize encryption, cipher stream is now closed
console.log("Encrypted: ", encrypted);
const decipher = createDecipheriv(algorithm, secretKey, initializationVector); // decipher stream object
let decrypted = decipher.update(encrypted, "hex", "utf-8"); // decrypt message with the given input and output encoding
decrypted += decipher.final("utf-8"); // finalize decryption, decipher stream is now closed
console.log("Decrypted: ", decrypted);