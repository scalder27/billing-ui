const defaultPriceFormatOptions = {
    fractionSeparator: ".",
    alwaysWithFraction: false
};

export const priceFormatter = (amount, options = defaultPriceFormatOptions) => {
    const settings = options !== defaultPriceFormatOptions ? { ...defaultPriceFormatOptions, ...options } : options;

    let isNegative = amount < 0;
    const absoluteAmount = Math.abs(amount);
    const integralPart = Math.floor(absoluteAmount);
    let fractionalPart = Math.floor((absoluteAmount * 100) - (integralPart * 100));

    let integralNumberString = integralPart.toString();
    const integralFormat = [];
    const integralLength = integralNumberString.length / 3;
    for (let counter = 0; counter < integralLength; counter++) {
        const sliceEdge = integralNumberString.length - Math.min(integralNumberString.length, 3);
        integralFormat.unshift(integralNumberString.slice(sliceEdge));
        integralNumberString = integralNumberString.slice(0, sliceEdge);
    }

    const fractionalFormat = settings.alwaysWithFraction || fractionalPart !== 0
        ? `${settings.fractionSeparator}${fractionalPart < 10 ? `0${fractionalPart}` : fractionalPart % 10 === 0 ? fractionalPart / 10 : fractionalPart}`
        : "";

    return (isNegative ? "-" : "") + integralFormat.join(" ") + fractionalFormat;
};

export default priceFormatter;
