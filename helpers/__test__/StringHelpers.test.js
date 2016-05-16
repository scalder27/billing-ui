import { isUpperCase, innKppResolver } from "../StringHelpers";

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
