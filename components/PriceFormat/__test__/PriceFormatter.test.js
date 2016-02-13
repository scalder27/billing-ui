import { describe, it } from "jasmin";
import { priceFormat } from "../PriceHelper.js";

describe("priseFormat", () => {
    it("rounding the fractional part", () => {
        expect(priceFormat(6924.2)).toBe("6 924.2");
        expect(priceFormat(6924.20)).toBe("6 924.2");
        expect(priceFormat(6924.25)).toBe("6 924.25");
        expect(priceFormat(6924.2152)).toBe("6 924.21");

        expect(priceFormat(-6924.2152)).toBe("-6 924.21");
        expect(priceFormat(-0.35)).toBe("-0.35");

        expect(priceFormat(6924.20)).not.toBe("6 924.20");
        expect(priceFormat(6924.2)).not.toBe("6 924.19");
    })
});
