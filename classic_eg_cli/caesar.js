let c = "LHXTLR"
let k = 19
console.log(decrypt(c, k))

/**
 * 
 * @param {String} c encrypted message
 * @param {String} k key
 * @returns decrypted message
 */
function decrypt(c, k) {
    let m = "",
        x, y, z
    for (let i = 0; i < c.length; i++) {
        x = c.charCodeAt(i)
        y = x - k
        if (y < 65) y += 26
        z = String.fromCharCode(y + 32)
        m = m + z
    }
    return m
}