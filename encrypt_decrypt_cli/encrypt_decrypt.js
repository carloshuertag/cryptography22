import { randomBytes, createCipheriv, createDecipheriv } from 'node:crypto'; // crypto is a built-in module in node.js
import { readFile, writeFile } from 'node:fs'; // fs is a built-in module in node.js

const algorithm = "des"; // symmetric encryption algorithm 
const initializationVector = randomBytes(8);

function encrypt(plainText, secretKey) {
    const cipher = createCipheriv(algorithm, secretKey, initializationVector); // cipher stream object
    let encrypted = cipher.update(plainText, "utf-8", "hex"); // encrypt message with the given input and output encoding
    encrypted += cipher.final("hex"); // finalize encryption, cipher stream is now closed
    return encrypted;
}

function decrypt(encrypted, secretKey) {
    const decipher = createDecipheriv(algorithm, secretKey, initializationVector); // decipher stream object
    let decrypted = decipher.update(encrypted, "hex", "utf-8"); // decrypt message with the given input and output encoding
    decrypted += decipher.final("utf-8"); // finalize decryption, decipher stream is now closed
    return decrypted;
}

function driver(filePathToEncrypt, filePathToSaveEncrypted, secretKey = randomBytes(8)) {
    console.log("Encrypting...");
    readFile(filePathToEncrypt, (err, data) => {
        if (err) throw err;
        let plainText = data.toString();
        console.log("Plain Text: ", plainText);
        let encrypted = encrypt(plainText, secretKey);
        console.log("Encrypted: ", encrypted);
        writeFile(filePathToSaveEncrypted, encrypted, (err) => {
            if (err) throw err;
            console.log("Encrypted plain text saved to file: ", filePathToSaveEncrypted);
            console.log("Decrypting...");
            readFile(filePathToSaveEncrypted, (err, data) => {
                if (err) throw err;
                encrypted = data.toString();
                console.log("Encrypted: ", encrypted);
                plainText = decrypt(encrypted, secretKey);
                console.log("Plain Text: ", plainText);
            });
        });
    });
}

driver("message.txt", "encrypted.txt");