import { isUpperCase } from "../StringHelpers";

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
