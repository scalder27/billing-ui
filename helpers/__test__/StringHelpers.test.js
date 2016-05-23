import { isUpperCase, innKppResolver, datesRangeResolver, toLowerFirstLetter } from "../StringHelpers";

describe("isUpperCase helper ", () => {
    it("should return true for string with uppercase letters", () => {
        const actual = isUpperCase("HELLO");
        expect(actual).toBeTruthy();
    });

    it("should return false for regular string", () => {
        const actual = isUpperCase("HeLLO");
        expect(actual).toBeFalsy();
    });
});

describe("inn kpp resolver", () => {
    it("should return both if both passed", () => {
        const actual = innKppResolver("inn", "kpp");
        expect(actual).toBe("inn — kpp");
    });

    it("should return only inn if no kpp passed", () => {
        const actual = innKppResolver("inn");
        expect(actual).toBe("inn");
    });
});

describe("dates range resolver", () => {
    it("should return only end date if begin date is null", () => {
        const actual = datesRangeResolver(null, "17.05.2016");
        expect(actual).toBe("до 17.05.2016");
    });

    it("should return only end date if begin date is undefined", () => {
        const actual = datesRangeResolver(undefined, "17.05.2016");
        expect(actual).toBe("до 17.05.2016");
    });

    it("should return only end date if begin date is empty string", () => {
        const actual = datesRangeResolver("", "17.05.2016");
        expect(actual).toBe("до 17.05.2016");
    });

    it("should return only begin date if end date is not passed", () => {
        const actual = datesRangeResolver("17.05.2016");
        expect(actual).toBe("17.05.2016");
    });

    it("should return only begin date if end date is null", () => {
        const actual = datesRangeResolver("17.05.2016", null);
        expect(actual).toBe("17.05.2016");
    });

    it("should return only begin date if end date is undefined", () => {
        const actual = datesRangeResolver("17.05.2016", undefined);
        expect(actual).toBe("17.05.2016");
    });

    it("should return only begin date if end date is empty string", () => {
        const actual = datesRangeResolver("17.05.2016", "");
        expect(actual).toBe("17.05.2016");
    });

    it("should return null if both dates are empty", () => {
        const actual = datesRangeResolver();
        expect(actual).toBeNull();
    });

    it("should return both dates if two dates passed", () => {
        const actual = datesRangeResolver("15.05.2016", "17.05.2016");
        expect(actual).toBe("15.05.2016 — 17.05.2016");
    });
});

describe("to lower first letter helper", () => {
    it("should lower first letter if passed string length === 1", () => {
        const actual = toLowerFirstLetter("H");
        expect(actual).toBe("h");
    });

    it("should lower first letter if passed string length >= 2", () => {
        const actual = toLowerFirstLetter("Hi");
        expect(actual).toBe("hi");
    });

    it("should not die on first non-letter symbol", () => {
        const actual = toLowerFirstLetter("#");
        expect(actual).toBe("#");
    });

    it("should return empty string if passed string is empty", () => {
        const actual = toLowerFirstLetter("");
        expect(actual).toBe("");
    });
});
