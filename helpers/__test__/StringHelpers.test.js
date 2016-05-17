import { isUpperCase, innKppResolver, datesRangeResolver } from "../StringHelpers";

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

        const resolvedWithEmptyString = datesRangeResolver("", "17.05.2016");
        expect(resolvedWithEmptyString).toBe("до 17.05.2016");
    });

    it("should return only end date if begin date is empty string", () => {
        const actual = datesRangeResolver("", "17.05.2016");
        expect(actual).toBe("до 17.05.2016");
    });

    it("should return both dates if two dates passed", () => {
        const actual = datesRangeResolver("15.05.2016", "17.05.2016");
        expect(actual).toBe("15.05.2016 — 17.05.2016");
    });
});
