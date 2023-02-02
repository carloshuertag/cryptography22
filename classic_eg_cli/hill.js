const spanishAlphabet = "abcdefghijklmnñopqrstuvwxyz";

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

let det = (A) => {
    let n = A.length;
    let det = 1;
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            while (A[j][i] != 0) {
                let q = Math.floor(A[i][i] / A[j][i]);
                for (let k = i; k < n; k++) {
                    let t = A[i][k] - q * A[j][k];
                    A[i][k] = A[j][k];
                    A[j][k] = t;
                }
                det = -det;
            }
        }
        det *= A[i][i];
    }
    return det;
}

let adjMatrix = (A) => {
    let n = A.length;
    let B = [];
    for (let i = 0; i < n; i++) {
        B[i] = [];
        for (let j = 0; j < n; j++) {
            B[i][j] = 0;
            for (let k = 0; k < n; k++) {
                if (k != i && j != k) {
                    B[i][j] += A[k][j];
                }
            }
        }
    }
    return B;
}

let invMatrix = (A) => {
    let n = A.length;
    let detA = det(A);
    let B = adjMatrix(A);
    let [gcd, x, y] = extGcd(detA, 27);
    if (gcd != 1) {
        console.log("La matriz no tiene inversa");
        return;
    }
    let detAInv = x;
    while (detAInv < 0) detAInv += 27;
    for (let i = 0; i < n; i++)
        for (let j = 0; j < n; j++)
            B[i][j] = (B[i][j] * detAInv) % 27;
    return B;
}

let strToMatrix = (str, k) => {
    let n = Math.ceil(str.length / k);
    let A = [];
    for (let i = 0; i < n; i++) {
        A[i] = [];
        for (let j = 0; j < k; j++) {
            let c = str[i * k + j];
            A[i][j] = (c) ? spanishAlphabet.indexOf(c) : 0;
        }
    }
    return A;
}

let matrixToStr = (A) => {
    let str = "";
    for (let i = 0; i < A.length; i++)
        for (let j = 0; j < A[i].length; j++)
            str += spanishAlphabet[A[i][j]];
    return str;
}

let encrypt = (plainText, key, k) => {
    let P = strToMatrix(plainText, k);
    let K = strToMatrix(key, k);
    let detK = det(K);
    if (detK == 0) return "Error: Determinante de K es cero";
    if (detK < 0) detK = inverseAdditive(-detK, 27);
    let extGcdr = extGcd(detK, 27);
    if (extGcdr[0] != 1) return "Error: Determinante de K no es invertible";
    let C = [];
    for (let i = 0; i < P.length; i++) {
        C[i] = [];
        for (let j = 0; j < k; j++) {
            let sum = 0;
            for (let l = 0; l < k; l++)
                sum += P[i][l] * K[l][j];
            C[i][j] = sum % 27;
        }
    }
    return matrixToStr(C);
}

let decrypt = (cipherText, key, k) => {
    let C = strToMatrix(cipherText, k);
    let K = strToMatrix(key, k);
    let detK = det(K);
    if (detK == 0) return "Error: Determinante de K es cero";
    let invDetK = extGcd(detK, 27)[1];
    if (invDetK < 0) invDetK = inverseAdditive(-invDetK, 27);
    let KInv = invMatrix(K);
    let P = [];
    for (let i = 0; i < C.length; i++) {
        P[i] = [];
        for (let j = 0; j < k; j++) {
            let sum = 0;
            for (let l = 0; l < k; l++)
                sum += C[i][l] * KInv[l][j];
            P[i][j] = (sum * invDetK) % 27;
        }
    }
    return matrixToStr(P);
}

let cipherText = "sqevotece";
let key = "cqtjwdcln";
let k = 3;
let plainText = "comido";
console.log("cifrado: " + encrypt(plainText, key, k));
console.log("mensaje: " + decrypt(cipherText, key, k));