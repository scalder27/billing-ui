import { expect } from "chai";
import { formatDate } from "../../libs/moment";

describe("moment formatDate helper", () => {
    it("should format with rule L", () => {
        const actual = formatDate("2013-02-01T00:00:00.000");
        expect(actual).to.equal("01.02.2013");
    });

    it("should format with rule LT", () => {
        const actual = formatDate("2013-02-01T11:13:00.000", "LT");
        expect(actual).to.equal("11:13");
    });
});
