import { argv } from 'node:process';

let gcd = (a, b) => {
    return b ? gcd(b, a % b) : a;
}

let alpha = parseInt(argv[2]);
let n = parseInt(argv[3]);
console.log(`El parámetro alpha = ${alpha} es ` + ((gcd(alpha, n) == 1) ? "válido" : "inválido"));