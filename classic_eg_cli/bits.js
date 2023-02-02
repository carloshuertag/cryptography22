let printInt2Binary = (x) => {
    if (!x) return;
    printInt2Binary(x >> 1);
    console.log(x & 1);
}

let strs = ["0100", "1110111", "11001100"];
for (let i = 0; i < strs.length; i++) {
    console.log(parseInt(strs[i], 2));
}

let extGcd = (a, b) => {
    let x = 1,
        y = 0,
        u = 0,
        v = 1,
        q, r, m, n;
    let xs = (a < 0) ? -1 : 1;
    let ys = (b < 0) ? -1 : 1;
    while (b != 0) {
        q = Math.floor(a / b);
        r = a % b;
        m = x - u * q;
        n = y - v * q;
        a = b;
        b = r;
        x = u;
        y = v;
        u = m;
        v = n;
    }
    return [a, x * xs, y * ys];
};

let inverseAdditive = (x, n) => {
    let y = -x;
    while (y < 0) y += n;
    return y % n;
};

let spanishAlphabet = "abcdefghijklmnñopqrstuvwxyz";
for (let i = 0; i < spanishAlphabet.length; i++) {
    console.log(spanishAlphabet[i], i);
}

let A = [
    [545, 632, 906],
    [909, 1003, 1244],
    [170, 182, 216]
];
for (let i = 0; i < A.length; i++)
    for (let j = 0; j < A[i].length; j++)
        A[i][j] %= 27;

for (let i = 0; i < A.length; i++) {
    for (let j = 0; j < A[i].length; j++)
        console.log(A[i][j] + "=" + spanishAlphabet[A[i][j]] + " ");
    console.log();
}

let k = 3;

let x = (16 * (6 * 15 - 18 * 19)) - (4 * (8 * 15 - 18 * 15)) + (11 * (8 * 19 - 6 * 15));
console.log(x);
x = inverseAdditive(-x, 27);
console.log(x);
let y = extGcd(x, 27);
console.log(y);
//let detx = inverseAdditive(y[1], 27);
let detx = y[1];
console.log(detx);
let invK = [
    [-252, 149, 6],
    [150, 75, -200],
    [62, -244, 64]
];
for (let i = 0; i < invK.length; i++)
    for (let j = 0; j < invK[i].length; j++) {
        if (invK[i][j] < 0) invK[i][j] = inverseAdditive(-invK[i][j], 27);
        invK[i][j] %= 27;
        invK[i][j] *= detx;
        invK[i][j] %= 27;
    }
console.log(invK);
let C = [
    [20, 0, 10],
    [10, 5, 12],
    [1, 4, 26]
];
let m = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];
for (let i = 0; i < C.length; i++)
    for (let j = 0; j < C[i].length; j++) {
        for (let k = 0; k < C.length; k++)
            m[i][j] += invK[i][k] * C[k][j];
        m[i][j] %= 27;
    }


for (let i = 0; i < m.length; i++) {
    for (let j = 0; j < m[i].length; j++)
        console.log(m[i][j] + "=" + spanishAlphabet[m[i][j]] + " ");
    console.log();
}