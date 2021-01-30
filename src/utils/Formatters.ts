const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
});

const percentFormatter = new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});

function largeCurrencyFormatter(num: number) {
    const str = Math.round(num).toString();
    if (num > 999999999) {
        const res = str.slice(0, -6);
        const a = res.slice(0, -3);
        const b = res.slice(-3);
        return '$' + a + '.' + b + 'B';
    } else if (num > 999999) {
        const res = str.slice(0, -3);
        const a = res.slice(0, -3);
        const b = res.slice(-3);
        return '$' + a + '.' + b + 'M';
    }
};

export { currencyFormatter, percentFormatter, largeCurrencyFormatter };