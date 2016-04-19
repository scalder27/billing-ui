import { priceFormatter } from "../PriceFormatter.js";

describe("priseFormat", () => {
    it("rounding the fractional part", () => {
        expect(priceFormatter(6924.2)).toBe("6 924.2");
        expect(priceFormatter(6924.20)).toBe("6 924.2");
        expect(priceFormatter(6924.25)).toBe("6 924.25");
        expect(priceFormatter(6924.2152)).toBe("6 924.21");

        expect(priceFormatter(-6924.2152)).toBe("-6 924.21");
        expect(priceFormatter(-0.35)).toBe("-0.35");

        expect(priceFormatter(6924.20)).not.toBe("6 924.20");
        expect(priceFormatter(6924.2)).not.toBe("6 924.19");
    })
});
