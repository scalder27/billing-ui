import { expect } from "chai";
import { priceFormatHelper } from "../../helpers/PriceHelper.js";

describe("priceFormatHelper", () => {
    it("rounding the fractional part", () => {
        expect(priceFormatHelper(6924.2)).to.equal("6 924.2");
        expect(priceFormatHelper(6924.20)).to.equal("6 924.2");
        expect(priceFormatHelper(6924.25)).to.equal("6 924.25");
        expect(priceFormatHelper(6924.2152)).to.equal("6 924.21");

        expect(priceFormatHelper(-6924.2152)).to.equal("-6 924.21");
        expect(priceFormatHelper(-0.35)).to.equal("-0.35");

        expect(priceFormatHelper(6924.20)).not.to.equal("6 924.20");
        expect(priceFormatHelper(6924.2)).not.to.equal("6 924.19");
    })
});
