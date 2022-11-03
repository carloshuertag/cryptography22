let Z = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
let vigenereSquare = []
for (let i = 0; i < Z.length; i++) vigenereSquare.push(Z.slice(i) + Z.slice(0, i))

let m = 'cryptographyclass'
let k = 'close'
console.log(encrypt(m, k))
let c = 'ZRADSMGBVBCOF'
k = 'privacy'
console.log(decrypt(c, k))
m = 'thinkingbeginswhenyouaskreallydifficultquestions'
k = 'slavojzizek'
c = encrypt(m, k);
console.log(c)
let c2 = encryptt(m, k, 26)
console.log(c2)
console.log(decrypt(c, k))
console.log(decryptt(c2, k, 26))

function inverseAdditive(x, n) {
    let y = x
    while (y < 0) y += n
    return y % n
};

/**
 * 
 * @param {String} m message in lower case
 * @param {String} k key in lower case
 * @returns encrypted message
 */
function encrypt(m, k) {
    let c = '',
        x, y, z
    for (let i = 0; i < m.length; i++) {
        x = m.charCodeAt(i) - 97
        y = k.charCodeAt(i % k.length) - 97
        z = vigenereSquare[y].charCodeAt(x)
        c += String.fromCharCode(z)
    }
    return c
}

/**
 * 
 * @param {String} m message in lower case
 * @param {String} k key in lower case
 * @param {Number} n size of alphabet
 * @returns encrypted message
 */
function encryptt(m, k, n) {
    let k2 = '',
        c = '',
        x, y;
    for (let i = 0; i < m.length; i++) k2 += k[i % k.length]
    for (let i = 0; i < m.length; i++) {
        x = m.charCodeAt(i) - 97;
        y = k2.charCodeAt(i) - 97;
        c += String.fromCharCode((x + y) % n + 65);
    }
    return c
}

/**
 * 
 * @param {String} c encrypted message 
 * @param {String} k key in lower case 
 * @returns decrypted message
 */
function decrypt(c, k) {
    let m = ''
    let k2 = '',
        x, y, z
    for (let i = 0; i < c.length; i++) k2 += k[i % k.length]
    k2 = k2.toUpperCase()
    for (let i = 0; i < c.length; i++) {
        x = Z.indexOf(k2[i]);
        y = vigenereSquare[x].indexOf(c[i]);
        z = Z[y];
        m += z;
    }
    return m
}

/**
 * 
 * @param {String} c encrypted message
 * @param {String} k key in lower case
 * @param {Number} n size of alphabet
 * @returns decrypted message
 */
function decryptt(c, k, n) {
    let m = '',
        k2 = ''
    for (let i = 0; i < c.length; i++) k2 += k[i % k.length];
    k2 = k2.toUpperCase();
    for (let i = 0; i < c.length; i++) {
        m += String.fromCharCode(inverseAdditive(c.charCodeAt(i) - k2.charCodeAt(i), n) + 97);
    }
    return m
}