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

window.addEventListener('load', () => {
    const affineForm = document.getElementById('affineF');
    affineForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const n = parseInt(affineForm.elements.n.value, 10);
        const alpha = parseInt(affineForm.elements.alpha.value, 10) % n;
        const beta = parseInt(affineForm.elements.beta.value, 10) % n;
        const [gcd, x, y] = extGcd(alpha, n);
        if (gcd == 1) {
            console.log(alpha);
            let ek = 'Ek: ' + (alpha % n) + 'p + ' + beta + ' mod ' + n;
            let invBeta = inverseAdditive(beta, n);
            let invAlpha = x > 0 ? x : inverseAdditive(-x, n);
            let dk = 'Dk: ' + invAlpha + ' (c + ' + invBeta + ') mod ' + n;
            document.getElementById('affineResP').innerHTML = ek + '</p><br/><p>' + dk;
        } else {
            let msg = 'Invalid alpha value: ' + alpha;
            msg += ', gcd(' + alpha + ', ' + n + ') = ' + gcd + ' != 1';
            msg += '</p><br/><p>Beta value: ' + beta;
            document.getElementById('affineResP').innerHTML = msg;
        }
    });
});